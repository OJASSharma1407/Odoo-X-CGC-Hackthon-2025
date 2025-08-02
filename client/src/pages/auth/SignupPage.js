import React, { useState } from "react";

// Icons as SVG components
const ZapIcon = () => (
  <svg
    className="w-6 h-6"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 10V3L4 14h7v7l9-11h-7z"
    />
  </svg>
);

const MailIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const GoogleIcon = () => (
  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

// Input Component
const Input = ({ icon: Icon, className = "", ...props }) => (
  <div className="relative">
    {Icon && (
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    )}
    <input
      {...props}
      className={`w-full px-4 py-3 ${
        Icon ? "pl-10" : ""
      } border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm hover:bg-white/70 ${className}`}
    />
  </div>
);

// Button Component
const Button = ({
  children,
  variant = "primary",
  disabled = false,
  className = "",
  ...props
}) => {
  const baseClasses =
    "w-full py-3 px-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

  const variants = {
    primary:
      "bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl focus:ring-emerald-500",
    outline:
      "border-2 border-gray-200 bg-white/50 backdrop-blur-sm hover:bg-white/80 text-gray-700 hover:border-gray-300 focus:ring-gray-500",
  };

  return (
    <button
      {...props}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

// Card Component
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white/70 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 ${className}`}
  >
    {children}
  </div>
);

// Separator Component
const Separator = () => (
  <div className="relative my-6">
    <div className="absolute inset-0 flex items-center">
      <div className="w-full border-t border-gray-200"></div>
    </div>
    <div className="relative flex justify-center text-sm">
      <span className="px-4 bg-white/70 text-gray-500 font-medium">
        Or continue with
      </span>
    </div>
  </div>
);

// Loading Spinner
const LoadingSpinner = () => (
  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
);

// Signup Component
const SignupPage = ({ onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Account created successfully! Redirecting to dashboard...");
    }, 1500);
  };

  const handleGoogleSignup = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      alert("Google signup successful! Redirecting to dashboard...");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-blue-50 to-purple-100 flex items-center justify-center p-4 relative overflow-hidden">
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
        }
      `}</style>

      {/* Animated background elements */}
      <div className="absolute top-20 right-20 w-36 h-36 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 left-20 w-28 h-28 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-20 animate-pulse animation-delay-1000"></div>
      <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-gradient-to-br from-yellow-400 to-red-500 rounded-full opacity-20 animate-pulse animation-delay-2000"></div>

      <Card className="w-full max-w-md relative z-10 animate-fadeIn">
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl shadow-lg">
                <ZapIcon className="text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-2">
              QuickDesk
            </h1>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Create Account
            </h2>
            <p className="text-gray-600">Join thousands of productive users</p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <Input
                icon={UserIcon}
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <Input
                icon={MailIcon}
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                icon={LockIcon}
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>
              <Input
                icon={LockIcon}
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button onClick={handleSignup} disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <LoadingSpinner />
                  <span className="ml-2">Creating account...</span>
                </div>
              ) : (
                "Create Account"
              )}
            </Button>
          </div>

          <Separator />

          <Button
            variant="outline"
            onClick={handleGoogleSignup}
            disabled={isLoading}
          >
            <GoogleIcon />
            Continue with Google
          </Button>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin}
              className="text-emerald-600 hover:text-emerald-700 font-semibold hover:underline transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SignupPage;
