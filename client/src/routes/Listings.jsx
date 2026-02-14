import { useState } from "react";
import { Link } from "react-router-dom";

const mockListings = [
  {
    id: 1,
    type: "hotel",
    name: "Ocean View Villa",
    location: "Galle, Southern Province",
    price: 15000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500",
    capacity: 4,
  },
  {
    id: 2,
    type: "hotel",
    name: "Ella Mountain Resort",
    location: "Ella, Uva Province",
    price: 12000,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=500",
    capacity: 6,
  },
  {
    id: 3,
    type: "vehicle",
    name: "Toyota Corolla - Automatic",
    location: "Colombo",
    price: 5000,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500",
    category: "Car",
  },
  {
    id: 4,
    type: "vehicle",
    name: "Honda Bike - 150cc",
    location: "Kandy",
    price: 2000,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?w=500",
    category: "Bike",
  },
  {
    id: 5,
    type: "hotel",
    name: "Beachfront Paradise",
    location: "Mirissa, Southern Province",
    price: 18000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500",
    capacity: 2,
  },
  {
    id: 6,
    type: "vehicle",
    name: "Three Wheeler - Bajaj",
    location: "Galle",
    price: 3000,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500",
    category: "Three Wheeler",
  },
];

export default function Listings() {
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredListings = mockListings.filter((listing) => {
    const matchesFilter = filter === "all" || listing.type === filter;
    const matchesSearch = listing.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         listing.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-4xl text-sand-900">Browse Listings</h1>
        <p className="mt-2 text-sand-700">Find your perfect stay or rental</p>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter("all")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              filter === "all"
                ? "bg-sand-900 text-sand-50"
                : "border border-sand-300 bg-white hover:border-sand-400"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter("hotel")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              filter === "hotel"
                ? "bg-sand-900 text-sand-50"
                : "border border-sand-300 bg-white hover:border-sand-400"
            }`}
          >
            Hotels & Villas
          </button>
          <button
            onClick={() => setFilter("vehicle")}
            className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
              filter === "vehicle"
                ? "bg-sand-900 text-sand-50"
                : "border border-sand-300 bg-white hover:border-sand-400"
            }`}
          >
            Vehicles
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by name or location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="rounded-full border border-sand-300 bg-white px-5 py-2 text-sm outline-none focus:border-sand-500"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredListings.map((listing) => (
          <Link
            key={listing.id}
            to={`/listing/${listing.id}`}
            className="group overflow-hidden rounded-2xl border border-sand-200 bg-white shadow-lift transition hover:shadow-soft"
          >
            <div className="relative h-48 overflow-hidden bg-sand-100">
              <img
                src={listing.image}
                alt={listing.name}
                className="h-full w-full object-cover transition group-hover:scale-105"
              />
              <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold backdrop-blur">
                {listing.type === "hotel" ? "Stay" : listing.category}
              </span>
            </div>
            <div className="p-5">
              <div className="mb-2 flex items-start justify-between gap-2">
                <h3 className="font-semibold text-sand-900">{listing.name}</h3>
                <div className="flex items-center gap-1 text-xs font-semibold text-sand-700">
                  <span>⭐</span>
                  <span>{listing.rating}</span>
                </div>
              </div>
              <p className="text-sm text-sand-600">{listing.location}</p>
              {listing.capacity && (
                <p className="mt-1 text-xs text-sand-500">Up to {listing.capacity} guests</p>
              )}
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-xl font-bold text-sand-900">Rs {listing.price.toLocaleString()}</span>
                <span className="text-sm text-sand-600">/ {listing.type === "hotel" ? "night" : "day"}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="py-12 text-center">
          <p className="text-sand-600">No listings found. Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
