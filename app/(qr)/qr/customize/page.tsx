import { auth } from "auth";
import { redirect } from "next/navigation";
import Create from "components/qr/create/create";

interface Custom {
  params: { id: string };
}

const Custom = async ({ params: { id } }: Custom) => {
  const user = await auth();
  if (!user) {
    redirect("/");
  } else {
    return (
      <section className="flex-center size-full overscroll-y-none">
        <Create user={user.user} />
      </section>
    );
  }
};

export default Custom;
