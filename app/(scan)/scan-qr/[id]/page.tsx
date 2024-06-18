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
  return (
    <section className="flex-center size-full max-sm:px-6">
      <CliamCode
        qrCodeImg={qrCode?.body?.qrCode || ""}
        hasSession={!!session}
        codeId={params.id}
      />
    </section>
  );
};

export default Page;
