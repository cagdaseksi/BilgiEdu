# BilgiEdu katilimci rehberi

Hedef: Kendi oyun ana sayfani, seviye secimini ve basit oyun sahneni yapay zeka
yardimiyla gelistir. Her katilimci kendi bilgisayarinda, kendi forkunda ve sadece
kendisine ayrilan klasorde calisir.

## 1. Egitmenden katilimci kodunu al

Egitmene GitHub kullanici adini ilet. Egitmen sana bir katilimci kodu atar ve
klasorunu ana repoya ekler. Kod kucuk harflerden, rakamlardan ve tireden olusur.

Bu rehberde `ayse` bir ornektir. Komutlarda bunu kendi kodunla degistir.
`GITHUB_KULLANICI_ADIN` yerine de kendi GitHub kullanici adini yaz.

Baslamadan once egitmenin kaydi tamamladigindan emin ol:

- `src/participants/ayse/` klasoru ana repoda bulunmali.
- `workshop/ownership.json` icinde senin GitHub kullanici adin `ayse` ile eslesmeli.
- Kayit eksikse bunu egitmene bildir. Kayit dosyasini kendin degistirme ve baska
  birinin klasorunu kullanma.

## 2. Kendi GitHub kopyani olustur

1. [BilgiEdu reposunu ac](https://github.com/cagdaseksi/BilgiEdu).
2. **Fork** dugmesine bas ve kopyayi kendi GitHub hesabinda olustur.
3. Fork adini `BilgiEdu` olarak birak.
4. Daha once fork olusturduysan, egitmen kaydindan sonra **Sync fork** ile guncelle.

Herkes kendi GitHub hesabini kullanir. Egitmenin hesabi, sifresi veya tokeni
paylasilmaz. Ana repoya yazma izni istemene gerek yoktur.

## 3. Forkunu bilgisayarina indir

Terminal veya Windows'ta Git Bash ac. Yer tutuculari degistirdikten sonra calistir:

```sh
git clone https://github.com/GITHUB_KULLANICI_ADIN/BilgiEdu.git
cd BilgiEdu
git remote add upstream https://github.com/cagdaseksi/BilgiEdu.git
git switch -c participant/ayse
```

`origin` kendi forkun, `upstream` egitmenin ana reposudur. Kodlari kendi
`origin` adresine gondereceksin. `git remote -v` ile adresleri kontrol edebilirsin.
Kendi kodunu GitHub'da **Code > Download ZIP** ile indirmek yerine bu Git
akisiyla indir; branch ve PR teslimi icin Git gecmisi korunur.

## 4. Gelistirme ortamini hazirla

Bu kurulumlari oturumdan once tamamla:

- Git ve Node.js 22.11 veya uzeri.
- Codex uygulamasi ve kendi hesabin.
- Android icin Java 17, Android Studio, Android SDK ve acik bir emulator.
- iOS icin macOS, Xcode, CocoaPods ve bir iOS Simulator.

Projenin kok klasorunde:

```sh
npm ci
npm run check
```

Ilk terminalde Metro'yu acik tut:

```sh
npm start
```

Android emulatoru acikken ikinci terminalde, ayni proje kokunden:

```sh
npm run android
```

Mac'te iOS icin once pod kurulumunu yap; sonra Simulator uzerinde calistir:

```sh
cd ios
pod install
cd ..
npm run ios
```

Ilk native derleme zaman alabilir. Android veya iOS seceneklerinden kendi
ortamina uygun olan birini kullanman yeterlidir. Bu proje React Native CLI
projesidir; Expo Go ile acilmaz.

Telefondaki magazadan kurulmus surum hazir ornekleri denemek icindir. Kendi
kodunu canli gormek icin yerel gelistirme surumunu kullan. Android'de Play
surumu ile debug surumu ayni paket kimligine ve farkli imzalara sahiptir; bu
nedenle baslangicta emulator kullan. Mevcut telefon uygulamasini veya verilerini
otomatik kaldirma. Fiziksel cihaz kurulumunda egitmenden destek al.

## 5. Projeyi Codex'te ac ve promptu ver

1. Codex'te bilgisayarindaki `BilgiEdu` klasorunu proje olarak ac.
2. [Hazir Codex promptunu ac](codex-katilimci-promptu.txt).
3. Dort alani doldur: GitHub kullanici adi, katilimci kodu, gorunen ad ve oyun fikri.
4. Promptun tamamini yeni bir sohbete yapistir.

Ornek alanlar:

```text
GITHUB_KULLANICI_ADIM: ayse-github
KATILIMCI_KODUM: ayse
GORUNEN_ADIM: Ayse
OYUN_FIKRIM: Ekranda rastgele beliren hedefe 20 saniyede olabildigince cok dokun.
```

`ayse-github` gercek bir kayit degildir; kendi bilgilerini kullan.

Calisacagin dosyalar:

```text
src/participants/ayse/
  AGENTS.md         Kurallar; oku, degistirme.
  participant.json  id sabit; ad, oyun adi ve renk duzenlenebilir.
  Screen.tsx        Sana ait ana sayfa, seviyeler ve oyun sahnesi.
  assets/           Gerekirse kendi gorsellerin; klasoru sen olusturabilirsin.
```

`Screen.tsx`, `screen` degerine gore `home`, `levels` ve `game` asamalarini
gosterir. Ortak yonlendirmeyi veya `App.tsx` dosyasini degistirme. Oncelik kendi
ana sayfani tamamlamak; ardindan seviyeler ve tek mekanikli oyun sahnesini ekle.

## 6. Kontrol et ve kendi forkuna gonder

Codex'in su akisi tamamlamasini iste:

1. Katilimci listesinden kendi adini sec.
2. Kendi ana sayfandan seviyelere git.
3. Bir seviye ac, oyunu dene ve geri don.
4. `npm run check` calistir.
5. `git status --short` ve `git diff --name-only` ile sadece kendi klasorunun
   degistigini kontrol et.

Kendi kodun `ayse` ise teslim komutlari:

```sh
git add -- src/participants/ayse
git diff --cached --name-only
git commit -m "Build ayse workshop game"
git push -u origin participant/ayse
```

`git add .`, `git push upstream`, force push veya `main` uzerinde gelistirme
yapma. Kod disindaki yerel kurulum dosyalarini, anahtarlari ve APK/IPA dosyalarini
commit etme.

## 7. Ana projeye PR ac

GitHub'da kendi forkundan **Compare & pull request** ile PR olustur:

- Hedef repo: `cagdaseksi/BilgiEdu`
- Hedef dal: `main`
- Kaynak repo: kendi `BilgiEdu` forkun
- Kaynak dal: `participant/ayse` (kendi kodun)
- Baslik: `Ayse - Ilk Oyunum` (kendi adin ve oyun adin)

Aciklamaya ne yaptigini, `npm run check` sonucunu, cihazda denediysen hangi
cihaz/emulatoru kullandigini ve varsa eksikleri yaz. PR baglantisini egitmene ilet.
Kontrolleri gecen PR'yi egitmen inceler ve birlestirir. Kendin merge etme.

GitHub ilk katkida Actions calistirma onayi isterse egitmene haber ver.
`participant-scope` hatasi alirsan kullanici adi, branch, kayit ve degisen dosya
yollarini kontrol et; kontrolu kapatma veya sahiplik dosyasini degistirme.

## 8. Ortak uygulamada gorme

PR birlestikten sonra egitmen yeni test surumu hazirlar. TestFlight/Google Play
surumunu guncellediginde ortak uygulamada ekranin gorunur. PR gondermek veya
Metro'da kod degistirmek, kurulu magaza surumunu otomatik guncellemez.

## Kaynaklar

- [GitHub: fork, branch ve PR akisi](https://docs.github.com/en/get-started/exploring-projects-on-github/contributing-to-a-project)
- [React Native: cihazda calistirma](https://reactnative.dev/docs/running-on-device)
- [OpenAI: AGENTS.md ile proje talimatlari](https://learn.chatgpt.com/docs/agent-configuration/agents-md)
