import { auth } from "auth";
import ContentBoard from "components/qr/contentBoard";
import { getScanQrCode } from "lib/actions/qr-code";
interface PageProps {
  params: { id: string };
}

const Page = async ({ params }: PageProps) => {
  let qrCode = await getScanQrCode(params.id);
  return <ContentBoard data={JSON.parse(qrCode?.body!)} />;
};

export default Page;
