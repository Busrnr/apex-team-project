# Retrocell — Proje Planı

## Projenin Amaci

Retrocell, Scrum Master'ların retrospektif süreclerini kolaylaştırmak ve yapay zeka desteği ile daha verimli hale getirmek için gelistirilmış bir web uygulamasıdır.

## Hedef Kit

- Scrum Master'lar
- Agile takım liderleri
- Yazılım gelistirme ekipleri

## Temel Sorun ve Cozum

### Sorun
Retrospektif toplantılarında:
- Ekip uyelerinin notları genellikle cesitli kanallarda (Slack, email, kâğıt) dagınık halde olur.
- Notların analizi ve gündem olusturulması manuel ve zaman alıcıdır.
- Aksiyon maddeleri somut degilse takip edilemez.
- Bir sonraki retro öncesinde önceki aksiyonların durumu hatırlanmaz.

### Cozum
- Tum sprint notlarını tek bir yerde toplar.
- AI ile notları analiz eder, temelere gruplar, önceliklendirir.
- Gündem maddelerinden somut, sahibi atanmış aksiyonlar uretir.
- Bir sonraki retro öncesinde takımı bilgilendirir.

## Kullanici Akısı

```
1. Ekip uyeleri sprint boyunca guenluek notlarını ekler.
2. Sprint sonunda Scrum Master "Retro Gündemi Olustur" dediginde AI analiz eder.
3. Olusan gündem maddelerinden istenenler secilir.
4. "Aksiyonları Olustur" ile somut aksiyonlar uretilir.
5. Bir sonraki sprint basında "Hatırlatma Olustur" ile önceki aksiyonların durumu ozetlenir.
6. Yeni sprint baslar, döngü tekrarlar.
```

## Kapsam

### MVP (Minimum Viable Product)
- Guenluek not ekleme
- AI ile retro gündemi olusturma
- Aksiyon maddeleri uretme
- Sonraki retro hatırlatması
- Sprint yönetimi

### Gelecek Fikirler (V2)
- Takım uyesi yönetimi (ekleme/çıkarma)
- Not kategorileri (blokaj, kazanım, risk, fikir)
- Retro gündem maddelerini manuel duzenleme
- Aksiyon durumu raporu ve grafik
- Farklı AI model secenekleri

## Basari Kriterleri

- Guenluek notların hızlı ve kolay kaydedilmesi
- AI cıktısının anlamlı ve kullanılabilir olması
- Aksiyon maddelerinin somut ve takip edilebilir olması
- Kullanıcı deneyiminin sade ve anlaşılır olması
