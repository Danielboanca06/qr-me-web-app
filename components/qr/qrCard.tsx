"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const QrCard = ({
  qrcode: { _id, title, previewImage, updatedAt },
}: {
  qrcode: QrCodePreview;
}) => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(`qr/customize/${_id}`)}
      className="border-2 bg-scrim-100 rounded-md  flex flex-col items-center relative p-10 shrink-animation md:hover:border-primary-100 "
    >
      <Image
        src={!!previewImage ? previewImage : "/logo_1_black.svg"}
        width={150}
        height={150}
        alt={!!previewImage ? "Qr Preview Image" : "Qr Me Logo 1"}
        className="w-full h-full"
      />

      <div className="flex flex-col pt-5 gap-1 ">
        <h1 className="md:text-16 text-14 font-semibold">{title}</h1>
        <Link
          href={`/scan/${_id}`}
          className="md:text-14 text-12 text-secondary-100 hover:text-primary-100"
        >
          {"Preview"}
        </Link>
      </div>
    </button>
  );
};

export default QrCard;
