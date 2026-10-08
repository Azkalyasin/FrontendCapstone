export default function HomePage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Selamat Datang di Bimbel Wanda</h1>
      <p>Halaman landing page - TODO: Implementasi konten landing page</p>
      
      <nav style={{ marginTop: '2rem' }}>
        <ul>
          <li><a href="/program">Program & Jadwal</a></li>
          <li><a href="/achievement">Achievement</a></li>
          <li><a href="/profil">Profil & Kontak</a></li>
          <li><a href="/daftar">Daftar Online</a></li>
          <li><a href="/admin/login">Login Admin</a></li>
        </ul>
      </nav>
    </div>
  );
}
