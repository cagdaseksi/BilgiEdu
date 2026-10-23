# BilgiEdu egitmen hazirligi

## Oturumdan once

1. Her katilimcidan GitHub kullanici adini al. Gorunen ad ile GitHub kullanici
   adini karistirma; sahiplik kontrolu PR'yi acan gercek GitHub hesabini kullanir.
2. Her kisiye benzersiz bir ASCII kod ata: `ayse`, `mehmet`, `ali-demir` gibi.
   Ayni kodu iki kisiye verme. Iki oturumun ayni icerikte olmasi, katilimci
   kodlarinin ayni olacagi anlamina gelmez; farkli kisiler icin farkli kod kullan.
3. Kayitlari ana repoya katilimcilar fork almadan once ekle.
4. Herkesin Node/Git ve en az bir native gelistirme ortamini onceden hazirlamasini
   sagla. 50 dakikalik oturumda kurulum yerine gelistirmeye zaman ayir.

## Katilimci kaydetme

Bu islemi katilimci degil, yalniz egitmen yapar. Temiz ve guncel maintainer
kopyasinda ornek kayit:

```sh
npm run participant:add -- ayse "Ayse" GERCEK_GITHUB_KULLANICI_ADI
npm run check
```

Komut `src/participants/ayse/` klasorunu ve GitHub hesabi -> klasor eslesmesini
`workshop/ownership.json` icinde hazirlar. Katilimci kaydini kontrol et ve normal
maintainer surecinle ana dala al. Sonra katilimciya atanmis kodunu bildir.
Kayit zaten varsa komutun hata vermesi beklenir; mevcut klasorun uzerine yazma.

Su anda repoda kayitli baslangic katilimcisi `cagdaseksi -> cagdas` eslesmesidir.
Rehberdeki diger adlar ornektir; henuz gercek katilimci kaydi olusturmazlar.

## Katilimcilara gonderilecek mesaj

```text
BilgiEdu yapay zeka ile mobil oyun atolyesi icin:

1. GitHub kullanici adini bana ilet ve sana atadigim katilimci kodunu al.
2. Rehberi takip ederek repoyu kendi hesabina fork et ve bilgisayarina klonla:
   https://github.com/cagdaseksi/BilgiEdu/blob/main/docs/katilimci-rehberi.md
3. Kodunu sadece src/participants/SANA_ATANAN_KOD icinde gelistir.
4. Asagidaki prompttaki dort alani doldurup Codex'e ver:
   https://github.com/cagdaseksi/BilgiEdu/blob/main/docs/codex-katilimci-promptu.txt
5. Bitirince kendi forkundan participant/SANA_ATANAN_KOD branch'i ile
   cagdaseksi/BilgiEdu:main hedefli PR ac ve baglantisini bana ilet.

Metinlerde ve dosya adlarinda Turkce karakter kullanma.
Yerel gelistirme icin emulator/simulator kurulumunu oturumdan once tamamla.
TestFlight/Play surumu, kod degisikliklerini canli olarak gostermez.
```

## PR kabul kontrolu

- PR sahibi GitHub kullanici adi dogru katilimci koduyla eslesiyor mu?
- Kaynak branch `participant/<atanmis-kod>` mu?
- Degisiklikler yalniz atanmis katilimci klasorunde mi?
- `participant-scope` ve `app-checks` basarili mi? GitHub ilk katkida workflow
  onayi istiyorsa uygun katkida calistirma onayini ver; kontrolleri kapatma.
- Ekranlar aciliyor, seviyeler seciliyor ve oyundan geri donulebiliyor mu?
- Yalniz o an acik oyun dongusu calisiyor mu? Native veya ortak dosya degismis mi?

Ana repo yazma yetkisini katilimcilara verme. Herkes kendi hesabinda fork kullanir.
AGENTS.md bir dosya sistemi kilidi degildir; gercek birlestirme siniri GitHub
yetkileri, korumali main, zorunlu kontroller ve egitmen incelemesidir.

## Katilimcilara dagitim

Kabul edilen PR'leri birlestir. Yeni build numarasi ile test surumlerini hazirla
ve dagitimdan once cihazda kontrol et. Ayrintilar [surum rehberinde](releases.md).

Su anki tek kisilik test listesi tum katilimcilari kapsamaz. Android icin her
katilimcinin Google hesabini test listesine ekle. iOS'ta yeni App Store Connect
hesap rolleri vermek yerine dis TestFlight grubunu kullan; ilk dis test build'i
icin Apple beta incelemesini tamamla. Egitmenlik/yonetim yetkisi ile test
kullaniciligini birbirine karistirma.
