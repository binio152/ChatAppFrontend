import SignUpForm from "@/components/auth/signup-form";
export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col p-6">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-3 font-medium">
            <img
              src="/logo.svg"
              alt="Moji Logo"
              className="w-6 h-6 md:w-8 md:h-8"
            />
            Moji
          </a>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignUpForm />
          </div>
        </div>
      </div>

      <div className="relative hidden bg-muted lg:block">
        <img
          src="/placeholder.png"
          alt="Image"
          className="absolute inset-0 object-cover w-1/2 top-1/2 -translate-y-1/2 translate-x-1/2"
        />
      </div>
    </div>
  );
}
