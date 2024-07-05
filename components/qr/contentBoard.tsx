import { CircleUserRound } from "lucide-react";
import Image from "next/image";
import { cn } from "lib/utils";
import DisplayCard from "./create/displayCard";

interface ContentBoardProps {
  data: QrCode;
  type?: string;
}

const ContentBoard = ({ data, type }: ContentBoardProps) => {
  return (
    <section
      className={cn(
        "flex flex-col py-10 px-2 items-center gap-5 w-full  rounded-3xl h-ful  bg-gradient-to-b from-fuchsia-500 to-secondary-100",
        { "rounded-none h-screen": type !== "rounded" }
      )}
    >
      <header>
        <div className="flex flex-col justify-center items-center gap-1">
          {data?.ownerProfilePic ? (
            <Image
              src={data.ownerProfilePic}
              width={75}
              height={75}
              alt={`${data?.owner} Profile Picture`}
            />
          ) : (
            <CircleUserRound width={70} height={70} color="black" />
          )}
          <h1 className="heaser-text text-center !text-white-100">
            <strong>@{data?.owner || "Anonymous"}</strong>
          </h1>
          <p className="text-white-100 text-12 text-center">
            {`Hi ${
              data?.owner ? data?.owner + " " + `here,` : ","
            }  I've recently joined Qr Me. Take a look at my links below!`}
          </p>
        </div>
      </header>
      {data?.content?.map((content) => {
        if ("link" in content && content.active) {
          if (content.link || content.thumbnail || content.title) {
            return <DisplayCard key={content.id} content={content} />;
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
