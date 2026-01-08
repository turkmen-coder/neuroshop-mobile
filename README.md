# NEUROSHOP

**Bedenine ve Ruhuna Uyan Moda**

NEUROSHOP, yapay zeka destekli kişiselleştirilmiş moda önerileri sunan bir mobil e-ticaret platformudur. Kullanıcıların fiziksel ölçülerini (boy, kilo, beden tipi) ve Big Five (OCEAN) kişilik özelliklerini analiz ederek, onlara en uygun kıyafetleri önerir.

---

## 🎯 Özellikler

### ✅ Tamamlanan Özellikler (MVP v1.0)

- **Onboarding Akışı**: Kullanıcı karşılama, biyometrik veri toplama, kişilik testi ve özet ekranları
- **Big Five Kişilik Testi**: 5 soruluk gizli OCEAN (Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism) testi
- **Fiziksel Profil**: Boy (140-210 cm), kilo (40-150 kg) ve beden tipi (Slim/Regular/Oversize) seçimi
- **Profil Ekranı**: Kişilik skorlarının görsel gösterimi ve dominant özellik analizi
- **Yerel Veri Saklama**: AsyncStorage ile cihazda güvenli profil saklama
- **Modern UI/UX**: Mor tema (#8B5CF6), NativeWind (Tailwind CSS) ile responsive tasarım
- **Haptic Feedback**: iOS/Android için dokunsal geri bildirim
- **Backend API**: tRPC tabanlı type-safe API
- **Veritabanı**: MySQL + Drizzle ORM ile ürün, kullanıcı ve psikoloji verileri

### 🚧 Planlanan Özellikler

- Ürün kataloğu ve listeleme
- Neuro-Fit eşleştirme algoritması
- Ürün detay sayfası
- Eşleşme skoru açıklamaları
- Favoriler ve sepet
- Ödeme entegrasyonu

---

## 🏗️ Teknik Stack

### Frontend (Mobil Uygulama)
- **Framework**: React Native 0.81 + Expo SDK 54
- **Dil**: TypeScript 5.9
- **Styling**: NativeWind 4 (Tailwind CSS for React Native)
- **Navigation**: Expo Router 6
- **State Management**: React Context + AsyncStorage
- **Animasyon**: react-native-reanimated 4.x
- **API Client**: tRPC + TanStack Query

### Backend
- **API**: tRPC 11.7 (Type-safe API)
- **Runtime**: Node.js 22 + Express
- **Veritabanı**: MySQL 8
- **ORM**: Drizzle ORM 0.44
- **Auth**: OAuth 2.0 (opsiyonel)

### DevOps
- **Package Manager**: pnpm 9.12
- **Testing**: Vitest 2.1
- **Linting**: ESLint 9
- **Formatting**: Prettier 3.7

---

## 📱 Ekranlar

### 1. Onboarding Akışı
- **Welcome Screen**: Uygulama tanıtımı ve başlangıç
- **Biometric Screen**: Boy, kilo ve beden tipi girişi
- **Personality Test**: 5 soruluk kişilik testi
- **Summary Screen**: Profil özeti ve tamamlama

### 2. Ana Ekranlar
- **Home**: Kişiselleştirilmiş ürün önerileri (yakında)
- **Profile**: Fiziksel bilgiler ve kişilik skorları

---

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler
- Node.js 22+
- pnpm 9+
- MySQL 8+ (opsiyonel, backend için)
- Expo Go uygulaması (mobil test için)

### 1. Bağımlılıkları Yükleyin
```bash
pnpm install
```

### 2. Veritabanını Hazırlayın (Opsiyonel)
```bash
# .env dosyasında DATABASE_URL'i ayarlayın
pnpm db:push
```

### 3. Geliştirme Sunucusunu Başlatın
```bash
pnpm dev
```

Bu komut hem backend API'yi (port 3000) hem de Expo Metro bundler'ı (port 8081) başlatır.

### 4. Mobil Uygulamayı Test Edin

**iOS/Android (Fiziksel Cihaz veya Emülatör):**
1. Expo Go uygulamasını indirin
2. QR kodu tarayın veya şu komutu kullanın:
```bash
pnpm ios      # iOS simulator
pnpm android  # Android emulator
```

**Web:**
Tarayıcınızda otomatik olarak açılır: `http://localhost:8081`

---

## 📂 Proje Yapısı

```
neuroshop/
├── app/                          # Expo Router ekranları
│   ├── (tabs)/                   # Tab navigasyon
│   │   ├── index.tsx            # Ana sayfa
│   │   └── profile.tsx          # Profil ekranı
│   ├── onboarding/              # Onboarding akışı
│   │   ├── index.tsx            # Welcome
│   │   ├── biometric.tsx        # Fiziksel bilgiler
│   │   ├── personality.tsx      # Kişilik testi
│   │   └── summary.tsx          # Özet
│   └── _layout.tsx              # Root layout
├── components/                   # Yeniden kullanılabilir bileşenler
│   ├── screen-container.tsx     # SafeArea wrapper
│   └── ui/                      # UI bileşenleri
├── lib/                         # Utility fonksiyonlar
│   ├── onboarding-provider.tsx  # Onboarding context
│   ├── theme-provider.tsx       # Tema yönetimi
│   └── trpc.ts                  # API client
├── server/                      # Backend API
│   ├── routers.ts               # tRPC routers
│   ├── db.ts                    # Veritabanı fonksiyonları
│   └── _core/                   # Core backend
├── drizzle/                     # Veritabanı şeması
│   └── schema.ts                # MySQL tabloları
├── assets/                      # Görseller ve fontlar
│   └── images/
│       └── icon.png             # Uygulama logosu
├── __tests__/                   # Test dosyaları
├── theme.config.js              # Tema renkleri
├── tailwind.config.js           # Tailwind yapılandırması
└── app.config.ts                # Expo yapılandırması
```

---

## 🧠 Big Five (OCEAN) Kişilik Modeli

NEUROSHOP, kullanıcıların stil tercihlerini anlamak için Big Five kişilik modelini kullanır:

| Özellik | Açıklama | Stil Etkisi |
|---------|----------|-------------|
| **Openness** (Açıklık) | Yeni deneyimlere açıklık, yaratıcılık | Yüksek → Özgün, renkli, deneysel stiller |
| **Conscientiousness** (Sorumluluk) | Düzenlilik, planlılık | Yüksek → Klasik, düzenli, temiz görünüm |
| **Extraversion** (Dışadönüklük) | Sosyallik, enerji | Yüksek → Parlak renkler, dikkat çekici |
| **Agreeableness** (Uyumluluk) | İşbirlikçilik, empati | Yüksek → Sürdürülebilir, etik markalar |
| **Neuroticism** (Duygusal Denge) | Duygusal hassasiyet | Yüksek → Rahat, yumuşak, saran kıyafetler |

---

## 🎨 Tasarım Sistemi

### Renkler
```javascript
primary:    #8B5CF6 (Mor)
background: #FFFFFF (Açık) / #151718 (Koyu)
surface:    #F9FAFB (Açık) / #1E2022 (Koyu)
foreground: #11181C (Açık) / #ECEDEE (Koyu)
muted:      #687076 (Açık) / #9BA1A6 (Koyu)
border:     #E5E7EB (Açık) / #334155 (Koyu)
```

### Tipografi
- **Başlıklar**: text-3xl (30px), font-bold
- **Alt Başlıklar**: text-lg (18px), font-semibold
- **Gövde**: text-base (16px), font-normal
- **Küçük Metin**: text-sm (14px)

---

## 🧪 Test

```bash
# Tüm testleri çalıştır
pnpm test

# TypeScript kontrolü
pnpm check

# Linting
pnpm lint
```

---

## 📊 Veritabanı Şeması

### Tablolar

**users**: Kullanıcı hesapları  
**user_personality_profiles**: OCEAN skorları ve fiziksel bilgiler  
**products**: Ürün kataloğu  
**product_psychology**: Ürün-kişilik eşleştirme verileri  
**cart_items**: Sepet öğeleri  
**orders**: Siparişler  
**behavior_metrics**: Kullanıcı davranış analizi  

---

## 🔒 Gizlilik

- Kullanıcı profil verileri **sadece cihazda** (AsyncStorage) saklanır
- Kişilik test sonuçları üçüncü taraflarla **paylaşılmaz**
- Backend kullanımı **opsiyoneldir** (sadece ürün kataloğu için)

---

## 🛠️ Geliştirme Notları

### Stil Rehberi
- NativeWind (Tailwind CSS) kullanın
- `className` prop'u ile stillendirme yapın
- Tema renklerini `theme.config.js` dosyasından kullanın
- Tüm ekranları `ScreenContainer` ile sarın (SafeArea için)

### Navigasyon
- Expo Router kullanılıyor (file-based routing)
- Tab navigasyon: `app/(tabs)/`
- Modal/Stack ekranlar: `app/` root'unda

### State Yönetimi
- Onboarding: `OnboardingProvider` context
- API: tRPC + TanStack Query
- Yerel: AsyncStorage

---

## 📝 Lisans

Bu proje özel bir projedir ve ticari kullanım için tasarlanmıştır.

---

## 👥 Katkıda Bulunanlar

NEUROSHOP, yapay zeka destekli kişiselleştirilmiş alışveriş deneyimi sunmak için geliştirilmiştir.

---

## 📞 İletişim

Sorularınız için GitHub Issues kullanabilirsiniz.

---

**NEUROSHOP** - Bedenine ve Ruhuna Uyan Moda 🧠👔
