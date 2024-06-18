"use client";

import Image from "next/image";
import { Button } from "components/ui";
import { sendEmail } from "lib/actions/sign-up";
import Link from "next/link";
import { Loader2, Mail } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { verifyEmailToken } from "lib/utils";

const CheckEmail = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimeOut, setResendTimeOut] = useState(30);
  const [disabled, setDisabled] = useState(true);
  const [email, setEmail] = useState("");

  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const emailAuth = localStorage.getItem("emailAuth");

    const searchParams = new URLSearchParams(window.location.search);
    const em = searchParams.get("email");
    if (em !== emailAuth) {
      return router.replace("/sign-up/email-form");
    }
    setEmail(decodeURIComponent(em as string));
    setDisabled(false);
  }, []);

  const startTimer = () => {
    clearInterval(intervalRef?.current); // Clear any existing intervals before setting a new one
    intervalRef.current = setInterval(() => {
      setResendTimeOut((prevTime) => {
        if (prevTime === 0) {
          clearInterval(intervalRef?.current); // Clear the interval when countdown reaches zero
          setIsLoading(false);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const handleResendClick = async () => {
    setIsLoading(true);

    const response = await sendEmail(email);

    if (response?.status === 200) {
      setResendTimeOut(30);
      startTimer();
    } else if (response?.status === 400) {
      return router.replace("/"); // user has already created there account
    } else {
      // handle error

      setIsLoading(false);
    }
  };

  return (
    <section className="auth-form">
      <header>
        <div>
          <Link
            href="/"
            className="cursor-pointer flex items-center gap-1 py-5"
          >
            <Image
              src="/logo_3.svg"
              width={125}
              height={125}
              alt="Qr Me logo"
            />
          </Link>
        </div>

        <div>
          <h1 className="header-text pb-2">Check your Email</h1>
          <h3>
            Click the link we send to your email to finish creating your account
          </h3>
        </div>
      </header>

      <div className="space-y-8  flex flex-col">
        <Mail
          size={60}
          className="m-auto"
          color="#5077F5"
          onClick={() =>
            (window.location.href = "https://mail.google.com/mail/u/0/#inbox")
          }
        />

        <Button
          type="submit"
          disabled={isLoading || disabled}
          className="form-btn"
          onClick={handleResendClick}
        >
          {isLoading ? (
            <>
              <Loader2 size={20} className="animate-spin" /> &nbsp;
              {`Resend Email ${resendTimeOut}`}
            </>
          ) : (
            "Didn't recieve an email ?"
          )}
        </Button>
      </div>
    </section>
  );
};

export default CheckEmail;
