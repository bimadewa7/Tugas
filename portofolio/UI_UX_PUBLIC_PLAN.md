# UI/UX Overhaul Plan: Halaman Publik (Anti-Slop & Editorial Dark Pop)

Dokumen ini merangkum perombakan desain untuk seluruh halaman publik (`bio.html`, `expertise.html`, `achievements.html`, `gallery.html`, `contact.html`, serta `styles.css`) agar terbebas dari pola visual "AI-slop" dan menguatkan estetika *moody indie/editorial* (seperti The Neighbourhood & Arctic Monkeys).

---

## 1. Pembersihan Animasi & Interaksi Cengeng (Anti-Slop)
*   **Hapus `translateY` dan Float**: Animasi `.reveal` saat ini menggunakan *Fade Up* yang mengambang saat di-scroll. Ini adalah pola AI default. Transisi masuk akan diubah menjadi *fade-in* cepat (hanya `opacity`) tanpa perpindahan posisi.
*   **Hilangkan `box-shadow` Melayang**: Bayangan lembut pada kartu (card) dan foto yang membuatnya seakan melayang dihentikan. Elevasi hanya menggunakan perubahan warna latar atau garis batas (*border*) yang solid.
*   **Hapus Indikator Kedip Palsu**: Titik berkedip (`animate-pulse`) pada lencana status dihapus. Status tidak butuh simulasi lampu rekaman sistem (*system recording indicator*).

---

## 2. Struktur Kartu & Radius Sudut (Raw & Editorial)
*   **Hapus `rounded-3xl` dan Bentuk Pil**: Semua kartu fitur, tombol, dan lencana yang melengkung ekstrem seperti kapsul akan dibuat sudut tegas (`rounded-none` atau `rounded-sm`). Estetika indie/brutalist mengandalkan tepi yang tegas.
*   **Kartu Domain (Keahlian)**: Alih-alih 4 kartu seragam dengan ikon dalam lingkaran (template bento AI), grid akan dibuat *border-only* atau sekadar dibatasi garis tipis `border-t`.

---

## 3. Tipografi & Copywriting (Suara Manusia)
*   **Rombak `.eyebrow`**: Label kecil di atas judul utama tidak lagi menggunakan `UPPERCASE` dengan jarak huruf ekstrem (`tracking-[0.18em]`). Diganti dengan kapitalisasi normal (*Sentence case*) dan *tracking* wajar, atau dihapus sepenuhnya jika berlebihan.
*   **Hapus Panah Dekoratif (`→`)**: Panah pada tombol *Call to Action* hanya dipakai jika tombol tersebut benar-benar memindahkan pengguna ke halaman eksternal/baru.
*   **Hapus Karakter Em Dash (`—`)**: Dipastikan tidak ada em dash tersisa di teks visual maupun atribut HTML.

---

## 4. Eksekusi Per File

### A. `styles.css`
*   Ubah `.reveal` agar hanya menganimasi `opacity` 0 ke 1 tanpa pergeseran `translateY`.
*   Hapus efek *scale* dan *box-shadow* melayang pada `.card-hover-effect`. Ganti dengan *hover border* solid `#F2F2F0`.
*   Ubah kelas `.eyebrow` agar tidak lagi memaksa `uppercase` dan spasi huruf lebar.

### B. `bio.html`
*   Ubah kartu hero foto: hapus `rounded-3xl` dan `shadow-float`, gunakan `rounded-sm` dan border solid.
*   Ubah badge "5th Semester": buat tegas (`rounded-sm`), hapus efek kaca `backdrop-blur`.
*   Ubah tombol CTA: hapus ikon panah `→` yang tidak perlu, gunakan sudut tegas.

### C. `expertise.html`
*   Rombak 4 kartu domain keahlian: ganti `rounded-3xl` menjadi `rounded-sm`. Hapus latar belakang bundar pada ikon.
*   Rapikan daftar poin keahlian dengan pembatas garis tipis.

### D. `achievements.html`
*   Rombak item timeline: ganti `rounded-2xl` menjadi `rounded-sm` dan border solid.
*   Sederhanakan banner "Internship" di bagian bawah menjadi teks editorial langsung tanpa kotak pembungkus tebal.

### E. `gallery.html`
*   Ubah grid foto: hapus animasi perbesaran (*hover scale*) berlebihan.
*   Foto ditampilkan tegas dengan border `border-[#2E2E30]`.

### F. `contact.html`
*   Ubah form kontak dan kartu alamat: ganti sudut membulat dengan `rounded-sm`.
*   Label form menggunakan font `Inter` dengan kapitalisasi normal (bukan *uppercase*).

---

*Status: Siap dieksekusi.*
