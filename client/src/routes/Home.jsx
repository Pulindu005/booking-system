import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="flex flex-col gap-10 animate-fade-up">
      <div className="grid gap-6 rounded-3xl bg-gradient-to-br from-sand-100 to-sand-300 p-8 shadow-soft md:grid-cols-[1.3fr_0.7fr]">
        <div className="space-y-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-sand-700">
            Sri Lanka stays and rides
          </p>
          <h1 className="font-serif text-3xl leading-tight text-sand-900 md:text-5xl">
            Book a place, rent a ride, and explore nearby gems
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-sand-800 md:text-lg">
            Discover hotels, villas, and rentals in one place. Add listings, post
            vehicle ads, and guide travelers to beautiful places to visit.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/listings"
              className="rounded-full bg-sand-900 px-6 py-3 text-sm font-semibold text-sand-50 shadow-lift hover:bg-sand-800"
            >
              Start search
            </Link>
            <Link
              to="/host"
              className="rounded-full border border-sand-900 px-6 py-3 text-sm font-semibold text-sand-900 hover:bg-sand-900 hover:text-sand-50"
            >
              List your property
            </Link>
          </div>
        </div>
        <div className="grid content-start gap-4 rounded-2xl bg-white/70 p-6">
          <div className="rounded-2xl border border-sand-200 bg-sand-50 px-4 py-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-sand-700">
              Bookings made
            </span>
            <span className="mt-2 block text-2xl font-bold text-sand-900">1,240+</span>
          </div>
          <div className="rounded-2xl border border-sand-200 bg-sand-50 px-4 py-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-sand-700">
              Vehicle listings
            </span>
            <span className="mt-2 block text-2xl font-bold text-sand-900">380+</span>
          </div>
          <div className="rounded-2xl border border-sand-200 bg-sand-50 px-4 py-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-sand-700">
              Places to visit
            </span>
            <span className="mt-2 block text-2xl font-bold text-sand-900">200+</span>
          </div>
        </div>
      </div>

      <div className="section">
        <h2 className="font-serif text-2xl text-sand-900">Choose your journey</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-2xl border border-sand-200 bg-sand-50 p-5 shadow-lift">
            <h3 className="text-lg font-semibold">Hotels and villas</h3>
            <p className="mt-2 text-sm text-sand-700">
              Browse stays with clear pricing, photos, and instant booking.
            </p>
          </article>
          <article className="rounded-2xl border border-sand-200 bg-sand-50 p-5 shadow-lift">
            <h3 className="text-lg font-semibold">Vehicles for rent</h3>
            <p className="mt-2 text-sm text-sand-700">
              Find cars, bikes, and three wheelers with trusted hosts.
            </p>
          </article>
          <Link
            to="/trip-planner"
            className="group rounded-2xl border border-sand-200 bg-gradient-to-br from-sand-900 to-sand-800 p-5 shadow-lift transition hover:shadow-soft"
          >
            <h3 className="text-lg font-semibold text-sand-50">AI Trip Planner 🤖</h3>
            <p className="mt-2 text-sm text-sand-200">
              Get personalized itineraries and recommendations for your Sri Lanka adventure.
            </p>
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-sand-900 p-6 text-sand-50 md:flex-row md:items-center">
        <div>
          <h2 className="font-serif text-2xl">Hosts can post ads in minutes</h2>
          <p className="mt-2 text-sm text-sand-200">
            Share your property or vehicle, set availability, and accept bookings
            with confidence.
          </p>
        </div>
        <Link
          to="/host"
          className="rounded-full bg-sand-50 px-6 py-3 text-sm font-semibold text-sand-900 hover:bg-sand-100"
        >
          Create listing
        </Link>
      </div>
    </section>
  );
}
