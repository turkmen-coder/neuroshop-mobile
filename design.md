# NEUROSHOP - Mobil Uygulama Tasarım Planı

## Genel Bakış

NEUROSHOP, kullanıcıların fiziksel ölçüleri (boy, kilo, beden tipi) ve psikolojik özellikleri (Big Five/OCEAN kişilik modeli) ile kıyafetleri eşleştiren yapay zeka destekli bir moda platformudur. Uygulama, kullanıcının bedenine ve ruhuna aynı anda uyan kıyafetleri önerir.

## Tasarım Prensipleri

- **Mobil Öncelikli**: Dikey (9:16) ekran oranı, tek elle kullanım
- **iOS HIG Uyumlu**: Apple Human Interface Guidelines'a tam uyum
- **Minimal ve Şık**: Temiz, modern, profesyonel görünüm
- **Kişiselleştirilmiş**: Her kullanıcıya özel deneyim

## Renk Paleti

- **Primary (Marka Rengi)**: #8B5CF6 (Mor/Purple) - Psikoloji ve teknoloji birleşimi
- **Background (Açık)**: #FFFFFF
- **Background (Koyu)**: #151718
- **Surface (Açık)**: #F9FAFB
- **Surface (Koyu)**: #1E2022
- **Foreground (Açık)**: #11181C
- **Foreground (Koyu)**: #ECEDEE
- **Muted (Açık)**: #687076
- **Muted (Koyu)**: #9BA1A6
- **Success**: #22C55E
- **Warning**: #F59E0B
- **Error**: #EF4444

## Ekran Listesi ve İçerik

### 1. Welcome/Splash Ekranı
**İçerik**: 
- NEUROSHOP logosu
- Slogan: "Bedenine ve Ruhuna Uyan Moda"
- "Başla" butonu

**Fonksiyonellik**:
- İlk açılışta gösterilir
- Kullanıcı profili varsa direkt ana ekrana yönlendirir

### 2. Onboarding - Biyometrik Veri Toplama
**İçerik**:
- Başlık: "Seni Tanıyalım"
- Boy girişi (slider veya input, 140-210 cm)
- Kilo girişi (slider veya input, 40-150 kg)
- Beden tipi seçimi (görsel kartlar):
  - Slim (İnce/Atletik)
  - Regular (Normal)
  - Oversize (Geniş/Rahat)
- İlerleme göstergesi (1/3)
- "İleri" butonu

**Fonksiyonellik**:
- Veriler AsyncStorage'a kaydedilir
- Validasyon: Boy ve kilo makul aralıkta olmalı

### 3. Onboarding - Stil Tercihleri (Gizli Psikometrik Test)
**İçerik**:
- Başlık: "Stilini Keşfet"
- Alt başlık: "Hangi kıyafetler seni daha iyi hissettirir?"
- 5-6 görsel kart çifti (her biri farklı OCEAN özelliğini test eder):
  
  **Soru 1 (Extraversion)**: "Bir partiye giderken..."
  - A: Parlak kırmızı/sarı ceket (Dışadönük)
  - B: Sade gri/lacivert kazak (İçedönük)
  
  **Soru 2 (Conscientiousness)**: "Günlük kıyafetinde..."
  - A: Düzenli, ütülü, klasik gömlek (Sorumluluk sahibi)
  - B: Rahat, serbest, bohemyen tişört (Spontane)
  
  **Soru 3 (Openness)**: "Yeni bir stil denemek..."
  - A: Renkli, desenli, özgün parçalar (Deneyime açık)
  - B: Güvenli, klasik, zamansız parçalar (Geleneksel)
  
  **Soru 4 (Agreeableness)**: "Kıyafet alırken..."
  - A: Sürdürülebilir, etik markalar (Uyumlu)
  - B: Trend ve performans odaklı (Rekabetçi)
  
  **Soru 5 (Neuroticism)**: "Rahat hissettiğin..."
  - A: Geniş, yumuşak, saran kıyafetler (Yüksek nevrotiklik)
  - B: Fit, yapılandırılmış kıyafetler (Düşük nevrotiklik)

- İlerleme göstergesi (2/3)
- "İleri" butonu

**Fonksiyonellik**:
- Her seçim OCEAN skorlarını günceller
- Kullanıcı farkında olmadan kişilik profili oluşturulur
- Veriler AsyncStorage'a kaydedilir

### 4. Onboarding - Tercih Özeti
**İçerik**:
- Başlık: "Profilin Hazır!"
- Özet kartı:
  - Boy: X cm
  - Kilo: Y kg
  - Beden Tipi: [Slim/Regular/Oversize]
  - Stil Profili: "Senin için özel seçimler hazırladık"
- İlerleme göstergesi (3/3)
- "Alışverişe Başla" butonu

**Fonksiyonellik**:
- Tüm veriler backend'e gönderilir (opsiyonel, AsyncStorage yeterli)
- Ana ekrana yönlendirir

