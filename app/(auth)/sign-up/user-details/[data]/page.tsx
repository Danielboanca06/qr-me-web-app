import AuthForm from "components/auth/authForm";
import { validateEmailToken } from "lib/actions/sign-up";
import { redirect } from "next/navigation";

const UserDetails = async ({ params }: { params: { data: string } }) => {
  const response = await validateEmailToken(params.data);
  if (response.status === 400) {
    return redirect("/sign-up/email-form");
  } else if (response.status === 500) {
    //handle request error
  }
  return (
    <section className="flex-center size-full max-sm:px-6">
      <AuthForm type="sign-up" email={response?.email} />
    </section>
  );
};

export default UserDetails;
