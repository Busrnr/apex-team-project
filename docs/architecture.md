# Mimari Dokumantasyonu

## Genel Mimari

Retrocell, istemci tarafında calısan (client-side) tek sayfalık bir web uygulamasıdır (SPA). Sunucu tarafı isleme (SSR) icermez; tum islemler tarayıcıda gerceklestirilir.

| Katman | Teknoloji | Amac |
|--------|-----------|------|
| UI | React 18 + Tailwind CSS | Kullanıcı arayuzu |
| Durum | React Context + localStorage | Global durum ve kalıcı depolama |
| AI Entegrasyonu | Google Gemini 2.0 Flash API | Dogal dil isleme ve uretken AI |
| Derleme | Vite | Hızlı gelistirme ve uretim derlemesi |
| Tip Guvenligi | TypeScript | Derleme zamanı tip kontrolu |

## Veri Akısı Diyagramı

```
+---------------+      +------------------+      +---------------+
| Kullanıcı     | ---> | React Components | ---> | React Context |
| (Not girisi)  |      | (UI katmanı)     |      | (Durum)       |
+---------------+      +------------------+      +-------+-------+
                                                        |
                                                        v
                                               +--------+---------+
                                               | localStorage      |
                                               | (Kalıcı depolama) |
                                               +--------+---------+
                                                        |
                          +-----------------------------+
                          |
                          v
               +--------------------+      +-------------------+
               | AI Servisi         | <--- | OpenAI API        |
               | (src/lib/ai.ts)    |      | (GPT-4o)          |
               +--------------------+      +-------------------+
                          |
                          v
               +--------------------+
               | JSON Parse         |
               | (Agenda/Actions)   |
               +--------------------+
```

## Bilesen Mimarisi

### Ana Bilesenler

```
App.tsx
├── Header (Sprint ID, Tab navigasyonu)
│
├── Tab Icerigi (Aktif sekmeye gore)
│   ├── DailyNotesTab.tsx      # Guenluek not girisi ve listesi
│   ├── RetroAgendaTab.tsx     # AI gündem olusturma ve secimi
│   ├── ActionItemsTab.tsx     # AI aksiyon uretme ve durum takibi
│   └── NextRetroTab.tsx       # Onceki aksiyon hatırlatması
│
└── Footer
```

### Durum Yoentimi (AppContext)

AppContext, uygulamanın tum global durumunu yonetir:

| State | Tur | Acıklama |
|-------|-----|----------|
| `members` | `TeamMember[]` | Varsayılan ekip uyeleri (localStorage'dan) |
| `entries` | `DailyEntry[]` | Aktif sprintin guenluek notları |
| `sessions` | `RetroSession[]` | Tum retro oturumları |
| `currentSprint` | `string` | Aktif sprint ID'si |

### Context Actions

| Action | Acıklama |
|--------|----------|
| `addEntry` | Yeni guenluek notu ekle |
| `refreshEntries` | Notları localStorage'dan yeniden yukle |
| `upsertSession` | Retro oturumu olustur/guncelle |
| `updateAgendaItem` | Gündem maddesini guncelle (secim durumu vb.) |
| `updateActionItem` | Aksiyon maddesini guncelle (sahip, durum) |

## Veri Modeli

### TeamMember
```typescript
interface TeamMember {
  id: string;       // Benzersiz kimlik
  name: string;     // Gosterilen isim
  role: MemberRole; // Uzmanlık alanı
}
```

### DailyEntry
```typescript
interface DailyEntry {
  id: string;        // Benzersiz kimlik
  memberId: string;  // Yazan uye
  memberRole: MemberRole; // Rol (anonimlestirme icin)
  text: string;      // Not icerigi
  createdAt: string; // ISO tarih
  sprintId: string;  // Baglı sprint
}
```

### AgendaItem
```typescript
interface AgendaItem {
  id: string;        // Benzersiz kimlik
  theme: string;     // Tema basligi
  summary: string;   // Ozet aciklama
  priority: 'High' | 'Medium' | 'Low'; // Oncelik
  type: 'Blocker' | 'Improvement' | 'Win' | 'Risk' | 'Question'; // Tur
  selected: boolean; // Aksiyon uretimi icin secili mi
}
```

### ActionItem
```typescript
interface ActionItem {
  id: string;              // Benzersiz kimlik
  agendaItemTheme: string; // Bagli gundem maddesi
  action: string;          // Somut aksiyon metni
  suggestedOwner: string;  // AI onerilen sahip
  assignedOwner: string;   // Atanan sahip (degistirilebilir)
  priority: 'High' | 'Medium' | 'Low'; // Oncelik
  status: 'open' | 'done' | 'forgotten'; // Durum
  sprintId: string;        // Bagli sprint
}
```

### RetroSession
```typescript
interface RetroSession {
  id: string;            // Benzersiz kimlik
  sprintId: string;      // Bagli sprint
  generatedAt: string;   // Olusturulma tarihi
  agendaItems: AgendaItem[]; // Gündem maddeleri
  actionItems: ActionItem[]; // Aksiyon maddeleri
}
```

### ReminderData
```typescript
interface ReminderData {
  reminderText: string;   // Hatırlatma metni
  completedCount: number; // Tamamlanan aksiyon sayısı
  openCount: number;      // Acik aksiyon sayısı
  forgottenCount: number; // Unutulan aksiyon sayısı
  highlight: string;      // En kritik cozumsuz durum
}
```

## Depolama Stratejisi

Tum veriler tarayıcı `localStorage`'da saklanır. Uygulama offline calısabilir.

| localStorage Anahtarı | Veri Turu |
|------------------------|-----------|
| `retro_members` | `TeamMember[]` |
| `retro_entries` | `DailyEntry[]` |
| `retro_sessions` | `RetroSession[]` |
| `retro_current_sprint` | `string` (aktif sprint ID) |

## AI Entegrasyonu

### AI Servisi (src/lib/ai.ts)

Uc farklı AI fonksiyonu sunar:

1. **`generateRetroAgenda(entries)`**
   - Girdi: Guenluek notlar
   - Cikti: Temelere gruplanmıs, onceliklendirilmıs gündem maddeleri
   - Model: GPT-4o, temperature=0.4

2. **`generateActionItems(agendaItems, members, sprintId)`**
   - Girdi: Secili gündem maddeleri ve ekip uyeleri
   - Cikti: Somut aksiyon maddeleri (sahip onerisi ile)
   - Model: GPT-4o, temperature=0.4

3. **`generateReminder(previousActions)`**
   - Girdi: Onceki sprint aksiyonları
   - Cikti: Durum ozeti ve hatırlatma metni
   - Model: GPT-4o, temperature=0.4

### Prompt Tasarımı

Tum promptlar su prensiplere gore tasarlanmıstır:
- Sistem rolü: "Deneyimli bir Scrum Master AI'si"
- Cikti formatı: JSON (markdown yok)
- Anonimlestirme: Notlarda sadece rol bilgisi kullanılır, kisi isimleri gizlenir.
- Onceliklendirme: Yuksek / Orta / Dusuk

### Mock Veriler

`VITE_OPENAI_API_KEY` cevre degiskeni verilmediginde, AI yerine mock veriler donulur. Bu, API anahtarı olmadan uygulamayı gelistirmeyi ve test etmeyi saglar.

## Guvenlik

- OpenAI API anahtarı sadece istemci tarafında kullanılır (Vite cevre degiskeni).
- Kisisel veriler (uye isimleri) sadece yerel depolamada saklanır.
- AI'a gonderilen notlarda sadece rol bilgisi paylasılır, isimler anonimlestirilir.
