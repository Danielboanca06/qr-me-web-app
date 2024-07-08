"use client";
import Image from "next/image";
import { Button } from "components/ui";
import { cn } from "lib/utils";
import { useRouter } from "next/navigation";
import { MoveDown, CircleUserRound, Loader2 } from "lucide-react";
import { useState } from "react";
import { updateQrCode } from "lib/actions/qr-code";
// import { addQrCodeToUser } from "lib/actions/user";

interface CliamCodeProps {
  session?: User;
  codeId: string;
  qrCode?: QrCode;
}

const CliamCode = ({ qrCode, session, codeId }: CliamCodeProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleClaimClick = async () => {
    // if (!!session) {
    //   console.log(session && qrCode);
    //   setLoading(true);

    //   if (qrCode) {
    //     qrCode.owner = session.email;
    //     qrCode.title = `${session.username}'s Qr Code`;

    //     // Handle claim action
    //     const res = await addQrCodeToUser(qrCode, session._id);
    //     if (res.status === 200) {
    //       const qrRes = await updateQrCode(qrCode);
    //       if (qrRes.status === 200) {
    //         return router.push("/qr");
    //       }
    //     }
    //   }
    //   alert("Sorry You Have An Error, Reload and Try again later");
    //   setLoading(false);
    // } else {
    //   //user must log in or sign up
    //   const redirectUrl = `/scan-qr/${codeId}`;

    //   localStorage.setItem("redirect", redirectUrl);

    //   router.push("/sign-up/email-form");
    // }
    return;
  };
  return (
    <div className="flex flex-col items-center min-w-[200px] gap-10 xl:gap-28">
      <h1 className="sub-header-text font-bold">Claim This QR Me Code</h1>

      {/* <div className="flex flex-col xl:flex-row items-center gap-8">
        <Image
          src={qrCode?.qrCode || "/logo_2.svg"}
          width={200}
          height={200}
          alt="Qr Me Logo 2"
          // className="opacity-60"
        />
        {!!session && (
          <>
            <MoveDown
              size={40}
              color="#9A2CF6"
              className="xl:rotate-[-90deg]"
            />
            <div className="flex flex-col items-center">
              <CircleUserRound size={45} />
              <p className="font-semibold body-text">{session.firstName}</p>
            </div>
          </>
        )}
      </div> */}

      <p className="text-center ">
        Own this QR code <br /> to start customizing it
      </p>

      <Button
        disabled={loading}
        onClick={handleClaimClick}
        size={"wide"}
        className={cn("sub-header-text font-semibold text-white-100 ")}
      >
        {loading ? (
          <>
            <Loader2 size={20} className="animate-spin" /> &nbsp;
            {"Loading..."}
          </>
        ) : (
          "Cliam"
        )}
      </Button>
    </div>
  );
};

export default CliamCode;
