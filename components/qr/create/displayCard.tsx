import Link from "next/link";
import Image from "next/image";
import { cn } from "lib/utils";

interface DisplayCardProps {
  content: PageLinks;
}

const DisplayCard = ({ content }: DisplayCardProps) => {
  return (
    <Link
      className={cn(
        "flex items-center w-full py-1 bg-tertiary-100 border-2 border-black-100 rounded-3xl shadow-full hover:shadow-blue-500/50 hover:bg-gradient-to-r from-violet-500 to-fuchsia-500"
      )}
      key={`link-${content.id}`}
      id={`link-${content.id}`}
      href={content.link}
    >
      {content.thumbnail && (
        <Image
          src={JSON.parse(content.thumbnail)}
          alt="Link Thumbnail"
          width={40}
          height={40}
          className="w-10 h-10 rounded-full ml-1"
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
