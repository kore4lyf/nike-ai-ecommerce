import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "@/app/globals.css";
import Image from "next/image";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nike | Auth",
  description: "Sign in or sign up to access your account",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.className} antialiased min-h-screen bg-light-100`}>
        <div className="min-h-screen lg:grid lg:grid-cols-2">
          {/* Left side - Hero section */}
          <div className="hidden lg:flex lg:flex-col lg:justify-center lg:px-16 relative bg-black">
            <div className="absolute top-8 left-8">
              <div className="w-16 h-16 bg-orange rounded-2xl flex items-center justify-center">
                <Image 
                  src="/logo.svg" 
                  alt="Nike" 
                  width={32} 
                  height={32} 
                  className="filter brightness-0 invert"
                />
              </div>
            </div>
            <div className="max-w-lg">
              <h1 className="text-3xl font-bold text-white mb-8 leading-tight">Just Do It</h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Join millions of athletes and fitness enthusiasts who trust Nike for their performance needs
              </p>
            </div>
            <div className="absolute bottom-8 left-8">
              <p className="texst-sm text-white/90 leading-relaxed">
                © 2024 Nike, Inc. All rights reserved.
              </p>
            </div>
          </div>

          {/* Right side - Auth form */}
          <div className="flex flex-col justify-center px-8 py-12 lg:px-16">
            <div className="lg:hidden mb-8 flex justify-center">
              <div className="w-16 h-16 bg-orange rounded-2xl flex items-center justify-center">
                <Image 
                  src="/logo.svg" 
                  alt="Nike" 
                  width={32} 
                  height={32} 
                  className="filter brightness-0 invert"
                />
              </div>
            </div>
            <div className="mx-auto w-full max-w-md">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
