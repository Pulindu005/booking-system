import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${isLogin ? "Login" : "Sign up"} submitted!\n\nEmail: ${email}`);
  };

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-3xl border border-sand-200 bg-white p-8 shadow-soft">
        <h1 className="mb-6 text-center font-serif text-3xl text-sand-900">
          {isLogin ? "Welcome back" : "Create account"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="mb-1 block text-sm font-semibold text-sand-900">
                Full Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full rounded-xl border border-sand-300 px-4 py-3 text-sm outline-none focus:border-sand-500"
              />
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-semibold text-sand-900">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-sand-300 px-4 py-3 text-sm outline-none focus:border-sand-500"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-sand-900">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-sand-300 px-4 py-3 text-sm outline-none focus:border-sand-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-sand-900 py-3 font-semibold text-sand-50 shadow-lift transition hover:bg-sand-800"
          >
            {isLogin ? "Sign in" : "Create account"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-sand-700 underline hover:text-sand-900"
          >
            {isLogin ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>

      <div className="mt-6 text-center">
        <Link to="/" className="text-sm text-sand-700 hover:text-sand-900">
          ← Back to home
        </Link>
      </div>
    </div>
  );
}
