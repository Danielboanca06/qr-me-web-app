"use client";
import Container from "./links/container";
import { BoardStateProvider, useBoardState } from "./boardStateContext";
import ContainerHead from "../headers/containerHead";
import PreviewHeader from "../headers/previewHeader";
import ContentBoard from "../contentBoard";
import { useEffect, useState } from "react";
import { getQrWithUserName } from "lib/actions/qr-code";
import { Loader2, Eye, X } from "lucide-react";
import { Button } from "components/ui";
import { cn } from "lib/utils";
import MobileTopBar from "../headers/mobileTopBar";
import { useSearchParams } from "next/navigation";
import Appearance from "./appearance/appearance";

interface QRProps {
  user: User;
}

const ContentSection = ({ qr, type }: { qr?: QrCode; type: string }) => {
  const { qrContent } = useBoardState();

  return (
    <ContentBoard
      data={{
        // pass default data or updated
        ...qr!,
        ownerDetails: qrContent.ownerDetails,
        content: qrContent?.content,
      }}
      type={type}
    />
  );
};

const Create = ({ user }: QRProps) => {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [qr, setQr] = useState<QrCode>();
  const [showMobilePreview, setshowMobilePreview] = useState(false);

  useEffect(() => {
    const getdata = async () => {
      try {
        const data = await getQrWithUserName(user._id);
        setQr(JSON.parse(data?.data!));
      } catch (error) {
        console.error("Error fetching QR data:", error);
      } finally {
        setLoading(false);
      }
    };
    getdata();
  }, [user]);

  const handleMobilePreviewClick = () => {
    setshowMobilePreview((prev) => !prev);
  };

  const getContent = () => {
    const tab = searchParams.get("tab");
    console.log({ user });

    if (tab === "/appearance") {
      return <Appearance />;
    } else {
      return (
        <>
          <ContainerHead />
          <Container />
        </>
      );
    }
  };

  if (loading) {
    return (
      <Loader2
        size={100}
        color="#9199A5"
        className="flex animate-spin self-center my-auto"
      />
    );
  }

  return (
    <BoardStateProvider pageQr={qr!}>
      <MobileTopBar user={user} />
      <section
        className={cn(
          "flex size-full flex-col animate-fade overflow-y-auto sm:px-2 xl:px-4 no-scrollbar pt-5 xl:pt-0 pb-[180px] xl:pb-0",
          { hidden: showMobilePreview }
        )}
      >
        {getContent()}
      </section>
      <section
        className={cn(
          "hidden xl:flex w-1/2  flex-col items-center  h-screen sm:px-2 xl:px-4 py-2 border-l-[1px] rounded-md",
          {
            "fixed flex  w-full h-full  z-50 p-0 shadow-none rounded-none":
              showMobilePreview,
          }
        )}
      >
        {!showMobilePreview && <PreviewHeader />}

        <div
          className={cn(
            "flex w-[90%] h-[90%] my-auto animate-fade  py-2 px-2 rounded-3xl shadow-2xl",
            {
              "w-full h-full p-0 my-0 shadow-none rounded-none":
                showMobilePreview,
            }
          )}
        >
          {loading ? (
            <Loader2
              size={100}
              color="#9199A5"
              className="flex animate-spin mx-auto my-auto"
            />
          ) : (
            <ContentSection qr={qr} type={showMobilePreview ? "" : "rounded"} />
          )}
        </div>
      </section>

      <Button
        onClick={handleMobilePreviewClick}
        variant={"outline"}
        className={cn(
          "animate-fade flex rounded-3xl z-50 shadow-2xl h-14 gap-2 bg-white-100 text-[16px] fixed bottom-5 xl:hidden transition-all  ease-linear",
          {
            "px-3": showMobilePreview,
            "px-10": !showMobilePreview,
          }
        )}
      >
        {showMobilePreview ? (
          <X />
        ) : (
          <>
            <Eye />
            Preview
          </>
        )}
      </Button>
    </BoardStateProvider>
  );
};

export default Create;
