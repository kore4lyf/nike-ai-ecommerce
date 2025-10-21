"use client";

import { GoogleIcon, AppleIcon } from "./icons";

export default function SocialProviders() {
  const handleGoogleSignIn = () => {
    console.log("Google sign-in clicked");
  };

  const handleAppleSignIn = () => {
    console.log("Apple sign-in clicked");
  };

  return (
    <div className="space-y-4">
      <button
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-light-300 rounded-xl hover:bg-light-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-300"
      >
        <GoogleIcon />
        <span className="text-base font-medium text-dark-900">Continue with Google</span>
      </button>
      
      <button
        onClick={handleAppleSignIn}
        className="w-full flex items-center justify-center gap-3 px-6 py-4 border border-light-300 rounded-xl hover:bg-light-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-light-300"
      >
        <AppleIcon />
        <span className="text-base font-medium text-dark-900">Continue with Apple</span>
      </button>
    </div>
  );
}
