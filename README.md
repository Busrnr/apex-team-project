# Retrocell

Sprint retrospektiflerini AI ile otomatize eden web uygulaması. Ekip üyeleri sprint boyunca günlük notlar bırakır; uygulama bu notları Google Gemini 2.0 Flash ile analiz ederek retro gündemi, aksiyon maddeleri ve sonraki sprint hatırlatmaları üretir.

<img width="1438" alt="Screenshot 2025-05-14 at 12 42 01" src="https://github.com/user-attachments/assets/placeholder-screenshot.png" />

## Bu proje ne işe yarar?

Scrum Master'ların ve ekiplerin retrospektif sürecini daha sistematik hale getirir:

- **Bilgi kaybını önler.** Sprint içindeki blokajlar, kazanımlar, sorunlar tek bir yerde toplanır; retro sırasında "bu sprintte ne oldu hatırlamıyorum" sorunu ortadan kalkar.
- **Yapılandırılmış gündem üretir.** AI notları temalara ayırır, önceliklendirir; ekip "toparlamayla" değil, tartışmayla vakit geçirir.
- **Somut aksiyon çıktısı verir.** Gündem maddelerinden sahibi belli, takip edilebilir aksiyonlar oluşturur.
- **Sprintler arası bağlantı kurar.** Bir sonraki retro öncesinde önceki aksiyonların durumunu özetler; "unutulmuş aksiyon" sorununu çözer.

## Nasıl çalışır? (Kullanım akışı)

1. **Günlük Notlar** – Ekip üyeleri sprint boyunca blokaj, kazanım, sorun, fikir kategorilerinde kısa notlar bırakır. Notlar anonimdir, sadece rol bilgisi (örn. "Frontend Dev") tutulur.
2. **AI Retro Gündemi** – Sprint sonunda AI tüm notları okur, benzer konuları gruplar, önceliklendirir ve her maddeyi türüne göre sınıflandırır (Blokaj, Risk, Kazanım, İyileştirme, Soru).
3. **Aksiyonlar** – Seçilen gündem maddelerinden AI somut, ölçülebilir aksiyonlar üretir. Her aksiyonun önerilen sahibi belirtilir; kullanıcı gerekiyorsa değiştirir. Aksiyonlar "açık", "tamamlandı", "unutuldu" olarak takip edilir.
4. **Sonraki Retro Hatırlatması** – Yeni sprint retro'su öncesinde AI, önceki sprint aksiyonlarının durumunu analiz ederek kısa bir açılış konuşması metni üretir. "Tamamlandı / açık / unutuldu" sayısı ve en kritik unutulan aksiyon öne çıkarılır.

Hiçbir veri sunucuya gitmez. Tüm veriler tarayıcı `localStorage`'da saklanır; AI'a yalnızca not metinleri ve anonim roller gönderilir.

## Özellikler

- **Günlük Notlar** – Ekip üyeleri sprint boyunca günlük notlarını (blokaj, kazanım, sorun, fikir) anonim olarak kaydedebilir.
- **AI Retro Gündem** – Google Gemini 2.0 Flash ile sprint notları analiz edilerek temelere gruplanmış, önceliklendirilmiş gündem maddeleri oluşturulur.
- **AI Aksiyonlar** – Seçili gündem maddelerinden somut, ölçülebilir, sahibi atanmış aksiyon maddeleri üretilir.
- **Sonraki Retro Hatırlatması** – AI, bir sonraki retro öncesinde önceki sprint aksiyonlarının durumunu (tamamlandı, açık, unutuldu) özetleyerek takımı bilgilendirir.
- **Sprint Yönetimi** – Farklı sprintler arasında geçiş yapılabilir; her sprintin kendi notları, gündemi ve aksiyonları olur.

## Teknolojiler

| Katman | Teknoloji |
|--------|-----------|
| Önyüz | React 18, TypeScript, Tailwind CSS |
| Derleme | Vite |
| Routing | Yok (tek sayfa) |
| Durum Yönetimi | React Context + localStorage |
| AI Entegrasyonu | Google Gemini 2.0 Flash API |
| Linting | ESLint |

