# UI/UX Overhaul Plan: Less AI, More Human (Editorial & Raw)

Rombakan desain untuk `admin.html` dan situs utama agar menghilangkan pola desain "AI-generated" (slop) dan kembali ke estetika editorial/indie-band yang berkarakter.

## 1. Perombakan Favicon & Branding
*   **Aset**: Menggunakan favicon SVG "Dv" (Dark/Light contrast).
*   **Admin Sidebar**: Favicon diperbesar dan ditempatkan di pojok kiri atas sidebar `admin.html` sebagai logo utama. Menggantikan teks generik "Admin Dashboard".
*   **Alasan**: Memperkuat identitas personal "Dv" (Dewa) daripada elemen UI bawaan template.

## 2. Struktur Layout Dashboard (`admin.html`)
*   **Split-Pane Asimetris**:
    *   **Kiri (250px)**: Sidebar hitam pekat (`#0B0B0C`). Berisi logo favicon dan tab navigasi vertikal.
    *   **Kanan (Fluid)**: Area konten abu-abu sangat gelap (`#141416`). Padding lebar untuk ruang napas.
*   **Alasan**: Membuang layout template standar (header atas + konten tengah). Split-pane terasa lebih seperti alat kerja profesional (tooling).

## 3. Anti-Slop Visual & Komponen UI (Sesuai `antislop-ui`)
*   **Hapus Glow & Shadow Berlebih**: Elemen melayang (soft shadows) dan efek glow pada input dihapus total. UI harus terasa rata (flat), solid, dan mengakar.
*   **Radius Sudut Konsisten**: Menghindari bentuk *pill* (kapsul) pada tombol dan input. Gunakan sudut tegas (`rounded-none` atau `rounded-sm`).
*   **Input Form**: Border tipis (`#2E2E30`), latar belakang gelap `#141416`. Saat fokus, border berubah putih tajam atau warna aksen hangat (`#A0938A`), tanpa ring shadow yang pudar.
*   **Tombol Utama**: Kontras tinggi murni (Latar `#F2F2F0`, Teks `#0B0B0C`). Hapus panah dekoratif (`→`) yang tidak memiliki fungsi struktural.

## 4. Anti-Slop Copywriting & Tipografi (Sesuai `antislop-copywriting`)
*   **Label Fungsional**: Hapus penggunaan *ALL CAPS* dengan spasi huruf berlebih (letter-spacing) pada label form. Gunakan *Sentence case* biasa dengan font `Inter`.
*   **Hapus Buzzword AI**: Hilangkan kata-kata seperti "Seamless", "Elevate", "Next-gen", "Manage". Ganti dengan copy fungsional langsung: "Simpan Draft", "Unduh JSON", "Pratinjau".
*   **Penekanan Makna**: Gunakan huruf tebal (bold) hanya untuk kata kunci, bukan sebagai hiasan acak.

## 5. Audit Situs Publik (Bio, Prestasi, Galeri, dll)
*   **Transisi**: Kurangi animasi template (bounce, float, scale berulang). Pertahankan hanya fade atau slide minimal untuk estetika sinematik.
*   **Layout Asimetris**: Hindari bentuk grid seragam (contoh: 3 kartu identik). Gunakan grid bervariasi jika kontennya berbeda bobot.
*   **Fungsi Kosong**: Pastikan tidak ada tombol "Learn More" atau tautan sosial media mati. Semua elemen interaktif harus memiliki tujuan nyata atau dihapus.
*   **Noise & Vignette**: Pertahankan filter CSS noise (film grain) dan vignette yang membuat situs terasa *moody* dan bertekstur fisik (real material).

---
*Status: Dokumen ini adalah acuan build. Modifikasi kode langsung akan merujuk pada prinsip di atas.*