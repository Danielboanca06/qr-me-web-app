import { CircleUserRound, Loader2 } from "lucide-react";
import { cn, hexToRgba } from "lib/utils";
import DisplayCard from "./create/links/displayCard";
import { QrCode } from "types";
import { Suspense } from "react";
import Image from "next/image";

interface ContentBoardProps {
  data: QrCode;
  type?: string;
}

const ContentBoard = ({ data, type }: ContentBoardProps) => {
  const backgroundVariants = {
    "Flat Color": { backgroundColor: data?.background?.color },
    Gradient: {
      backgroundImage: `linear-gradient(to bottom, ${
        data.background?.color
      }, ${hexToRgba(data.background?.color || "", 0.55)})`,
    },
    Image: { backgroundColor: data?.background?.color },
  };

  const backgroundType =
    (data?.background?.type as keyof typeof backgroundVariants) || "Gradient";

  return (
    <section
      className={cn(
        "flex flex-col py-10 px-2 items-center gap-5 w-full  rounded-3xl h-ful  ",
        { "rounded-none h-screen": type !== "rounded" }
      )}
      style={backgroundVariants[backgroundType]}
    >
      <header>
        <div className="flex flex-col justify-center items-center gap-1">
          {data?.ownerDetails.profilePic?.url ? (
            <Image
              key={data.ownerDetails.profilePic.url}
              src={data.ownerDetails.profilePic.url}
              width={100}
              height={100}
              alt={`${data?.ownerDetails.username} Profile Picture`}
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              className="rounded-full w-[100px] h-[100px] "
            />
          ) : (
            <CircleUserRound width={70} height={70} color="black" />
          )}

          <h1 className="heaser-text text-center !text-white-100">
            <strong>{data?.ownerDetails.title || "Anonymous"}</strong>
          </h1>
          <p className="text-white-100 text-12 text-center">
            {data?.ownerDetails.bio}
          </p>
        </div>
      </header>
      {data?.content?.map((content) => {
        if ("link" in content && content.active) {
          if (content.link || content.thumbnail || content.title) {
            return (
              <Suspense
                key={content.id}
                fallback={<Loader2 size={20} className="animate-spin" />}
              >
                <DisplayCard
                  key={content.id}
                  content={content}
                  buttonStyle={data?.button!}
                />
              </Suspense>
            );
          }
        }
        if ("text" in content && content.active) {
          return (
            <div key={`text-${content.id}`} id={`text-${content.id}`}>
              <h1 className="text-white-100">{content.text}</h1>
            </div>
          );
        }
      })}
    </section>
  );
};

export default ContentBoard;
