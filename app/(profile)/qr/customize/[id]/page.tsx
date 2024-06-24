import { auth } from "auth";
import PreviewCodes from "components/qr/previewCodes";
import { verifyQrWithEmail } from "lib/actions/qr-code";
import { redirect } from "next/navigation";
import Board from "components/qr/board";

interface Custom {
  params: { id: string };
}

const Custom = async ({ params: { id } }: Custom) => {
  const session = await auth();
  const res = await verifyQrWithEmail(id, session?.user.email);
  console.log(res);
  if (res.status === 404 || res.status === 401) {
    redirect("/");
  } else if (res.status === 200) {
    return (
      <section className="flex-center size-full ">
        <Board qrData={res.data} />
      </section>
    );
  }
};

export default Custom;

//  <Loader2 size={20} className="animate-spin" />
