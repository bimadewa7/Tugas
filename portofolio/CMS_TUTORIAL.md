# Panduan Penggunaan CMS Portfolio Statis

Dokumen ini menjelaskan alur kerja untuk mengubah isi website portfolio menggunakan sistem CMS statis (tanpa perlu coding).

## 1. Persiapan
Pastikan folder proyek portfolio ada di komputer Anda dan siap diakses.
- Semua data konten halaman website tersimpan dalam satu file: `data/content.json`.
- Halaman pengelola konten ada pada file: `admin.html`.

## 2. Cara Mengedit Konten (Alur Kerja)

### Langkah 1: Buka Dashboard Admin
Buka file `admin.html` di browser Anda (Google Chrome / Firefox). 
*(Cukup double-click file `admin.html` di file explorer Anda atau jalankan melalui live server lokal).*

### Langkah 2: Lakukan Perubahan
Di halaman Admin, Anda akan melihat tab-tab yang mewakili bagian web (Bio, Keahlian, Prestasi, Galeri, Kontak).
1. Ubah teks, tautan, atau tambahkan item baru pada form yang tersedia.
2. Setiap kali Anda mengetik, perubahan otomatis disimpan sebagai **Draft** sementara di browser Anda (`localStorage`). Anda tidak perlu takut kehilangan data jika tidak sengaja menutup tab.

### Langkah 3: Pratinjau Perubahan (Preview)
Untuk melihat bagaimana tampilan web setelah diubah:
1. Klik tombol **Preview Web** (atau buka langsung `index.html` / `bio.html` di tab browser baru).
2. Browser akan memuat versi *Draft* yang baru Anda edit dari `localStorage`.

### Langkah 4: Simpan Permanen (Download JSON)
Karena web ini statis dan aman di-hosting (tanpa database server), cara menyimpan datanya adalah:
1. Kembali ke tab `admin.html`.
2. Klik tombol **Download Data (content.json)**.
3. Browser Anda akan mengunduh file bernama `content.json`.

### Langkah 5: Terapkan ke File Asli (Timpa File)
1. Buka folder *Downloads* (Unduhan) di komputer Anda, temukan file `content.json` yang baru saja diunduh.
2. Salin atau *Cut* file tersebut.
3. Buka folder proyek website Anda, masuk ke dalam folder `data/`.
4. *Paste* (tempel) file tersebut, dan pilih **Replace / Timpa** file `content.json` yang lama.

### Langkah 6: Publikasi (Push ke GitHub)
Jika website Anda sudah live di GitHub Pages atau Vercel:
1. Buka terminal atau aplikasi Git Anda.
2. Lakukan proses commit dan push seperti biasa:
   ```bash
   git add data/content.json
   git commit -m "Update konten web melalui CMS"
   git push origin main
   ```
3. Selesai! Web live Anda akan diperbarui dengan konten yang baru.

---

## 3. Catatan Tambahan

- **Gambar & Aset**: Untuk mengubah gambar (seperti avatar atau gambar galeri), Anda harus menyalin gambar baru secara manual ke dalam folder `images/` lalu mengetikkan path-nya (misal: `images/foto-baru.jpg`) di kolom *URL Gambar* pada `admin.html`.
- **Pengiriman Pesan ke Email**: Formulir kontak di `contact.html` telah terhubung langsung dengan FormSubmit ke alamat email yang terdaftar di `data/content.json` (`email.bimaaryadewa@gmail.com`). 
  - **Aktivasi Pertama Kali**: Saat pertama kali form ini dicoba/dikirim pesan baru, FormSubmit akan mengirimkan email konfirmasi berjudul *"Action Required: Activate FormSubmit"* ke email Anda. Cukup klik tombol **Activate Form** sekali saja.
  - Setelah diaktivasi, setiap pesan yang dikirim pengunjung web akan langsung masuk ke inbox Gmail Anda lengkap dengan Nama, Email Pengirim, dan Isi Pesan.
- **Reset Draft**: Jika Anda mengacaukan pengeditan di `admin.html` dan ingin mengembalikannya seperti versi website asli, klik tombol **Reset Draft** di halaman Admin. Ini akan menghapus data di browser Anda dan menarik ulang data dari file `data/content.json` yang ada.

