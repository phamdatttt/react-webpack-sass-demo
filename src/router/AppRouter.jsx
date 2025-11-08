import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from '../pages/Home';
import Favorites from '../pages/Favorites';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Header />
      <div className="container pb-5">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorite" element={<Favorites />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Header() {
  return (
    <div className="container py-3 d-flex justify-content-between align-items-center">
      <Link to="/" className="text-decoration-none"><h4 className="m-0">Recipe Finder</h4></Link>
      <nav className="d-flex gap-2">
        <Link to="/" className="btn btn-outline-secondary btn-sm">Trang chủ</Link>
        <Link to="/favorite" className="btn btn-primary btn-sm">Yêu thích</Link>
      </nav>
    </div>
  );
}
