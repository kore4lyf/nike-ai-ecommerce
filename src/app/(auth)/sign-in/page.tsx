import Link from "next/link";
import AuthForm from "@/components/AuthForm";
import SocialProviders from "@/components/SocialProviders";

export default function SignInPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <p className="text-sm text-dark-700">
          Don't have an account?{" "}
          <Link href="/sign-up" className="font-medium text-dark-900 underline hover:no-underline">
            Sign Up
          </Link>
        </p>
      </div>

      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-dark-900">Welcome Back!</h1>
        <p className="text-dark-700 text-base">Sign in to continue your fitness journey</p>
      </div>

      {/* Social Providers */}
      <SocialProviders />

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-light-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-light-100 text-dark-500">Or sign in with</span>
        </div>
      </div>

      {/* Auth Form */}
      <AuthForm type="sign-in" />

      {/* Forgot Password */}
      <div className="text-center pt-4">
        <Link href="#" className="text-sm text-dark-700 hover:text-dark-900 underline hover:no-underline">
          Forgot your password?
        </Link>
      </div>
    </div>
  );
}
