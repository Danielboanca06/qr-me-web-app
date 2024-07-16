import { useBoardState } from "../boardStateContext";
import { useId, useState } from "react";
import { cn } from "lib/utils";
import { QrCode } from "types";
import Thumbnail from "../links/options/thumbnail";

interface ProfileCardProps {
  qrContent: QrCode;
}

const ProfileCard = ({}: ProfileCardProps) => {
  const { qrContent, updateOwner } = useBoardState();
  const [title, setTitle] = useState<{ title?: string; error?: string }>({
    title: qrContent?.ownerDetails?.title,
    error: "",
  });
  const [bio, setBio] = useState<{ bio?: string; error?: string }>({
    bio: qrContent?.ownerDetails?.bio,
    error: "",
  });

  const handleTextChange = (
    type: "title" | "bio",
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const text = e?.target?.value;

    switch (type) {
      case "title":
        if (text.length <= 30) {
          setTitle({ title: text });
        } else {
          setTitle({
            title: text,
            error: "Title cannot be longer than 30 characters",
          });
        }
        break;
      case "bio":
        if (text.length <= 250) {
          setBio({ bio: text });
        } else {
          setBio({
            bio: text,
            error: "Bio cannot be longer than 250 characters",
          });
        }
        break;
    }
  };
  const handleBlur = (type: "title" | "bio") => {
    switch (type) {
      case "title":
        updateOwner({ ...qrContent.ownerDetails, title: title.title });
        break;
      case "bio":
        updateOwner({ ...qrContent.ownerDetails, bio: bio.bio });
        break;
    }
  };

  return (
    <section className="create-card py-10 gap-5">
      <Thumbnail
        id={useId()}
        type="profilePic"
        thumbnailImg={{
          url: qrContent.ownerDetails.profilePic?.url,
          fileName: qrContent.ownerDetails.profilePic?.fileName || "",
        }}
        show
      />

      <div className=" w-[90%] rounded-xl ">
        <label
          title="Profie Title"
          className="text-black-100 text-12 font-semibold"
        >
          Profile Title
          <input
            onBlur={() => handleBlur("title")}
            onChange={(e) => handleTextChange("title", e)}
            className={cn(
              "bg-scrim-100 rounded-xl outline-none w-full text-16 h-10 px-5 border-2 font-normal  border-transparent hover:border-scrim-200 focus:border-black-100",
              { "!text-red-500": title.error }
            )}
            defaultValue={title.title}
            placeholder="Profile title"
          />
          {title.error && (
            <p className="text-red-500 font-light">{title.error}</p>
          )}
        </label>
        <label
          title="Profie Title"
          className="text-black-100 font-semibold text-12 relative"
        >
          Bio
          <textarea
            onBlur={() => handleBlur("bio")}
            onChange={(e) => handleTextChange("bio", e)}
            className={cn(
              "bg-scrim-100 rounded-xl outline-none w-full text-16 p-5 font-normal  border-2 border-transparent hover:border-scrim-200 focus:border-black-100 h-1/2",
              { "!text-red-500": bio.error }
            )}
            defaultValue={bio.bio}
            placeholder="Profile title"
          />
          <p
            className={cn("text-right", { "text-red-500": bio.error })}
          >{`${bio.bio?.length}/250`}</p>
          {bio.error && (
            <span className="text-red-500 font-light absolute bottom-0">
              {bio.error}
            </span>
          )}
        </label>
      </div>
    </section>
  );
};

export default ProfileCard;
