# Gelisim Fazlari

## Faz 1: Proje Kurulumu ve Temel Yapi (M1)

### Hedef
React + TypeScript + Tailwind CSS + Vite altyapısını kurmak.

### Yapilanlar
- Vite ile React + TypeScript projesi baslatıldı.
- Tailwind CSS ve PostCSS yapilandırıldı.
- ESLint ve TypeScript yapilandırıldı.
- Proje dizin yapısı (`src/components/`, `src/context/`, `src/lib/`, `src/types/`) olusturuldu.
- Tip tanımlamaları (`src/types/index.ts`) yazıldı.

### Dosyalar
- `package.json`, `vite.config.ts`, `tailwind.config.js`, `postcss.config.js`
- `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`
- `src/types/index.ts`

---

## Faz 2: Temel Bilesenler ve Durum Yonetimi (M2)

### Hedef
Guenluek not ekleme, listeleme ve sprint yonetimini calistirmak.

### Yapilanlar
- `AppContext` (React Context) olusturuldu.
- `localStorage` yardımcı fonksiyonları (`src/lib/storage.ts`) yazıldı.
- `App.tsx` — Tab navigasyonu ve Sprint ID yonetimi eklendi.
- `DailyNotesTab.tsx` — Not ekleme formu ve not listesi yapıldı.
- `LoadingSpinner.tsx` — Yu kleme animasyonu eklendi.

### Dosyalar
- `src/context/AppContext.tsx`
- `src/lib/storage.ts`
- `src/App.tsx`
- `src/components/DailyNotesTab.tsx`
- `src/components/LoadingSpinner.tsx`

---

## Faz 3: AI Entegrasyonu — Retro Gündem (M3)

### Hedef
OpenAI API ile not analizi ve gündem olusturma.

### Yapilanlar
- `src/lib/ai.ts` olusturuldu. Icinde:
  - `generateRetroAgenda()` fonksiyonu
  - `callOpenAI()` yardımcısı
  - `parseJSON()` yardımcısı
  - Mock veriler (API anahtarı yoksa)
- `RetroAgendaTab.tsx` — Gündem olusturma, listeleme, secme/deselected yapıldı.
- OpenAI promptu tasarlandı (Scrum Master AI rolu, anonimlestirme, temeleme, onceliklendirme).

### Dosyalar
- `src/lib/ai.ts`
- `src/components/RetroAgendaTab.tsx`

---

## Faz 4: AI Entegrasyonu — Aksiyonlar (M4)

### Hedef
Secili gündem maddelerinden somut aksiyonlar uretmek.

### Yapilanlar
- `generateActionItems()` fonksiyonu `ai.ts`'e eklendi.
- `ActionItemsTab.tsx` — Aksiyon olusturma, sahip atama, durum takibi yapıldı.
- Aksiyon durumları: `open`, `done`, `forgotten`

### Dosyalar
- `src/lib/ai.ts` (guncellendi)
- `src/components/ActionItemsTab.tsx`

---

## Faz 5: AI Entegrasyonu — Hatırlatma (M5)

### Hedef
Bir sonraki retro öncesinde önceki aksiyonların durumunu ozetlemek.

### Yapilanlar
- `generateReminder()` fonksiyonu `ai.ts`'e eklendi.
- `NextRetroTab.tsx` — Hatırlatma olusturma, istatistik kartları, onceki aksiyon listesi yapıldı.
- `ReminderData` tipi eklendi.

### Dosyalar
- `src/lib/ai.ts` (guncellendi)
- `src/types/index.ts` (guncellendi)
- `src/components/NextRetroTab.tsx`

---

## Faz 6: UI/UX Parlatma ve Dökümantasyon (M6)

### Hedef
Kullanıcı deneyimini iyilestirmek ve dökümantasyonu tamamlamak.

### Yapilanlar
- Tailwind stilleri ile responsive ve modern UI.
- Emoji ve renk kodları ile görsel ayrım (priority, status, type).
- `README.md` — Detaylı proje acıklaması.
- `CLAUDE.md` — AI gelistirme talimatları.
- `docs/` klasoru — Plan, mimari, gelisim fazları.
- `.env.example` — Cevre degiskeni ornegi.

### Dosyalar
- `README.md`
- `CLAUDE.md`
- `docs/plan.md`
- `docs/architecture.md`
- `docs/development-phases.md`
- `.env.example`
- Tum `src/components/*.tsx` dosyaları (stil guncellemeleri)

---

## Sonraki Adımlar (Backlog)

1. **Takım Uyesi Yonetimi** — Ekip uyelerini ekleme/çıkarma/sılme.
2. **Not Kategorileri** — Notları onceden tanımlı kategorilere (blokaj, kazanım, risk) ayırma.
3. **Manuel Düzenleme** — AI cıktısını manuel duzenleme.
4. **Aksiyon Raporu** — Sprintler arası aksiyon durumu grafikleri.
5. **Backend Entegrasyonu** — localStorage yerine gercek backend API.
6. **Farklı AI Model Seçimi** — GPT-4o, GPT-4o-mini, Claude vb.