## AI Geliştirme Araçları

| Araç | Model | Kullanım Amacı |
|------|-------|----------------|
| **Claude Code** | Claude Opus 4.7 | Kod yazma, refaktör, mimari kararlar, dökümantasyon |
| **Claude** (Web) | Claude Opus 4.7 | Planlama, özellik tasarımı |
| **Gemini** (Gems) | Gemini 2.0 Flash | Yardımcı analiz ve öneriler |
| **ChatGPT** | GPT-4o | Fikir tartışması ve alternatif çözümler |

Prompt yapılandırma dosyası: [`CLAUDE.md`](./CLAUDE.md)

## API Entegrasyonları

| API | Uç Nokta | Amaç |
|-----|----------|------|
| Google Gemini 2.0 Flash | `POST /v1beta/models/gemini-2.0-flash:generateContent` | Retro gündemi oluşturma, aksiyon üretme, hatırlatma metni oluşturma |

## Ekran Görüntüleri

### Günlük Notlar Sekmesi
Ekip üyeleri günlük notlarını ekler.

### AI Retro Gündem Sekmesi
AI notları analiz eder ve gündem maddeleri oluşturur.

### Aksiyonlar Sekmesi
Seçili gündem maddelerinden somut aksiyonlar üretilir.

### Sonraki Retro Hatırlatması
Önceki sprint aksiyonlarının durumu özetlenir.

## Kurulum

### Gereksinimler

- Node.js 18+
- npm 9+
- Google Gemini API anahtarı (isteğe bağlı — yoksa örnek verilerle çalışır)

### Adımlar

1. Repoyu klonlayın:

```bash
git clone https://github.com/username/apex-team-project.git
cd apex-team-project
```

2. Bağımlılıkları yükleyin:

```bash
npm install
```

3. `.env.example` dosyasını `.env` olarak kopyalayıp Gemini API anahtarınızı girin:

```bash
cp .env.example .env
```

API anahtarınızı [Google AI Studio](https://aistudio.google.com/app/apikey) adresinden alabilirsiniz.

4. Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

5. Tarayıcıda `http://localhost:5173` adresini açın.

### Üretim Derlemesi

```bash
npm run build
```

`dist/` klasöründe üretim dosyaları oluşur.

## Çevre Değişkenleri

| Değişken | Zorunlu | Açıklama |
|----------|---------|----------|
| `VITE_GEMINI_API_KEY` | Hayır | Google Gemini API anahtarı. Verilmezse örnek verilerle çalışır. |

## Proje Yapısı

```
.
├── src/
│   ├── components/          # React bileşenleri
│   │   ├── DailyNotesTab.tsx       # Günlük notlar sekmesi
│   │   ├── RetroAgendaTab.tsx      # AI retro gündem sekmesi
│   │   ├── ActionItemsTab.tsx      # Aksiyonlar sekmesi
│   │   ├── NextRetroTab.tsx        # Sonraki retro hatırlatması sek.
│   │   └── LoadingSpinner.tsx      # Yükleme animasyonu
│   ├── context/
│   │   └── AppContext.tsx          # Global durum yönetimi (React Context)
│   ├── lib/
│   │   ├── ai.ts                   # Gemini AI entegrasyonu ve promptlar
│   │   └── storage.ts              # localStorage yardımcıları
│   ├── types/
│   │   └── index.ts                # TypeScript arayüzleri
│   ├── App.tsx                     # Ana uygulama bileşeni
│   ├── main.tsx                    # Uygulama giriş noktası
│   └── index.css                   # Tailwind direktifleri
├── docs/                    # Proje dökümantasyonu
│   ├── plan.md              # Proje planı
│   ├── architecture.md      # Mimari dökümentasyon
│   └── development-phases.md # Geliştirme fazları
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── .env.example
├── .gitignore
├── CLAUDE.md                # AI geliştirme talimatları
└── README.md
```

## Lisans

MIT
