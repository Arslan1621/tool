import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
    </div>
  );
}
