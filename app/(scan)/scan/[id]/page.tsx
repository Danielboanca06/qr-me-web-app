import { auth } from "auth";
import CliamCode from "components/qr/cliamCode";
import ScanContent from "components/qr/scanContent";
import { getQrCode } from "lib/actions/qr-code";
interface PageProps {
  params: { id: string };
}

const Page = async ({ params }: PageProps) => {
  const qrCode = await getQrCode(params.id);
  const session = await auth();
  const html = qrCode?.body.html;
  console.log(html);
  return (
    <section className="flex-center size-full ">
      {/* <CliamCode
        session={session?.user}
        codeId={params.id}
        qrCode={qrCode?.body || undefined}
      /> */}
      <ScanContent html={JSON.parse(html)} />
    </section>
  );
};

export default Page;
