"use client";
import { Button } from "../ui";
import Image from "next/image";
import { Mail, MoveRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthMethod = () => {
  const router = useRouter();

  const handlePress = (type: "Email" | "Apple" | "Google") => {
    switch (type) {
      case "Email":
        router.push("/sign-up/email-form");
      case "Apple":

      case "Google":

      default:
        router.push("/sign-up/email-form");
        break;
    }
  };
  return (
    <section className="auth-method">
      <header>
        <Link href="/" className="cursor-pointer flex items-center gap-1 py-5">
          <Image src="/logo_3.svg" width={125} height={50} alt="Qr Me logo" />
        </Link>

        <div>
          <h1 className="header-text pb-2">Create your Qr Me account</h1>

          <h3 className="sub-header-text font-light">
            Manage all your Qr Codes under one account.
          </h3>
        </div>
      </header>
      <div className="form-item">
        <Button
          size="wide"
          variant={"default"}
          className="auth-method-items"
          title="Email Button"
          onClick={() => handlePress("Email")}
        >
          <Mail size={20} className="flex-none" />
          <p>Sign up with email</p>
        </Button>
        <Button
          size="wide"
          variant={"default"}
          className="auth-method-items"
          title="Apple Button"
          onClick={() => handlePress("Apple")}
        >
          <Image
            src="/apple-icon.svg"
            width={20}
            height={20}
            alt="Apple Logo"
          />
          <p>Sign up with Apple</p>
        </Button>
        <Button
          size="wide"
          variant={"default"}
          className="auth-method-items"
          title="Google Button"
          onClick={() => handlePress("Google")}
        >
          <Image
            src="/google-icon.svg"
            width={20}
            height={20}
            alt="Google Logo"
          />
          <p>Sign up with Google</p>
        </Button>
      </div>
      <div className="relative flex  mx-10 items-center">
        <div className="flex-grow border-t border-gray-400"></div>
        <span className="flex-shrink mx-4 text-gray-400 text-14">or</span>
        <div className="flex-grow border-t border-gray-400"></div>
      </div>
      <footer className="flex flex-col gap-5">
        <div className=" flex flex-row gap-2 items-center justify-center">
          Already have a Qr Me Account?
          <Link
            href="/sign-in"
            className="link-highlight flex-row flex gap-1 items-center"
          >
            Log in
            <MoveRight color="#4285F4" size={15} />
          </Link>
        </div>
        <div className="text-gray-400 text-14">
          By proceeding, you agree to the{" "}
          <Link href="/sign-in" className="link-highlight">
            {" "}
            Terms and Conditions
          </Link>{" "}
          and{" "}
          <Link href="/sign-in" className="link-highlight">
            {" "}
            Privacy Policy
          </Link>
        </div>
      </footer>
    </section>
  );
};

export default AuthMethod;
