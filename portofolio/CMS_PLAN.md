# CMS & Admin Dashboard Implementation Plan (Static & Live Hosting Ready)

Rencana integrasi Content Management System (CMS) modular untuk web portfolio. Arsitektur ini 100% statis (tanpa backend/server), sehingga aman dihosting di GitHub Pages, Netlify, atau Vercel.

---

## 1. Arsitektur Data (`data/content.json`)

Satu file JSON terpusat untuk menyimpan semua variabel dan konten web. Ini adalah sumber data utama saat web live.

### Skema Struktur Data Utama
- `profile`: Nama, jabatan, ringkasan, lokasi, tautan avatar & CV.
- `bio`: Paragraf profil, statistik, dan riwayat pendidikan.
- `expertise`: Daftar keterampilan akuntansi, tools software, dan keahlian teknis.
- `achievements`: Riwayat lomba, penghargaan, dan sertifikasi.
- `gallery`: Proyek portfolio, gambar sampul, tag, dan link demo.
- `contact`: Email, nomor telepon, dan tautan jejaring sosial.

---

## 2. Arsitektur Sistem (Serverless / 100% Static)

Alih-alih menggunakan server backend (`server.py`) yang tidak jalan di hosting statis, sistem ini beroperasi sepenuhnya di sisi peramban klien (Browser-side).

### Alur Kerja:
1. **Load Data (Publik)**: Pengunjung buka web, script `cms-loader.js` mengambil data statis dari `data/content.json` dan merender isi web.
2. **Edit Data (Admin)**: Pemilik buka `admin.html`. Edit data melalui formulir antarmuka. Sistem otomatis menyimpan draft secara lokal menggunakan `localStorage` agar tidak hilang jika di-refresh.
3. **Simpan Permanen**: Pemilik mengklik **Unduh Data Baru (Download JSON)**.
4. **Deploy**: File `content.json` yang baru diunduh ditimpa ke folder `/data/` pada proyek lokal, kemudian di-push (diunggah) ke GitHub/Hosting.

---

## 3. Modul CMS Client Loader (`cms-loader.js`)

Script otomatis yang dipasang di setiap halaman:

1. **Fetch Data**: Mengambil `data/content.json` lewat `fetch()`. Jika ada preview draft di `localStorage` (hanya berlaku di PC admin), draft akan ditampilkan.
2. **Text Binding**: Elemen HTML dengan atribut `data-cms="path.to.field"` otomatis diisi teks dari JSON.
3. **List Rendering**: Elemen kontainer list digenerate secara dinamis (mengulang struktur template HTML dasar, tanpa mengubah styling Tailwind yang sudah ada).

---

## 4. Antarmuka Dashboard (`admin.html`)

Halaman pengelola visual lokal.
- **Tab Editor Berbasis Form**: Antarmuka CRUD (Create, Read, Update, Delete) yang rapi untuk array data seperti pengalaman kerja atau galeri.
- **Draft Otomatis (Local Storage)**: Menyimpan sesi perubahan walau tab tertutup.
- **Preview & Export**:
  - `Tombol Unduh (Download content.json)`: Menghasilkan file JSON final dari editor.
  - `Tombol Reset`: Mengembalikan state editor ke data JSON asal (membuang draft local).
  - `Tombol Preview`: Membuka tab halaman utama untuk melihat draf sebelum disimpan permanen.

---

## 5. Tahapan Implementasi

1. **Fase 1: Struktur & Ekstraksi Data**
   - Buat folder `data/` dan pindahkan seluruh teks hardcoded ke file `data/content.json`.

2. **Fase 2: Pembuatan `cms-loader.js`**
   - Buat script renderer.
   - Modifikasi halaman web (`bio.html`, dll.) menambahkan atribut `data-cms`.

3. **Fase 3: Halaman CMS (`admin.html`)**
   - Buat file `admin.html` beserta antarmuka navigasi.
   - Hubungkan form HTML dengan logika manipulasi objek JSON dan fitur `Download`.

4. **Fase 4: Finalisasi & Panduan**
   - Uji coba pengisian, pengunduhan JSON, dan sinkronisasi halaman publik.
   - Sediakan tutorial penggunaan alur kerja CMS ini.
