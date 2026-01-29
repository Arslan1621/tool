import { SignIn, SignUp } from "@clerk/clerk-react";

export function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <SignIn 
        routing="path" 
        path="/sign-in" 
        signUpUrl="/sign-up" 
        forceRedirectUrl="/dashboard"
      />
    </div>
  );
}

export function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
      <SignUp 
        routing="path" 
        path="/sign-up" 
        signInUrl="/sign-in" 
        forceRedirectUrl="/dashboard"
      />
    </div>
  );
}
