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
- **Secondary (Orange)**: `#F97316` - Energetic, friendly, youth appeal
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
│   │   ├── pendaftar/     # Data pendaftar (TODO)
│   │   └── achievement/   # Kelola achievement (TODO)
│   ├── globals.css        # Global styles & CSS variables
│   ├── layout.js          # Root layout
│   └── page.js            # Landing page (TODO)
├── components/
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
└── docs/wireframes/       # Design wireframes (reference)
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

### 🚧 Pending Implementation

Halaman-halaman berikut sudah ada placeholder, menunggu wireframe:

- Dashboard admin (stats cards sudah ada)
- Data Pendaftar (CRUD)
- Kelola Achievement (CRUD)
- Landing page public
- Halaman Program & Jadwal (public view)
- Halaman Achievement (public view)
- Halaman Profil & Kontak
- Halaman Daftar Online

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

1. **Backend Integration**: Connect API endpoints untuk CRUD operations
2. **Authentication**: Implement proper auth dengan JWT/session
3. **Public Pages**: Implement landing page dan user-facing pages
4. **Responsive**: Test dan improve mobile responsiveness
5. **Additional Features**: Upload image, rich text editor, etc.

## Wireframe Reference

Wireframe design tersimpan di `docs/wireframes/`:
- `login_admin_page.png`
- `lihat_program_belajar.png`
- `tambah_program_blajar.png`
- `edit_program_belajar.png`
- `hapus_program_blajar.png`

Implementasi sudah mengikuti design wireframe dengan color theme yang konsisten.
