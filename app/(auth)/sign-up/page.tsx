"use client";
import AuthForm from "@components/auth/authForm";
import Head from "next/head";

const SignUp = async () => {
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-up" />
    </section>
  );
};

export default SignUp;
