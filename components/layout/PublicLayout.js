// Layout komponen untuk halaman publik
// TODO: Tambahkan header, footer, dan navigation

export default function PublicLayout({ children }) {
  return (
    <div className="public-layout">
      <header style={{ background: '#333', color: 'white', padding: '1rem' }}>
        <h2>Bimbel Wanda</h2>
        {/* TODO: Tambahkan navigation menu */}
      </header>
      
      <main>
        {children}
      </main>
      
      <footer style={{ background: '#f5f5f5', padding: '1rem', marginTop: '2rem', textAlign: 'center' }}>
        <p>&copy; 2024 Bimbel Wanda. All rights reserved.</p>
      </footer>
    </div>
  );
}
