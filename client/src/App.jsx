import { Link, Route, Routes } from "react-router-dom";
import Home from "./routes/Home.jsx";
import Listings from "./routes/Listings.jsx";
import ListingDetail from "./routes/ListingDetail.jsx";
import Login from "./routes/Login.jsx";
import Host from "./routes/Host.jsx";
import ChatBot from "./routes/ChatBot.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sand-50 via-sand-100 to-sand-200 text-sand-900">
      <header className="sticky top-0 z-10 border-b border-sand-200 bg-sand-100/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link to="/" className="text-lg font-semibold tracking-wide hover:text-sand-700">
            Booking System
          </Link>
          <nav className="flex items-center gap-6 text-sm font-semibold">
            <Link className="hover:text-sand-700" to="/">
              Home
            </Link>
            <Link className="hover:text-sand-700" to="/listings">
              Browse
            </Link>trip-planner">
              Trip Planner 🤖
            </Link>
            <Link className="hover:text-sand-700" to="/
            <Link className="hover:text-sand-700" to="/login">
              Login
            </Link>
            <Link
              className="rounded-full bg-sand-900 px-4 py-2 text-sand-50 transition hover:bg-sand-800"
              to="/host"
            >
              List Property
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Routes>
          <Route path="/trip-planner" element={<ChatBot />} />
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/host" element={<Host />} />
        </Routes>
      </main>
    </div>
  );
}
