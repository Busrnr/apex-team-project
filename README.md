# Retrocell

AI Destekli Retrospektif Aracı — Scrum Master'ların retrospektif süreçlerini kolaylaştırmak için geliştirilmiş, yapay zeka destekli bir web uygulaması.

<img width="1438" alt="Screenshot 2025-05-14 at 12 42 01" src="https://github.com/user-attachments/assets/placeholder-screenshot.png" />

## Ozet

Retrocell, sprint boyunca ekip uyelerinin guenluek notlarını toplayan, bu notları AI ile analiz ederek retrospektif gündemi oluşturan, gündem maddelerinden somut aksiyonlar üreten ve bir sonraki retro öncesinde takımı önceki sprintin aksiyonları hakkında bilgilendiren bir araçtır.

## Ozellikler

- **Guenluek Notlar** — Ekip uyeleri sprint boyunca guenluek notlarını (blokaj, kazanım, sorun, fikir) anonim olarak kaydedebilir.
- **AI Retro Gündem** — OpenAI GPT-4o ile sprint notları analiz edilerek temelere gruplanmış, önceliklendirilmiş gündem maddeleri oluşturulur.
- **AI Aksiyonlar** — Seçili gündem maddelerinden somut, ölçuelbilir, sahibi atanmış aksiyon maddeleri üretilir.
- **Sonraki Retro Hatırlatması** — AI, bir sonraki retro öncesinde önceki sprint aksiyonlarının durumunu (tamamlandı, acık, unutuldu) ozetleyerek takımı bilgilendirir.
- **Sprint Yoentimi** — Farklı sprintler arasında geçiş yapılabilir; her sprintin kendi notları, gündemi ve aksiyonları olur.

## Teknolojiler

| Katman | Teknoloji |
|--------|-----------|
| On Yuze | React 18, TypeScript, Tailwind CSS |
| Derleme | Vite |
| Rouiting | Yok (tek sayfa) |
| Durum Yoenetimi | React Context + localStorage |
| AI Entegrasyonu | OpenAI GPT-4o API |
| Linting | ESLint |

## AI Aracları ve Model Bilgileri

Geliştirme sürecinde kullanılan AI araçları:

| Araç | Model | Kullanım Amacı |
|------|-------|----------------|
| **Claude Code** | Claude Opus 4.7 | Kod yazma, refaktör, mimari kararlar, dökümantasyon |
| **Claude** (Web) | Claude Opus 4.7 | Planlama, özellik tasarımı |

Prompt yapılandırma dosyası: [`CLAUDE.md`](./CLAUDE.md)

### MCP Listesi

Mevcut olmayan. Proje kapsamında harici MCP sunucusu kullanılmamıştır.

## API Entegrasyonları

| API | Uç Nokta | Amaç |
|-----|----------|------|
| OpenAI GPT-4o | `POST https://api.openai.com/v1/chat/completions` | Retro gündemi oluşturma, aksiyon üretme, hatırlatma metni oluşturma |

## Ekran Goeruentueleri

### Guenluek Notlar Sekmesi
Ekip uyeleri guenluek notlarını ekler.

### AI Retro Gündem Sekmesi
AI notları analiz eder ve gündem maddeleri oluşturur.

### Aksiyonlar Sekmesi
Seçili gündem maddelerinden somut aksiyonlar üretilir.

### Sonraki Retro Hatırlatması
Önceki sprint aksiyonlarının durumu ozetlenir.

## Kurulum

### Gereksinimler

- Node.js 18+
- npm 9+
- OpenAI API anahtarı (istege baglı — yoksa mock verilerle çalışır)

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

3. `.env.example` dosyasını `.env` olarak kopyalayıp OpenAI API anahtarınızı girin:

```bash
cp .env.example .env
```

4. Geliştirme sunucusunu başlatın:

```bash
npm run dev
```

5. Tarayıcıda `http://localhost:5173` adresini açın.

### Uretim Derlemesi

```bash
npm run build
```

`dist/` klasöründe uretim dosyaları oluşur.

## Cevre Degiskenleri

| Degisken | Zorunlu | Acıklama |
|----------|---------|----------|
| `VITE_OPENAI_API_KEY` | Hayır | OpenAI API anahtarı. Verilmezse mock verilerle çalışır. |

.cls-1 {
  fill: #fff; }

.cls-2 {
  fill: #0077be; }

## Proje Yapısı

```
.
├── src/
│   ├── components/          # React bileşenleri
│   │   ├── DailyNotesTab.tsx       # Guenluek notlar sekmesi
│   │   ├── RetroAgendaTab.tsx      # AI retro gündem sekmesi
│   │   ├── ActionItemsTab.tsx      # Aksiyonlar sekmesi
│   │   ├── NextRetroTab.tsx        # Sonraki retro hatırlatması sek.
│   │   └── LoadingSpinner.tsx      # Yu klase animasyonu
│   ├── context/
│   │   └── AppContext.tsx          # Global durum yoentimi (React Context)
│   ├── lib/
│   │   ├── ai.ts                   # OpenAI API entegrasyonu
│   │   └── storage.ts              # localStorage yardımcıları
│   ├── types/
│   │   └── index.ts                # TypeScript arayuelerı
│   ├── assets/
│   │   └── react.svg
│   ├── App.tsx                     # Ana uygulama bileşeni
│   ├── main.tsx                    # Uygulama giriş noktası
│   ├── index.css                   # Tailwind direktifleri
│   ├── App.css
│   └── vite-env.d.ts
├── docs/                    # Proje dökümantasyonu
│   ├── plan.md              # Proje planı
│   ├── architecture.md      # Mimari dökümentasyon
│   └── development-phases.md # Geliştirme fazları
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── eslint.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── .env.example
├── .gitignore
├── CLAUDE.md                # AI geliştirme talimatları
└── README.md
```

## Lisans

MIT
