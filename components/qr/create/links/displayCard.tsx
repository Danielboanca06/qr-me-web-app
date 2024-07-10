import Link from "next/link";
import { cn } from "lib/utils";
import { PageLinks } from "types";

interface DisplayCardProps {
  content: PageLinks;
}

const DisplayCard = ({ content }: DisplayCardProps) => {
  if (!content.thumbnail.url && !content.title && !content.link) {
    return;
  }
  if (content.layout === "featured") {
    return (
      <Link
        className={cn(
          "flex relative items-center w-full max-w-[300px] max-h-[200px]  h-full bg-tertiary-100  rounded-3xl shadow-full"
        )}
        key={`link-${content.id}`}
        id={`link-${content.id}`}
        href={content.link}
      >
        {content.thumbnail.url && (
          <img
            src={content?.thumbnail.url}
            alt={"Uploaded Image" + content.thumbnail.fileName}
            className="w-full z-5 h-full  rounded-3xl border-2 border-black-100 text-[8px] text-center"
          />
        )}
        <div className=" absolute bottom-2 px-5 z-10 flex-1 flex justify-center">
          <h1 className="text-white-100 text-14">{content.title}</h1>
        </div>
      </Link>
    );
  }
  return (
    <Link
      className={cn(
        "flex items-center w-full py-1 bg-tertiary-100 border-2 border-black-100 rounded-3xl shadow-full hover:shadow-blue-500/50 hover:bg-gradient-to-r from-violet-500 to-fuchsia-500"
      )}
      key={`link-${content.id}`}
      id={`link-${content.id}`}
      href={content.link}
    >
      {content.thumbnail.url && (
        <img
          src={content?.thumbnail.url}
          alt={"Uploaded Image" + content.thumbnail.fileName}
          className="w-10 h-10 rounded-full ml-1 text-[5px] text-center"
        />
      )}
      <div className="flex-1 flex justify-center">
        <h1 className="text-white-100 text-14">{content.title}</h1>
      </div>
      {content.thumbnail && <div className="w-[40px]" />}
    </Link>
  );
};

export default DisplayCard;
