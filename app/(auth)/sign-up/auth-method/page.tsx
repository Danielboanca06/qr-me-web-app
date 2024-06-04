import AuthMethod from "@components/auth/authMethod";
import { notFound, useParams } from "next/navigation";

const AuthMethodSelector = () => {
  return (
    <section className="flex-center size-full max-sm:px-6 bg-white-200">
      <AuthMethod />
    </section>
  );
};

export default AuthMethodSelector;
