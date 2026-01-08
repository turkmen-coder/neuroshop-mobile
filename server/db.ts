import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = "admin";
      updateSet.role = "admin";
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// TODO: add feature queries here as your schema grows.

// ============================================
// NEUROSHOP Database Functions
// ============================================

import { products, productPsychology, userPersonalityProfiles, cartItems } from "../drizzle/schema";
import { desc, sql } from "drizzle-orm";

// Products
export async function getAllProducts() {
  const db = await getDb();
  if (!db) return [];
  
  return db.select().from(products).where(eq(products.isActive, true)).orderBy(desc(products.createdAt));
}

export async function getProductsPaginated(page: number = 1, limit: number = 20, category?: string) {
  const db = await getDb();
  if (!db) return { products: [], total: 0, page, limit };
  
  const offset = (page - 1) * limit;
  
  let baseQuery = category
    ? db.select().from(products).where(sql`${products.isActive} = true AND ${products.category} = ${category}`)
    : db.select().from(products).where(eq(products.isActive, true));
  
  const productsList = await baseQuery.limit(limit).offset(offset).orderBy(desc(products.createdAt));
  
  // Get total count
  const countQuery = category 
    ? db.select({ count: sql<number>`count(*)` }).from(products).where(sql`${products.isActive} = true AND ${products.category} = ${category}`)
    : db.select({ count: sql<number>`count(*)` }).from(products).where(eq(products.isActive, true));
  
  const countResult = await countQuery;
  const total = Number(countResult[0]?.count || 0);
  
  return {
    products: productsList,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getProductById(id: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function getProductCategories() {
  const db = await getDb();
  if (!db) return [];
  
  const result = await db.select({ category: products.category }).from(products).where(eq(products.isActive, true)).groupBy(products.category);
  return result.map(r => r.category).filter(Boolean);
}

export async function getProductPsychology(productId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(productPsychology).where(eq(productPsychology.productId, productId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

// User Personality Profile
export async function getOrCreatePersonalityProfile(userId: number) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(userPersonalityProfiles).where(eq(userPersonalityProfiles.userId, userId)).limit(1);
  
  if (result.length > 0) {
    return result[0];
  }
  
  // Create default profile
  const defaultProfile = {
    userId,
    openness: 50,
    conscientiousness: 50,
    extraversion: 50,
    agreeableness: 50,
    neuroticism: 50,
    dominantTrait: 'openness',
    culturalContext: 'western',
    mianziScore: 50,
    harmonyScore: 50,
    ubuntuScore: 50,
    consentGiven: false,
    dataTransparency: true,
  };
  
  await db.insert(userPersonalityProfiles).values(defaultProfile as any);
  
  const newResult = await db.select().from(userPersonalityProfiles).where(eq(userPersonalityProfiles.userId, userId)).limit(1);
  return newResult.length > 0 ? newResult[0] : null;
}

export async function updatePersonalityProfile(userId: number, data: any) {
  const db = await getDb();
  if (!db) return null;
  
  await db.update(userPersonalityProfiles).set(data).where(eq(userPersonalityProfiles.userId, userId));
  
  return getOrCreatePersonalityProfile(userId);
}

// Cart
export async function getCartItems(userId: number) {
  const db = await getDb();
  if (!db) return [];
  
  const items = await db.select().from(cartItems).where(eq(cartItems.userId, userId));
  
  // Join with products
  const itemsWithProducts = await Promise.all(
    items.map(async (item) => {
      const product = await getProductById(item.productId);
      return {
        ...item,
        product,
      };
    })
  );
  
  return itemsWithProducts;
}

export async function addToCart(userId: number, productId: number, quantity: number) {
  const db = await getDb();
  if (!db) return null;
  
  // Check if item already exists
  const existing = await db.select().from(cartItems).where(sql`${cartItems.userId} = ${userId} AND ${cartItems.productId} = ${productId}`).limit(1);
  
  if (existing.length > 0) {
    // Update quantity
    await db.update(cartItems).set({ quantity: existing[0].quantity + quantity }).where(eq(cartItems.id, existing[0].id));
  } else {
    // Insert new
    await db.insert(cartItems).values({ userId, productId, quantity });
  }
  
  return getCartItems(userId);
}

export async function updateCartItem(userId: number, productId: number, quantity: number) {
  const db = await getDb();
  if (!db) return null;
  
  await db.update(cartItems).set({ quantity }).where(sql`${cartItems.userId} = ${userId} AND ${cartItems.productId} = ${productId}`);
  
  return getCartItems(userId);
}

export async function removeFromCart(userId: number, productId: number) {
  const db = await getDb();
  if (!db) return null;
  
  await db.delete(cartItems).where(sql`${cartItems.userId} = ${userId} AND ${cartItems.productId} = ${productId}`);
  
  return getCartItems(userId);
}

export async function clearCart(userId: number) {
  const db = await getDb();
  if (!db) return null;
  
  await db.delete(cartItems).where(eq(cartItems.userId, userId));
  
  return [];
}

export async function trackBehaviorMetrics(userId: number, data: any) {
  // For MVP, just log the data
  // In production, this would insert into behavior_metrics table
  console.log('[Behavior Tracking]', { userId, data });
  return { success: true };
}
