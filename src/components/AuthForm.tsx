"use client";

import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "./icons";

interface AuthFormProps {
  type: "sign-in" | "sign-up";
}

export default function AuthForm({ type }: AuthFormProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {type === "sign-up" && (
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-dark-900 mb-2"
          >
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required={type === "sign-up"}
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-4 border border-light-300 rounded-xl focus:ring-2 focus:ring-dark-900 focus:border-dark-900 outline-none transition-colors text-base"
            placeholder="Enter your full name"
          />
        </div>
      )}

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-dark-900 mb-2"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-4 border border-light-300 rounded-xl focus:ring-2 focus:ring-dark-900 focus:border-dark-900 outline-none transition-colors text-base"
          placeholder="johndoe@gmail.com"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-dark-900 mb-2"
        >
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-4 pr-12 border border-light-300 rounded-xl focus:ring-2 focus:ring-dark-900 focus:border-dark-900 outline-none transition-colors text-base"
            placeholder="minimum 8 characters"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-dark-500 hover:text-dark-900 transition-colors"
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-dark-900 text-light-100 py-4 px-6 rounded-full hover:bg-dark-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-dark-900 font-medium text-base mt-6"
      >
        {type === "sign-in" ? "Sign In" : "Sign Up"}
      </button>
    </form>
  );
}
