# Service Guard React

Boilerplate profesional untuk library React yang berfungsi sebagai 'Service Lock' atau 'Payment Guard'. Didesain dengan estetika korporat minimalis, *glassmorphism*, dan *clean architecture*.

## Fitur Utama
- **Minimalist & Professional**: Desain UI yang bersih (tanpa *junk code* / animasi berat).
- **Glassmorphism Overlay**: Menggunakan `backdrop-blur` yang halus.
- **Isolasi Interaksi**: Memblokir `pointer-events` pada komponen yang dibungkus (*children*), mencegah klik secara paksa.
- **Light & Dark Theme**: Mendukung dua mode warna secara *native* lewat props.
- **NPM Ready (tsup)**: Di-bundle menggunakan `tsup` (CJS, ESM, dan dts) yang ringan dan tanpa konflik tipe.
- **CSS Modules**: Terisolasi secara lokal agar tidak bentrok dengan framework *styling* dari aplikasi induk pengguna.

## Instalasi

```bash
npm install service-guard-react
```

## Penggunaan

Gunakan *Provider Pattern* atau *Compound Component* dengan membungkus aplikasi atau rute tertentu menggunakan `ServiceGuard`.

```tsx
import React from 'react';
import { ServiceGuard } from 'service-guard-react';

const App = () => {
  // Logic untuk mengecek status pembayaran/layanan
  const isServiceLocked = true; 

  return (
    <ServiceGuard 
      isLocked={isServiceLocked} 
      supportEmail="admin@perusahaan.com"
      theme="light" // 'light' atau 'dark'
      // customMessage="Layanan Anda ditangguhkan sementara waktu."
    >
      <div className="my-app">
        <h1>Aplikasi Utama</h1>
        <p>Konten ini tidak akan bisa diklik jika isLocked bernilai true.</p>
      </div>
    </ServiceGuard>
  );
};

export default App;
```

## Pengembangan & Kontribusi

Proyek ini telah dikonfigurasi untuk kemudahan pengembangan:

1. **Instal Dependensi (Root)**:
   ```bash
   npm install
   ```
2. **Jalankan Unit Test (100% Coverage)**:
   ```bash
   npm run test:coverage
   ```
3. **Build untuk NPM**:
   ```bash
   npm run build
   ```
4. **Jalankan Playground (Vite)**:
   ```bash
   cd playground
   npm install
   npm run dev
   ```

## Props

| Prop | Type | Default | Deskripsi |
|------|------|---------|-----------|
| `isLocked` | `boolean` | **Required** | Menentukan apakah overlay harus dimunculkan. |
| `supportEmail` | `string` | **Required** | Email tujuan ketika tombol 'Hubungi Support' ditekan. |
| `theme` | `'light' \| 'dark'` | `'light'` | Mengubah palet warna overlay (putih kaca atau slate gelap). |
| `customMessage`| `string` | `undefined` | Pesan kustom untuk menimpa teks default. |
| `children` | `ReactNode` | **Required** | Komponen aplikasi yang akan diblokir interaksinya. |

## License
MIT
