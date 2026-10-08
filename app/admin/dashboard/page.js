export default function AdminDashboardPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Dashboard Admin</h1>
      <p>Halaman dashboard admin - TODO: Implementasi dashboard dengan statistik</p>
      <p>TODO: Tambahkan proteksi route (redirect ke login jika belum login)</p>
      
      <nav style={{ marginTop: '2rem' }}>
        <ul>
          <li><a href="/admin/program">Kelola Program</a></li>
          <li><a href="/admin/achievement">Kelola Achievement</a></li>
          <li><a href="/admin/pendaftar">Kelola Pendaftar</a></li>
        </ul>
      </nav>
    </div>
  );
}
