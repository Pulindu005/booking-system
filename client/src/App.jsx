import { Link, Route, Routes } from "react-router-dom";
import Home from "./routes/Home.jsx";

export default function App() {
  return (
    <div className="app">
      <header className="site-header">
        <div className="brand">Booking System</div>
        <nav className="nav">
          <Link to="/">Home</Link>
        </nav>
      </header>
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}
