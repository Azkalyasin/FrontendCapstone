// Layout komponen untuk halaman admin
// TODO: Tambahkan sidebar, header admin, dan logout button

export default function AdminLayout({ children }) {
  return (
    <div className="admin-layout" style={{ display: 'flex' }}>
      <aside style={{ width: '250px', background: '#2c3e50', color: 'white', minHeight: '100vh', padding: '1rem' }}>
        <h3>Admin Panel</h3>
        {/* TODO: Tambahkan sidebar navigation */}
        <nav>
          <ul>
            <li><a href="/admin/dashboard" style={{ color: 'white' }}>Dashboard</a></li>
            <li><a href="/admin/program" style={{ color: 'white' }}>Program</a></li>
            <li><a href="/admin/achievement" style={{ color: 'white' }}>Achievement</a></li>
            <li><a href="/admin/pendaftar" style={{ color: 'white' }}>Pendaftar</a></li>
          </ul>
        </nav>
      </aside>
      
      <div style={{ flex: 1 }}>
        <header style={{ background: '#ecf0f1', padding: '1rem' }}>
          {/* TODO: Tambahkan user info dan logout button */}
          <div>Admin User</div>
        </header>
        
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}
