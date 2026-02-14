import { useState } from "react";
import { Link } from "react-router-dom";

export default function Host() {
  const [listingType, setListingType] = useState("hotel");
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    price: "",
    description: "",
    capacity: "",
    category: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Listing submitted!\n\nType: ${listingType}\nName: ${formData.name}\nPrice: Rs ${formData.price}`);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="font-serif text-4xl text-sand-900">List your property or vehicle</h1>
        <p className="mt-2 text-sand-700">
          Share your space with travelers and start earning
        </p>
      </div>

      <div className="rounded-3xl border border-sand-200 bg-white p-8 shadow-soft">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="mb-2 block text-sm font-semibold text-sand-900">
              What are you listing?
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setListingType("hotel")}
                className={`flex-1 rounded-xl border py-3 text-sm font-semibold transition ${
                  listingType === "hotel"
                    ? "border-sand-900 bg-sand-900 text-sand-50"
                    : "border-sand-300 hover:border-sand-400"
                }`}
              >
                Hotel / Villa
              </button>
              <button
                type="button"
                onClick={() => setListingType("vehicle")}
                className={`flex-1 rounded-xl border py-3 text-sm font-semibold transition ${
                  listingType === "vehicle"
                    ? "border-sand-900 bg-sand-900 text-sand-50"
                    : "border-sand-300 hover:border-sand-400"
                }`}
              >
                Vehicle
              </button>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-sand-900">
              {listingType === "hotel" ? "Property Name" : "Vehicle Name"}
            </label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              placeholder={listingType === "hotel" ? "e.g., Ocean View Villa" : "e.g., Toyota Corolla"}
              className="w-full rounded-xl border border-sand-300 px-4 py-3 text-sm outline-none focus:border-sand-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-sand-900">
              Location
            </label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Galle, Southern Province"
              className="w-full rounded-xl border border-sand-300 px-4 py-3 text-sm outline-none focus:border-sand-500"
            />
          </div>

          {listingType === "vehicle" && (
            <div>
              <label className="mb-1 block text-sm font-semibold text-sand-900">
                Vehicle Type
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-sand-300 px-4 py-3 text-sm outline-none focus:border-sand-500"
              >
                <option value="">Select type</option>
                <option value="Car">Car</option>
                <option value="Bike">Bike</option>
                <option value="Three Wheeler">Three Wheeler</option>
              </select>
            </div>
          )}

          {listingType === "hotel" && (
            <div>
              <label className="mb-1 block text-sm font-semibold text-sand-900">
                Maximum Guests
              </label>
              <input
                type="number"
                name="capacity"
                required
                min="1"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="e.g., 4"
                className="w-full rounded-xl border border-sand-300 px-4 py-3 text-sm outline-none focus:border-sand-500"
              />
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-semibold text-sand-900">
              Description
            </label>
            <textarea
              name="description"
              required
              rows="4"
              value={formData.description}
              onChange={handleChange}
              placeholder="Tell guests about your listing..."
              className="w-full rounded-xl border border-sand-300 px-4 py-3 text-sm outline-none focus:border-sand-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-sand-900">
              Price per {listingType === "hotel" ? "night" : "day"} (Rs)
            </label>
            <input
              type="number"
              name="price"
              required
              min="1"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g., 15000"
              className="w-full rounded-xl border border-sand-300 px-4 py-3 text-sm outline-none focus:border-sand-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-sand-900 py-3 font-semibold text-sand-50 shadow-lift transition hover:bg-sand-800"
          >
            Submit Listing
          </button>
        </form>
      </div>

      <div className="mt-6 text-center">
        <Link to="/" className="text-sm text-sand-700 hover:text-sand-900">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
