import Link from "next/link";
import AuthForm from "@/components/AuthForm";
import SocialProviders from "@/components/SocialProviders";

export default function SignUpPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center ">
        <p className="text-sm text-dark-700">
          Already have an account?{" "}
          <Link href="/sign-in" className="font-medium text-dark-900 underline hover:no-underline">
            Sign In
          </Link>
        </p>
      </div>

      {/* Title */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-dark-900">Join Nike Today!</h1>
        <p className="text-dark-700 text-base">Create your account to start your fitness journey</p>
      </div>

      {/* Social Providers */}
      <SocialProviders />

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-light-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-light-100 text-dark-500">Or sign up with</span>
        </div>
      </div>

      {/* Auth Form */}
      <AuthForm type="sign-up" />

      {/* Terms */}
      <div className="text-center pt-4">
        <p className="text-xs text-dark-500 leading-relaxed">
          By signing up, you agree to our{" "}
          <Link href="#" className="underline hover:text-dark-700">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="#" className="underline hover:text-dark-700">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
