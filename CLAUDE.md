# AI Gelisim Talimatlari

Bu dosya, Retrocell projesi uzerinde calisan AI agent'larina (Claude, Cursor, Codex vb.) yonelik proje ozgu talimatlar icerir.

## Proje Ozeti

Retrocell, AI destekli bir retrospektif aracıdır. React + TypeScript + Tailwind CSS + Vite ile gelistirilmistir. Veriler localStorage'da saklanır. AI entegrasyonu Google Gemini 2.0 Flash API uzerinden yapılır.

## Proje Kurallari

### Kod Stili
- TypeScript kullan. Tum fonksiyonlar ve bilesenler typlanmali.
- `interface` tercih et, `type` alias sadece union/intersection icin.
- Fonksiyon bilesenleri kullan (`function Component() {}`); class bilesenleri yasak.
- Props icin `interface Props { ... }` tanimla.
- `export default` ana bilesenler icin; yardımcı fonksiyonlar icin named export.
- Tailwind CSS utility class'ları kullan; custom CSS (`App.css`) sadece gerekirse.

### Durum Yonetimi
- Tum global durum `AppContext` (React Context) uzerinden yonetilir.
- Yerel bilesen durumu `useState` ile.
- Veri kalıcılığı icin `src/lib/storage.ts`'deki fonksiyonları kullan.
- `localStorage`'a dogrudan erisme — her zaman `storage.ts` fonksiyonlarını kullan.

### AI Entegrasyonu
- Tum AI cagrıları `src/lib/ai.ts` icinden yapılır.
- Yeni AI fonksiyonu eklerken:
  1. Prompt tasarla (Scrum Master AI rolu, JSON cıktı).
  2. Mock veri olustur (API anahtarı yoksa calissin).
  3. `parseJSON()` ile cevabı parse et.
  4. `callGemini()` yardımcısını kullan.
- Model sabiti: `gemini-2.0-flash`, temperature: `0.4`.
- Promptlarda Turkce karakter sorununu onlemek icin Turkce metinleri duzgun yaz.

### Bilesen Yapisi
- Her sekme kendi dosyasında: `*Tab.tsx`.
- Ortak UI parcaları `src/components/` altında.
- `LoadingSpinner` gibi yeniden kullanılabilir bilesenler ayri dosyada.

### Hata Yonetimi
- AI cagrılarında try/catch kullan.
- Kullanıcıya anlamlı hata mesajları goster (Turkce).
- Yukleme durumlarını `LoadingSpinner` ile goster.

### Guvenlik
- API anahtarlarını asla hard-code yazma. `import.meta.env.VITE_GEMINI_API_KEY` kullan.
- Kisisel veriler (uye isimleri) sadece localStorage'da; AI'a gonderirken anonimlestir.

## Onemli Dosyalar

| Dosya | Amac |
|-------|------|
| `src/types/index.ts` | Tum TypeScript arayuzeleri |
| `src/lib/ai.ts` | AI servisi ve promptlar |
| `src/lib/storage.ts` | localStorage CRUD islemleri |
| `src/context/AppContext.tsx` | Global durum yonetimi |
| `src/App.tsx` | Ana uygulama ve tab navigasyonu |

## Gelistirme Akisi

1. Yeni ozellik icin tip tanimlarını kontrol et (`src/types/index.ts`).
2. Gerekirse yeni tip ekle.
3. Storage fonksiyonu yaz (eger yeni veri turu varsa).
4. AI fonksiyonu yaz (eger AI entegrasyonu varsa).
5. Bileseni yaz ve AppContext'e bagla.
6. `App.tsx`'e yeni sekme ekle (eger yeni sekme ise).

## Test Stratejisi

- Su an manuel test.
- Gelecekte: React Testing Library + Vitest.
