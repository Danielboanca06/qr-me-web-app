import { auth } from "auth";
import PreviewCodes from "components/qr/previewCodes";

interface CartProps {}

const Qr = async ({}: CartProps) => {
  const session = await auth();
  console.log(session?.user.qrCodes);
  return (
    <section className="flex-center size-full max-sm:px-6">
      <PreviewCodes session={session.user} />
    </section>
  );
};

export default Qr;
