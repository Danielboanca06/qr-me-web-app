"use client";
import Image from "next/image";
import { Button } from "components/ui";
import { cn } from "lib/utils";
import { useRouter } from "next/navigation";
interface CliamCodeProps {
  qrCodeImg: string;
  hasSession: boolean;
  codeId: string;
}

const CliamCode = ({ qrCodeImg, hasSession, codeId }: CliamCodeProps) => {
  const router = useRouter();
  const handleClaimClick = () => {
    if (hasSession) {
      //handle signed-in actions
    } else {
      //user must log in or sign up
      const redirectUrl = `/scan-qr/${codeId}`;

      localStorage.setItem("redirect", redirectUrl);

      router.push("/sign-up/email-form");
    }
  };
  return (
    <div className="flex flex-col items-center min-w-[200px] gap-20">
      <h1 className="sub-header-text font-bold">Claim This QR Me Code</h1>
      <Image
        src={qrCodeImg}
        width={200}
        height={200}
        alt="Qr Me Logo 2"
        // className="opacity-60"
      />

      <p className="text-center">
        Own this QR code <br /> to start customizing it
      </p>

      <Button
        onClick={handleClaimClick}
        size={"wide"}
        className={cn("sub-header-text font-semibold text-white-100 ")}
      >
        Claim
      </Button>
    </div>
  );
};

export default CliamCode;
