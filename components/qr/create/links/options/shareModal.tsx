"use client";
import { Button } from "components/ui";
import {
  ArrowDownToLine,
  Globe,
  Loader2,
  SquareArrowOutUpRight,
} from "lucide-react";
import { useBoardState } from "../../boardStateContext";
import Image from "next/image";
import { downloadImage, copyClick, cn } from "lib/utils";
import { useEffect, useMemo, useState } from "react";
import { url } from "lib/constants";
import { toDataURL } from "qrcode";

const ShareModal = () => {
  const { qrContent } = useBoardState();
  const [qrcode, setQrCode] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const generateQrCode = async () => {
      const code = await toDataURL(
        `${url}scan/${qrContent.ownerDetails.username}`,
        {
          errorCorrectionLevel: "L",
          type: "image/png",
          width: 210,
        }
      );
      setQrCode(code);
    };
    generateQrCode();
  }, [qrContent]);

  if (!qrContent) {
    return (
      <Loader2
        size={100}
        color="#9199A5"
        className="flex animate-spin self-center my-auto"
      />
    );
  }
  const handleCopyClick = async () => {
    try {
      const copy = await copyClick(
        `${url}scan/${qrContent.ownerDetails.username}`
      );
      if (copy) {
        setIsCopied(true);
      }

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className="animate-fade flex flex-col items-center py-10 size-full">
      <div className="flex flex-col items-center text-center">
        <h1 className="text-16 font-light text-black-100 text-opacity-60">
          Here is your unique Qr Me QR code that will direct people to your page
          when scanned.
        </h1>
        {!qrcode ? (
          <Loader2
            size={100}
            color="#9199A5"
            className="flex animate-spin self-center my-auto"
          />
        ) : (
          <Image
            width={100}
            height={100}
            className="flex w-max h-max"
            src={qrcode}
            alt="Unique Qr Code"
          />
        )}
      </div>
      <div>
        {/** Download Buttons */}
        <Button
          variant={"ghost"}
          className="w-full p-10 justify-between gap-2"
          onClick={() => downloadImage(qrcode, "my-qr-me-code", "png")}
        >
          <div className="flex flex-col items-start">
            <h1 className="text-16 font-bold"> Download PNG</h1>
            <p className="text-12 font-light text-black-100 text-opacity-60">
              High quality image
            </p>
          </div>
          <div className="flex items-center gap-2">
            <h6 className="text-12 font-light text-black-100 text-opacity-60">
              .PNG
            </h6>
            <ArrowDownToLine />
          </div>
        </Button>
        <Button
          variant={"ghost"}
          className="w-full p-10 flex justify-between gap-2"
          onClick={() => downloadImage(qrcode!, "my-qr-me-code", "svg")}
        >
          <div className="flex flex-col items-start">
            <h1 className="text-16 font-bold"> Download SVG</h1>
            <p className="text-12 font-light text-black-100 text-opacity-60">
              Scalable vector graphic
            </p>
          </div>
          <div className="flex items-center gap-2">
            <h6 className="text-12 font-light text-black-100 text-opacity-60">
              .SVG
            </h6>
            <ArrowDownToLine />
          </div>
        </Button>
      </div>

      <Button
        variant={"ghost"}
        className="flex justify-between my-auto w-full py-2 h-16"
      >
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center w-10 h-10 bg-primary-100 rounded-md ">
            <Globe color="white" />
          </div>
          <p className="text-16">Open my Qr Me page</p>
        </div>

        <SquareArrowOutUpRight className="opacity-50" />
      </Button>
      <Button
        variant={"outline"}
        className="flex mt-auto w-full py-10 justify-evenly rounded-md hover:bg-scrim-100 font-light text-16"
        onClick={handleCopyClick}
      >
        <Image src="/logo_1.png" width={50} height={50} alt="Qr Me Logo" />
        <h1 className="mx-auto">{`qrmee/${qrContent.ownerDetails.username}`}</h1>
        <h1
          className={cn("animate-fade text-black-100", {
            "text-green-500": isCopied,
          })}
        >
          {isCopied ? "Copied!" : "Copy"}
        </h1>
      </Button>
    </section>
  );
};

export default ShareModal;
