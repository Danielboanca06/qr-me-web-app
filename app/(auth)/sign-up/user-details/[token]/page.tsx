import AuthForm from "@components/auth/authForm";
import { validateEmailToken } from "@lib/actions/sign-up";
import { useEffect } from "react";

const userDetails = ({ params }: { params: { token: string } }) => {
  const getdata = async () => {
    const k = await validateEmailToken(params.token);
    console.log({ k });
    return k.email;
  };

  getdata();

  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-up" />
    </section>
  );
};

export default userDetails;