### 5. Ana Ekran (Home) - Önerilen Ürünler
**İçerik**:
- Header:
  - NEUROSHOP logosu (sol üst)
  - Profil ikonu (sağ üst)
- Hoş geldin mesajı: "Sana Özel Seçimler"
- Ürün kartları (FlatList):
  - Ürün görseli
  - Ürün adı
  - Fiyat
  - Eşleşme skoru badge'i (örn: "95% Uyumlu")
  - Kalp ikonu (favorilere ekle)
- Her kart tıklanabilir → Ürün Detay ekranına gider

**Fonksiyonellik**:
- Neuro-Fit algoritması ile sıralanmış ürünler
- Sonsuz scroll (pagination)
- Pull-to-refresh

### 6. Ürün Detay Ekranı
**İçerik**:
- Ürün görselleri (swipeable carousel)
- Ürün adı ve marka
- Fiyat
- Eşleşme skoru ve açıklama:
  - "Bu ürün senin için neden uygun?" butonu
  - Modal açılır: "Analizlerimiz, rahat kesimleri ve güven veren renkleri tercih ettiğinizi gösteriyor."
- Beden seçici (S, M, L, XL)
- Stok durumu
- Ürün açıklaması (kullanıcının kişiliğine göre dinamik metin)
- Malzeme bilgileri
- "Sepete Ekle" butonu
- "Favorilere Ekle" ikonu

**Fonksiyonellik**:
- Beden seçimi zorunlu
- Sepete ekleme
- Favorilere ekleme
- Açıklanabilir AI önerileri

### 7. Profil Ekranı
**İçerik**:
- Kullanıcı avatar/ikonu
- Biyometrik bilgiler:
  - Boy: X cm
  - Kilo: Y kg
  - Beden Tipi: [Slim/Regular/Oversize]
- "Bilgileri Güncelle" butonu
- "Stil Testini Tekrarla" butonu
- Ayarlar (tema, bildirimler, vb.)
- Çıkış yap (opsiyonel)

**Fonksiyonellik**:
- Profil düzenleme
- Kişilik testini yeniden yapma
- Ayarlar yönetimi

### 8. Sepet Ekranı (Opsiyonel - MVP'de olmayabilir)
**İçerik**:
- Sepetteki ürünler listesi
- Her ürün için:
  - Görsel, ad, beden, fiyat
  - Adet seçici
  - Sil butonu
- Toplam tutar
- "Ödemeye Geç" butonu

**Fonksiyonellik**:
- Ürün adedi değiştirme
- Ürün silme
- Ödeme akışı (MVP'de basit placeholder)

### 9. Favoriler Ekranı
**İçerik**:
- Favori ürünler grid'i
- Her ürün kartı Ana Ekran ile aynı formatta
- Boş durum: "Henüz favori ürünün yok"

**Fonksiyonellik**:
- Favori ürünleri görüntüleme
- Favoriden çıkarma
- Ürün detayına gitme

## Tab Bar Navigasyon

1. **Ana Sayfa** (house.fill icon) - Önerilen Ürünler
2. **Favoriler** (heart.fill icon) - Favori Ürünler
3. **Sepet** (cart.fill icon) - Alışveriş Sepeti (opsiyonel)
4. **Profil** (person.fill icon) - Kullanıcı Profili

## Kullanıcı Akışları

### Ana Akış 1: İlk Kullanıcı (Onboarding)
1. Welcome ekranı → "Başla"
2. Biyometrik veri girişi → "İleri"
3. Stil tercihleri (5 soru) → "İleri"
4. Tercih özeti → "Alışverişe Başla"
5. Ana ekran (önerilen ürünler)

### Ana Akış 2: Ürün Keşfi ve Satın Alma
1. Ana ekranda ürün kartına tıkla
2. Ürün detay ekranı
3. Beden seç
4. "Sepete Ekle"
5. Sepet ekranı
6. "Ödemeye Geç" (MVP'de placeholder)

### Ana Akış 3: Profil Güncelleme
1. Profil tab'ına git
2. "Bilgileri Güncelle" tıkla
3. Boy/Kilo/Beden tipi güncelle
4. Kaydet
5. Ana ekrana dön (yeni öneriler)

## Etkileşim Tasarımı

- **Butonlar**: Scale animasyonu (0.97) + hafif haptic feedback
- **Kart tıklamaları**: Opacity değişimi (0.7)
- **Geçişler**: Smooth, 250ms duration
- **Loading durumları**: Skeleton loader veya spinner
- **Hata durumları**: Toast mesajları

## Teknik Notlar

- **Veri Saklama**: AsyncStorage (local-first yaklaşım)
- **Görsel Yönetimi**: expo-image ile optimize edilmiş görseller
- **Animasyonlar**: react-native-reanimated
- **Navigasyon**: Expo Router (file-based)
- **Stil**: NativeWind (Tailwind CSS)
- **Durum Yönetimi**: React Context + useState/useReducer
