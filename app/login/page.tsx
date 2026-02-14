"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      if (email && password) {
        // For demo purposes, accept any credentials
        router.push("/dashboard");
      } else {
        setError("Please enter both email and password");
        setIsLoading(false);
      }
    }, 1000);
  }, [email, password, router]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(prev => !prev);
  }, []);

  return (
    <div className="w-full h-screen flex flex-col md:flex-row overflow-hidden bg-white">
      {/* Left Side: Hero Image */}
      <div className="hidden md:flex md:w-1/2 lg:w-7/12 relative bg-teal-50">
        {/* Background Image */}
        <Image
          src="https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200&q=80"
          alt="Healthcare professional with patient"
          fill
          className="object-cover"
          priority
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
        
        {/* Content */}
        <div className="relative z-10 mt-auto p-12 text-white max-w-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-teal-500/20 backdrop-blur-sm border border-teal-400/30 text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
              Trusted by 500+ Clinics
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
            Empowering clinicians with real-time maternal insights.
          </h2>
          <p className="text-lg text-slate-200 font-light">
            Join the secure network dedicated to improving outcomes for mothers everywhere.
          </p>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full md:w-1/2 lg:w-5/12 h-full flex flex-col justify-center items-center p-8 lg:p-16 overflow-y-auto bg-white relative">
        {/* Decoration: Top Right Abstract Shape */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/5 rounded-bl-full pointer-events-none"></div>
        
        <div className="w-full max-w-md space-y-8 relative z-10">
          {/* Logo & Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-teal-500/10 mb-4">
              <span className="material-symbols-outlined text-teal-600 text-3xl">local_hospital</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Welcome Back</h1>
            <p className="text-slate-500">Secure access to the MamaGuard portal</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-2">
              <span className="material-symbols-outlined text-red-600 text-[20px]">error</span>
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6 mt-8">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400 text-xl">mail</span>
                </div>
                <input
                  autoComplete="email"
                  className="block w-full pl-10 pr-3 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white transition-all text-sm"
                  id="email"
                  name="email"
                  placeholder="name@clinic.com"
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700" htmlFor="password">
                  Password
                </label>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="material-symbols-outlined text-slate-400 text-xl group-focus-within:text-teal-500 transition-colors">
                    lock
                  </span>
                </div>
                <input
                  autoComplete="current-password"
                  className="block w-full pl-10 pr-10 py-3 border border-slate-200 rounded-lg bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent focus:bg-white transition-all text-sm"
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    className="text-slate-400 hover:text-slate-600 focus:outline-none"
                    type="button"
                    onClick={togglePasswordVisibility}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    <span className="material-symbols-outlined text-xl">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>
              <div className="flex justify-end">
                <a 
                  className="text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors" 
                  href="#"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Login Button */}
            <div>
              <button
                className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Secure Login</span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-slate-500">Secure System</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <p className="text-sm text-slate-600">
              Don't have an account?{" "}
              <a className="font-medium text-teal-600 hover:text-teal-700 transition-colors" href="#">
                Request Access
              </a>
            </p>
          </div>

          {/* Footer Trust Badges */}
          <div className="pt-8 flex items-center justify-center gap-4 text-slate-400 opacity-60">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-base">verified_user</span>
              <span className="text-xs font-semibold tracking-wide">HIPAA Compliant</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-400"></div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-base">lock</span>
              <span className="text-xs font-semibold tracking-wide">SSL Encrypted</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
