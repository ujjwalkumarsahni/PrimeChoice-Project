import React, { useState } from "react";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up"); // "Sign Up" | "Log In" | "Forgot"
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [errors, setErrors] = useState({});

  const isSignup = currentState === "Sign Up";
  const isLogin = currentState === "Log In";
  const isForgot = currentState === "Forgot";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const e = {};
    if (isSignup && !form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Enter a valid email.";
    if (!isForgot) {
      if (!form.password) e.password = "Password is required.";
      else if (form.password.length < 6) e.password = "Min 6 characters.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (isForgot) {
      console.log("Send reset link to:", form.email);
      alert("Password reset link sent to your email!");
      setCurrentState("Log In");
      return;
    }

    // Replace with your auth logic
    console.log(`${currentState} with:`, form);
    alert(`${currentState} successful!`);
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
          {isSignup
            ? "Create an account"
            : isLogin
            ? "Welcome back"
            : "Reset your password"}
        </h1>
        <p className="text-center text-gray-600 mb-6">
          {isSignup
            ? "Sign up to get started"
            : isLogin
            ? "Log in to continue"
            : "Enter your email to reset password"}
        </p>

        <form onSubmit={handleSubmit} noValidate className="space-y-4">
          {isSignup && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                className={`mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? "border-red-400" : "border-gray-300"
                }`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-500">{errors.name}</p>
              )}
            </div>
          )}

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              className={`mt-1 w-full rounded-xl border px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.email ? "border-red-400" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password (hidden in forgot mode) */}
          {!isForgot && (
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div
                className={`mt-1 flex items-center rounded-xl border px-3 focus-within:ring-2 focus-within:ring-blue-500 ${
                  errors.password ? "border-red-400" : "border-gray-300"
                }`}
              >
                <input
                  id="password"
                  name="password"
                  type={showPwd ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full py-2 outline-none bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="text-sm text-blue-600 hover:underline ml-2"
                  aria-label={showPwd ? "Hide password" : "Show password"}
                >
                  {showPwd ? "Hide" : "Show"}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-500">{errors.password}</p>
              )}
            </div>
          )}

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            {isSignup
              ? "Sign Up"
              : isLogin
              ? "Log In"
              : "Send Reset Link"}
          </button>
        </form>

        {/* Links */}
        <div className="mt-6 text-center text-sm space-y-2">
          {isLogin && (
            <button
              className="text-blue-600 font-medium hover:underline"
              onClick={() => setCurrentState("Forgot")}
            >
              Forgot your password?
            </button>
          )}

          {isSignup ? (
            <p>
              Already have an account?{" "}
              <button
                className="text-blue-600 font-medium hover:underline"
                onClick={() => setCurrentState("Log In")}
              >
                Log In
              </button>
            </p>
          ) : isLogin ? (
            <p>
              Don’t have an account?{" "}
              <button
                className="text-blue-600 font-medium hover:underline"
                onClick={() => setCurrentState("Sign Up")}
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Remember your password?{" "}
              <button
                className="text-blue-600 font-medium hover:underline"
                onClick={() => setCurrentState("Log In")}
              >
                Log In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
