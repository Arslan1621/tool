import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
      <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
    </div>
  );
}
