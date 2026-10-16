# Frontend - Bimble Wanda

Frontend website untuk Bimble Wanda menggunakan Next.js 16 dengan App Router.

## Tech Stack

- **Next.js 16.4.0** - React framework dengan App Router
- **React 19.3.0** - UI library
- **Tailwind CSS** - Utility-first CSS framework
- **Custom UI Components** - Komponen reusable untuk konsistensi design

## Color Theme

Tema warna yang digunakan untuk mencerminkan profesionalisme dan keramahan bimbel:

- **Primary (Blue)**: `#2563EB` - Trust, professional, education-focused
- **Secondary (Amber)**: `#F59E0B` - Energetic, friendly, youth appeal
- **Success**: `#10B981` - Positive feedback
- **Danger**: `#EF4444` - Destructive actions
- **Neutral**: Gray scale untuk text dan borders

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin panel routes
│   │   ├── login/         # Admin login page
│   │   ├── dashboard/     # Admin dashboard
│   │   ├── program/       # Kelola program belajar (CRUD)
│   │   ├── pendaftar/     # Pencarian, status & export pendaftar
│   │   └── achievement/   # Kelola achievement (CRUD)
│   ├── program/           # Katalog program publik
│   ├── achievement/       # Cerita prestasi publik
│   ├── profil/            # Profil dan FAQ
│   ├── daftar/            # Form minat pendaftaran
│   ├── globals.css        # Global styles & CSS variables
│   ├── layout.js          # Root layout
│   └── page.js            # Landing page
├── components/
│   ├── admin/             # Form pengelolaan achievement
│   ├── ui/                # Reusable UI components
│   │   ├── Button.js
│   │   ├── Input.js
│   │   ├── Textarea.js
│   │   ├── Select.js
│   │   ├── Modal.js
│   │   ├── Table.js
│   │   └── index.js
│   └── layout/            # Layout components
│       ├── AdminLayout.js
│       ├── AdminSidebar.js
│       └── PublicLayout.js
└── lib/                   # Data demo dan browser storage
```

## Implemented Features

### ✅ Admin Panel - Program Belajar (Complete)

Berdasarkan wireframe yang sudah diimplementasikan:

1. **Login Admin** (`/admin/login`)
   - Username & password input
   - Show/hide password toggle
   - Remember device checkbox
   - Forgot password link

2. **List Program Belajar** (`/admin/program`)
   - Table view dengan kolom: Nama, Deskripsi, Jenjang, Biaya, Jadwal
   - Action buttons: Edit & Delete
   - Pagination controls
   - Button tambah program

3. **Tambah Program** (`/admin/program/tambah`)
   - Form input: Nama, Deskripsi, Jenjang, Biaya, Jadwal
   - Validation
   - Breadcrumb navigation

4. **Edit Program** (`/admin/program/edit/[id]`)
   - Form pre-filled dengan data existing
   - Validation
   - Loading state saat fetch data

5. **Delete Confirmation Modal**
   - Modal konfirmasi sebelum hapus
   - Warning message
   - Cancel & confirm actions

### ✅ Website publik

- Landing page dengan katalog ringkas, pencapaian, dan jadwal/investasi.
- Katalog program dengan pencarian, filter jenjang, dan detail program.
- Cerita prestasi dengan pencarian, filter kategori, dan detail.
- Profil, pendekatan belajar, dan FAQ interaktif.
- Form minat pendaftaran dengan validasi dan konfirmasi berhasil.

### ✅ Admin interaktif

- Dashboard dengan ringkasan data, aktivitas pendaftaran, dan pintasan.
- Pencarian program serta alur tambah, edit, dan hapus.
- Pencarian pendaftar, filter status, pembaruan tindak lanjut, dan export CSV.
- Kelola achievement: tambah, edit, hapus, filter, pencarian, detail, dan pratinjau foto.
- Sidebar admin yang menyesuaikan ukuran layar.

### ⚠️ Penyimpanan demo dan integrasi backend

Data demo disimpan di `localStorage` browser agar alur UI dapat dicoba dan bertahan setelah halaman dimuat ulang. Data tersebut hanya tersedia di browser/perangkat yang sama dan belum tersimpan di server. Controller API backend untuk program, achievement, dan pendaftar masih berupa stub; autentikasi admin juga belum terintegrasi dengan backend.

## Running the Project

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Development server akan berjalan di `http://localhost:3000`

## Admin Access

- Login page: `/admin/login`
- Dashboard: `/admin/dashboard`
- Program management: `/admin/program`

**Note**: Authentication logic belum terimplementasi (TODO: integrate dengan backend)

## UI Components

### Button
```jsx
import { Button } from '@/components/ui/Button';

<Button variant="primary" size="md">Click Me</Button>
```
Variants: `primary`, `secondary`, `outline`, `danger`, `ghost`
Sizes: `sm`, `md`, `lg`

### Input
```jsx
import { Input } from '@/components/ui/Input';

<Input 
  label="Username" 
  type="text" 
  placeholder="Enter username"
  icon={<UserIcon />}
  required
/>
```

### Select
```jsx
import { Select } from '@/components/ui/Select';

<Select 
  label="Jenjang"
  options={[
    { value: 'SD', label: 'SD' },
    { value: 'SMP', label: 'SMP' }
  ]}
/>
```

### Table
```jsx
import { Table } from '@/components/ui/Table';

<Table 
  columns={columns}
  data={data}
  actions={(row) => <EditButton />}
/>
```

### Modal
```jsx
import { Modal } from '@/components/ui/Modal';

<Modal isOpen={isOpen} onClose={handleClose} title="Title">
  Content here
</Modal>
```

## Next Steps

1. Implementasi database dan controller API untuk program, achievement, dan pendaftar.
2. Hubungkan layanan frontend ke API dan tambahkan autentikasi/token admin.
3. Ganti data contoh dengan konten, jadwal, kontak, serta foto resmi Bimble Wanda.
4. Tambahkan pengujian otomatis setelah backend tersedia.

## Wireframe Reference

Wireframe desain tersimpan di `../docs/wireframes/`.

Implementasi sudah mengikuti design wireframe dengan color theme yang konsisten.
