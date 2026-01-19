# 👔 NEUROSHOP - Fashion That Fits Your Body & Soul

**AI-Powered Personalized Fashion Mobile Platform**

NEUROSHOP is an AI-powered personalized fashion recommendation mobile e-commerce platform. It analyzes users' physical measurements (height, weight, body type) and Big Five (OCEAN) personality traits to recommend the most suitable clothing.

---

## 🎯 Features

### ✅ Completed Features (MVP v1.0)

- **Onboarding Flow**: User welcome, biometric data collection, personality test, and summary screens
- **Big Five Personality Test**: 5-question hidden OCEAN (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism) test
- **Physical Profile**: Height (140-210 cm), weight (40-150 kg), and body type (Slim/Regular/Oversize) selection
- **Profile Screen**: Visual representation of personality scores and dominant trait analysis
- **Local Data Storage**: Secure profile storage on device with AsyncStorage
- **Modern UI/UX**: Purple theme (#8B5CF6), responsive design with NativeWind (Tailwind CSS)
- **Haptic Feedback**: Tactile feedback for iOS/Android
- **Backend API**: tRPC-based type-safe API
- **Database**: MySQL + Drizzle ORM for product, user, and psychology data

### 🚧 Planned Features

- Product catalog and listing
- Neuro-Fit matching algorithm
- Product detail page
- Match score explanations
- Favorites and cart
- Payment integration

---

## 🏗️ Technology Stack

### Frontend (Mobile App)
- **Framework**: React Native 0.81 + Expo SDK 54
- **Language**: TypeScript 5.9
- **Styling**: NativeWind 4 (Tailwind CSS for React Native)
- **Navigation**: Expo Router 6
- **State Management**: React Context + AsyncStorage
- **Animation**: react-native-reanimated 4.x
- **API Client**: tRPC + TanStack Query

### Backend
- **API**: tRPC 11.7 (Type-safe API)
- **Runtime**: Node.js 22 + Express
- **Database**: MySQL 8
- **ORM**: Drizzle ORM 0.44
- **Auth**: OAuth 2.0 (optional)

### DevOps
- **Package Manager**: pnpm 9.12
- **Testing**: Vitest 2.1
- **Linting**: ESLint 9
- **Formatting**: Prettier 3.7

---

## 📱 Screens

### 1. Onboarding Flow
- **Welcome Screen**: App introduction and start
- **Biometric Screen**: Height, weight, and body type input
- **Personality Test**: 5-question personality test
- **Summary Screen**: Profile summary and completion

### 2. Main Screens
- **Home**: Personalized product recommendations (coming soon)
- **Profile**: Physical information and personality scores

---

## 🚀 Installation and Running

### Requirements
- Node.js 22+
- pnpm 9+
- MySQL 8+ (optional, for backend)
- Expo Go app (for mobile testing)

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Prepare Database (Optional)
```bash
# Set DATABASE_URL in .env file
pnpm db:push
```

### 3. Start Development Server
```bash
pnpm dev
```

This command starts both the backend API (port 3000) and Expo Metro bundler (port 8081).

### 4. Test Mobile App

**iOS/Android (Physical Device or Emulator):**
1. Download Expo Go app
2. Scan QR code or use this command:
```bash
pnpm ios      # iOS simulator
pnpm android  # Android emulator
```

**Web:**
Opens automatically in your browser: `http://localhost:8081`

---

## 📂 Project Structure

```
neuroshop/
├── app/                          # Expo Router screens
│   ├── (tabs)/                   # Tab navigation
│   │   ├── index.tsx            # Home page
│   │   └── profile.tsx          # Profile screen
│   ├── onboarding/              # Onboarding flow
│   │   ├── index.tsx            # Welcome
│   │   ├── biometric.tsx        # Physical information
│   │   ├── personality.tsx      # Personality test
│   │   └── summary.tsx          # Summary
│   └── _layout.tsx              # Root layout
├── components/                   # Reusable components
│   ├── screen-container.tsx     # SafeArea wrapper
│   └── ui/                      # UI components
├── lib/                         # Utility functions
│   ├── onboarding-provider.tsx  # Onboarding context
│   ├── theme-provider.tsx       # Theme management
│   └── trpc.ts                  # API client
├── server/                      # Backend API
│   ├── routers.ts               # tRPC routers
│   ├── db.ts                    # Database functions
│   └── _core/                   # Core backend
├── drizzle/                     # Database schema
│   └── schema.ts                # MySQL tables
├── assets/                      # Images and fonts
│   └── images/
│       └── icon.png             # App logo
├── __tests__/                   # Test files
├── theme.config.js              # Theme colors
├── tailwind.config.js           # Tailwind configuration
└── app.config.ts                # Expo configuration
```

---

## 🧠 Big Five (OCEAN) Personality Model

NEUROSHOP uses the Big Five personality model to understand users' style preferences:

| Trait | Description | Style Impact |
|-------|-------------|--------------|
| **Openness** | Openness to new experiences, creativity | High → Original, colorful, experimental styles |
| **Conscientiousness** | Organization, planning | High → Classic, organized, clean look |
| **Extraversion** | Sociability, energy | High → Bright colors, attention-grabbing |
| **Agreeableness** | Cooperation, empathy | High → Sustainable, ethical brands |
| **Neuroticism** | Emotional sensitivity | High → Comfortable, soft, embracing clothes |

---

## 🎨 Design System

### Colors
```javascript
primary:    #8B5CF6 (Purple)
background: #FFFFFF (Light) / #151718 (Dark)
surface:    #F9FAFB (Light) / #1E2022 (Dark)
foreground: #11181C (Light) / #ECEDEE (Dark)
muted:      #687076 (Light) / #9BA1A6 (Dark)
border:     #E5E7EB (Light) / #334155 (Dark)
```

### Typography
- **Headings**: text-3xl (30px), font-bold
- **Subheadings**: text-lg (18px), font-semibold
- **Body**: text-base (16px), font-normal
- **Small Text**: text-sm (14px)

---

## 🧪 Testing

```bash
# Run all tests
pnpm test

# TypeScript check
pnpm check

# Linting
pnpm lint
```

---

## 📊 Database Schema

### Tables

**users**: User accounts  
**user_personality_profiles**: OCEAN scores and physical information  
**products**: Product catalog  
**product_psychology**: Product-personality matching data  
**cart_items**: Cart items  
**orders**: Orders  
**behavior_metrics**: User behavior analysis  

---

## 🔒 Privacy

- User profile data is stored **only on device** (AsyncStorage)
- Personality test results are **not shared** with third parties
- Backend usage is **optional** (only for product catalog)

---

## 🛠️ Development Notes

### Style Guide
- Use NativeWind (Tailwind CSS)
- Style with `className` prop
- Use theme colors from `theme.config.js` file
- Wrap all screens with `ScreenContainer` (for SafeArea)

### Navigation
- Using Expo Router (file-based routing)
- Tab navigation: `app/(tabs)/`
- Modal/Stack screens: `app/` root

### State Management
- Onboarding: `OnboardingProvider` context
- API: tRPC + TanStack Query
- Local: AsyncStorage

---

## 📝 License

MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Contributors

NEUROSHOP is developed to provide AI-powered personalized shopping experience.

---

## 📞 Contact

You can use GitHub Issues for questions.

---

**NEUROSHOP** - Fashion That Fits Your Body & Soul 🧠👔
