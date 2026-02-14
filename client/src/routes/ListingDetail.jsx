import { useState } from "react";
import { useParams, Link } from "react-router-dom";

// Mock data - same as Listings page
const mockListings = [
  {
    id: 1,
    type: "hotel",
    name: "Ocean View Villa",
    location: "Galle, Southern Province",
    price: 15000,
    rating: 4.8,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800",
    capacity: 4,
    description: "Stunning villa with breathtaking ocean views. Perfect for families and groups looking to relax by the beach.",
    amenities: ["WiFi", "Pool", "Kitchen", "Parking", "Air Conditioning"],
    nearbyPlaces: ["Galle Fort - 5km", "Unawatuna Beach - 3km", "Japanese Peace Pagoda - 8km"],
  },
  {
    id: 2,
    type: "hotel",
    name: "Ella Mountain Resort",
    location: "Ella, Uva Province",
    price: 12000,
    rating: 4.6,
    reviews: 38,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
    capacity: 6,
    description: "Cozy mountain resort surrounded by tea plantations and stunning views of Ella Rock.",
    amenities: ["WiFi", "Restaurant", "Hot Water", "Garden", "Mountain View"],
    nearbyPlaces: ["Nine Arch Bridge - 2km", "Little Adam's Peak - 4km", "Ravana Falls - 6km"],
  },
  {
    id: 3,
    type: "vehicle",
    name: "Toyota Corolla - Automatic",
    location: "Colombo",
    price: 5000,
    rating: 4.7,
    reviews: 28,
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800",
    category: "Car",
    description: "Well-maintained automatic car, perfect for city drives and highway trips.",
    features: ["Automatic", "AC", "GPS", "Bluetooth", "Full Insurance"],
  },
  {
    id: 4,
    type: "vehicle",
    name: "Honda Bike - 150cc",
    location: "Kandy",
    price: 2000,
    rating: 4.5,
    reviews: 19,
    image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800",
    category: "Bike",
    description: "Ideal for exploring scenic routes around Kandy and nearby hills.",
    features: ["150cc", "Fuel Efficient", "Helmets Included", "Free Delivery"],
  },
  {
    id: 5,
    type: "hotel",
    name: "Beachfront Paradise",
    location: "Mirissa, Southern Province",
    price: 18000,
    rating: 4.9,
    reviews: 67,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
    capacity: 2,
    description: "Romantic beachfront getaway with direct beach access and sunset views.",
    amenities: ["WiFi", "Beach Access", "Restaurant", "Bar", "Spa"],
    nearbyPlaces: ["Mirissa Beach - 0.5km", "Whale Watching - 2km", "Secret Beach - 1km"],
  },
  {
    id: 6,
    type: "vehicle",
    name: "Three Wheeler - Bajaj",
    location: "Galle",
    price: 3000,
    rating: 4.3,
    reviews: 15,
    image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800",
    category: "Three Wheeler",
    description: "Fun and economical way to explore Galle and nearby coastal areas.",
    features: ["Manual", "Fuel Efficient", "Easy Parking", "Local Experience"],
  },
];

export default function ListingDetail() {
  const { id } = useParams();
  const listing = mockListings.find((l) => l.id === parseInt(id));
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  if (!listing) {
    return (
      <div className="py-12 text-center">
        <p className="text-sand-600">Listing not found</p>
        <Link to="/listings" className="mt-4 inline-block text-sand-900 underline">
          Back to listings
        </Link>
      </div>
    );
  }

  const handleBooking = (e) => {
    e.preventDefault();
    alert(`Booking request submitted for ${listing.name}!\n\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nGuests: ${guests}`);
  };

  return (
    <div className="space-y-8">
      <Link to="/listings" className="inline-flex items-center gap-2 text-sm text-sand-700 hover:text-sand-900">
        <span>←</span> Back to listings
      </Link>

      <div className="overflow-hidden rounded-3xl bg-sand-100">
        <img src={listing.image} alt={listing.name} className="h-96 w-full object-cover" />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-start justify-between gap-4">
              <div>
                <h1 className="font-serif text-3xl text-sand-900">{listing.name}</h1>
                <p className="mt-1 text-sand-700">{listing.location}</p>
              </div>
              <div className="flex items-center gap-2 whitespace-nowrap rounded-full bg-sand-100 px-4 py-2 text-sm font-semibold">
                <span>⭐</span>
                <span>{listing.rating}</span>
                <span className="text-sand-600">({listing.reviews} reviews)</span>
              </div>
            </div>
            {listing.capacity && (
              <p className="text-sm text-sand-600">Sleeps up to {listing.capacity} guests</p>
            )}
          </div>

          <div className="rounded-2xl border border-sand-200 bg-white p-6">
            <h2 className="mb-3 font-semibold text-sand-900">About this listing</h2>
            <p className="text-sand-700">{listing.description}</p>
          </div>

          {listing.amenities && (
            <div className="rounded-2xl border border-sand-200 bg-white p-6">
              <h2 className="mb-4 font-semibold text-sand-900">Amenities</h2>
              <div className="grid grid-cols-2 gap-3">
                {listing.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-sand-700">
                    <span className="text-lg">✓</span>
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {listing.features && (
            <div className="rounded-2xl border border-sand-200 bg-white p-6">
              <h2 className="mb-4 font-semibold text-sand-900">Features</h2>
              <div className="grid grid-cols-2 gap-3">
                {listing.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-sand-700">
                    <span className="text-lg">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {listing.nearbyPlaces && (
            <div className="rounded-2xl border border-sand-200 bg-white p-6">
              <h2 className="mb-4 font-semibold text-sand-900">Nearby Places to Visit</h2>
              <ul className="space-y-2">
                {listing.nearbyPlaces.map((place, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-sand-700">
                    <span className="text-lg">📍</span>
                    <span>{place}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-sand-300 bg-white p-6 shadow-soft">
            <div className="mb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-sand-900">Rs {listing.price.toLocaleString()}</span>
                <span className="text-sand-600">/ {listing.type === "hotel" ? "night" : "day"}</span>
              </div>
            </div>

            <form onSubmit={handleBooking} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-semibold text-sand-900">
                  {listing.type === "hotel" ? "Check-in" : "Start Date"}
                </label>
                <input
                  type="date"
                  required
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full rounded-xl border border-sand-300 px-4 py-2 text-sm outline-none focus:border-sand-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-semibold text-sand-900">
                  {listing.type === "hotel" ? "Check-out" : "End Date"}
                </label>
                <input
                  type="date"
                  required
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full rounded-xl border border-sand-300 px-4 py-2 text-sm outline-none focus:border-sand-500"
                />
              </div>

              {listing.type === "hotel" && (
                <div>
                  <label className="mb-1 block text-sm font-semibold text-sand-900">Guests</label>
                  <input
                    type="number"
                    min="1"
                    max={listing.capacity || 10}
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full rounded-xl border border-sand-300 px-4 py-2 text-sm outline-none focus:border-sand-500"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full rounded-full bg-sand-900 py-3 font-semibold text-sand-50 shadow-lift transition hover:bg-sand-800"
              >
                Book Now
              </button>
            </form>

            <p className="mt-4 text-center text-xs text-sand-600">
              You won't be charged yet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
