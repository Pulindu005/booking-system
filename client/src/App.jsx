import { Link, Route, Routes } from "react-router-dom";
import Home from "./routes/Home.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sand-50 via-sand-100 to-sand-200 text-sand-900">
      <header className="sticky top-0 z-10 border-b border-sand-200 bg-sand-100/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-lg font-semibold tracking-wide">Booking System</div>
          <nav className="flex items-center gap-6 text-sm font-semibold">
            <Link className="hover:text-sand-700" to="/">
              Home
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </div>
  );
}
