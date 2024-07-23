"use client";
import { Button } from "components/ui";
import {
  ChevronLeft,
  Loader2,
  Image as Img,
  CircleUserRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn, resizeImage } from "lib/utils";
import { Sheet, SheetContent, SheetTitle } from "components/ui/sheet";
import { useBoardState } from "../../boardStateContext";

import { deleteImage, uploadImage } from "lib/actions/image-action";
import { supportEmail } from "lib/constants";
import Image from "next/image";

interface ThumbnailProps {
  id: string;
  onBlur?: () => void;
  thumbnailImg?: { fileName: string; url: string };
  type?: "thumbnail" | "profilePic";
  show?: boolean;
}

const Thumbnail = ({
  id,
  onBlur,
  show,
  thumbnailImg,
  type = "thumbnail",
}: ThumbnailProps) => {
  const { updateLink, updateOwner } = useBoardState();
  const [isHidden, setIsHidden] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalOption, setModalOption] = useState("upload-option");
  const [loading, setLoading] = useState(false);
  const [uploadData, setUploadData] = useState<{
    fileName?: string;
    url?: string;
  }>(thumbnailImg || { fileName: "", url: "" });
  const [blob, setBlob] = useState<any>();

  useEffect(() => {
    if (thumbnailImg) {
      setUploadData(thumbnailImg);
    }
  }, [thumbnailImg]);

  const handleUploadSelect = () => {
    setModalOption("native-upload");
  };
  const handleGoBack = () => {
    setModalOption("upload-option");
  };

  const handleChange = async (ev: React.ChangeEvent) => {
    setLoading(true);
    try {
      //@ts-ignore
      const file = ev.target.files[0];

      let reader = new FileReader();
      reader.onload = async function (event: ProgressEvent<FileReader>) {
        const target = event.currentTarget as FileReader;
        const uri = target.result as string;
        resizeImage(uri)
          .then((blob) => {
            // Use the resized image Blob
            console.log("Resized image Blob:", blob);
            setUploadData({ fileName: file?.name, url: blob });
            setBlob(blob);
          })
          .catch((error) => {
            console.error("Error resizing image:", error);
          })
          .finally(() => setLoading(false));
      };
      reader.readAsDataURL(file);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClear = async () => {
    setLoading(true);
    await deleteImage(thumbnailImg?.fileName || uploadData.fileName || "");
    setUploadData({});
    switch (type) {
      case "thumbnail":
        updateLink({
          id,
          thumbnail: {
            fileName: "",
            url: "",
          },
        });
        break;
      case "profilePic":
        updateOwner({
          profilePic: {
            type: "classic",
            fileName: "",
            url: "",
          },
        });
        break;
    }
    setLoading(false);
  };

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (show) {
      setIsHidden(false);
    } else {
      timer = setTimeout(() => {
        setIsHidden(true);
      }, 250);
    }

    return () => clearTimeout(timer);
  }, [show]);

  const openModal = () => {
    setModal(true);
  };

  const handleUpload = async () => {
    setLoading(true);

    const accessUrl = await uploadImage(uploadData?.fileName!, blob, id);
    console.log(accessUrl);
    if (accessUrl) {
      console.log(accessUrl.body);

      switch (type) {
        case "thumbnail":
          updateLink({
            id,
            thumbnail: {
              fileName: accessUrl?.body?.filename || "",
              url: accessUrl?.body?.url || "",
            },
          });
          break;
        case "profilePic":
          updateOwner({
            profilePic: {
              type: "classic",
              fileName: accessUrl?.body?.filename || "",
              url: accessUrl?.body?.url || "",
            },
          });
          break;
      }
      setModal(false);
      setLoading(false);
    } else {
      alert(
        `Sorry there has been an error uploading your error please try again later (make sure your file isn't too big) or conntact us ${
          supportEmail ? "at:" + " " + supportEmail : ""
        }`
      );
      setLoading(false);
    }
  };
  const handleRemove = async () => {
    await deleteImage(thumbnailImg?.fileName || uploadData.fileName || "");
    setUploadData({});
    switch (type) {
      case "thumbnail":
        updateLink({
          id,
          thumbnail: {
            fileName: "",
            url: "",
          },
        });
        break;
      case "profilePic":
        updateOwner({
          profilePic: {
            type: "classic",
            fileName: "",
            url: "",
          },
        });
        break;
    }
    setModal(false);
    setLoading(false);
    if (onBlur) onBlur();
  };

  const onChangeClick = () => {
    handleUploadSelect();
    setModal(true);
  };

  return (
    <div
      className={cn(
        "flex flex-col w-full gap-5 pb-10",
        { "animate-fade": show },
        { "animate-fade animate-reverse": !show },
        { hidden: isHidden }
      )}
    >
      {type === "thumbnail" && (
        <div className="bg-scrim-200 flex items-center justify-center  h-11 rounded-md">
          <h1 className="text-16 font-semibold pl-5 mx-auto">Add Thumbnail</h1>
          <Button
            onClick={onBlur}
            variant={"ghost"}
            size={"icon"}
            className="w-10 h-10  hover:bg-scrim-100"
          >
            &times;
          </Button>
        </div>
      )}
      {thumbnailImg?.url && type !== "profilePic" && (
        <div className="flex mx-5 justify-center items-center relative  gap-5">
          <Image
            src={thumbnailImg.url}
            alt={thumbnailImg.fileName}
            className="size-[100px] rounded-lg max-w-full mx-auto z-0"
            style={{
              objectFit: "cover",
              objectPosition: "center",
            }}
          />

          <div className="flex flex-col grow gap-2">
            <Button
              onClick={onChangeClick}
              size={"wide"}
              className="text-white-100 text-[16px] rounded-full"
            >
              Change
            </Button>
            <Button
              size={"wide"}
              variant={"outline"}
              className=" text-[16px] rounded-full"
              onClick={handleRemove}
            >
              Remove
            </Button>
          </div>
        </div>
      )}

      {type === "profilePic" && (
        <div className="flex items-center max-w-full  xl:px-10  xl:gap-10 px-5 gap-5    ">
          {thumbnailImg?.url && (
            <Image
              width={100}
              height={100}
              src={thumbnailImg.url}
              alt={thumbnailImg.fileName}
              className=" w-[100px] h-[100px]  max-w-full mx-auto z-0 rounded-full"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          )}
          {!thumbnailImg?.url && (
            <CircleUserRound width={100} height={100} color="black" />
          )}
          <div className="flex flex-col grow gap-2 min-w-[200px]">
            <Button
              onClick={onChangeClick}
              size={"wide"}
              className=" text-white-100 text-[16px] rounded-full"
            >
              Pick an Image
            </Button>
            <Button
              size={"wide"}
              variant={"outline"}
              className=" text-[16px] rounded-full"
              onClick={handleRemove}
            >
              Remove
            </Button>
          </div>
        </div>
      )}

      {!thumbnailImg?.url && type === "thumbnail" && (
        <div className=" flex  flex-col mx-5 h-full  gap-5 justify-center items-center">
          <p>Add a Thumbnail or Icon to this Link.</p>
          <Button
            onClick={openModal}
            size={"wide"}
            className="text-white-100 text-[16px] w-full h-10 rounded-full"
          >
            Set Thumbnail
          </Button>
        </div>
      )}
      <Sheet open={modal} onOpenChange={() => setModal(false)}>
        <SheetContent side={"center"} className="bg-white-100 w-full md:w-1/3">
          <SheetTitle className="text-center ">
            {modalOption === "native-upload" && (
              <Button
                onClick={handleGoBack}
                variant={"ghost"}
                size={"icon"}
                className=" absolute left-4 top-4 w-10 h-10 animate-fade-right"
              >
                <ChevronLeft />
              </Button>
            )}
            <h1 className="ml-auto">Add Thumbnail</h1>
          </SheetTitle>
          <div
            className={cn(
              "w-full pt-5 flex flex-col gap-5 justify-center animate-fade-left",
              { "animate-fade-right": modalOption === "native-upload" }
            )}
          >
            <div
              className={cn("flex flex-col size-full ", {
                hidden: modalOption === "native-upload",
              })}
            >
              <Button
                onClick={handleUploadSelect}
                variant={"ghost"}
                className="flex items-center  text-left gap-7  h-20 w-full "
              >
                <div className="w-12 h-12 bg-scrim-600 rounded-md" />
                <div>
                  <h1 className="text-16 font-bold">
                    Upload your own thumbnail
                  </h1>
                  <p className="text-12">
                    Choose an image or GIF from your device
                  </p>
                </div>
              </Button>
              <Button
                variant={"ghost"}
                className="flex items-center  text-left gap-5  h-20 w-full "
              >
                <div className="w-12 h-12 bg-scrim-600 rounded-md" />
                <div>
                  <h1 className="text-16 font-bold">
                    Choose From Tabler Icons
                  </h1>
                  <p className="text-12">
                    Choose from Tabler Icons (!Coming Soon!)
                  </p>
                </div>
              </Button>
            </div>

            {modalOption === "native-upload" && (
              <div className="animate-fade flex flex-col gap-5 relative">
                {uploadData.url === "" ? (
                  <div className=" w-[100%]  border-2 rounded-xl border-dashed flex flex-col justify-center items-center py-10 gap-2 ">
                    {loading && <Loader2 size={20} className="animate-spin" />}
                    {!loading && (
                      <>
                        <input
                          type="file"
                          name="qr-me-file-upload"
                          accept="image/jpeg, image/png, image/gif, image/webp, image/avif, image/svg+xml, image/bmp"
                          className="builder-line absolute bg-transparent p-12 opacity-0 cursor-pointer"
                          onChange={handleChange}
                        />
                        <Img />
                        <p className="text-12">Select A file to upload</p>
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    {loading && (
                      <Loader2
                        size={20}
                        className="animate-spin mx-auto my-auto"
                      />
                    )}
                    {!loading && (
                      <img
                        src={uploadData.url}
                        alt="Uploaded Image"
                        className="size-[100px] rounded-lg max-w-full mx-auto z-0"
                        style={{
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                    )}
                  </>
                )}

                <div className="flex w-full gap-5">
                  <Button
                    variant={"outline"}
                    className="w-full rounded-lg"
                    disabled={uploadData.url === ""}
                    onClick={handleClear}
                  >
                    Clear
                  </Button>
                  <Button
                    disabled={uploadData.url === "" || !!thumbnailImg?.url}
                    className="w-full rounded-lg text-white-100"
                    onClick={handleUpload}
                  >
                    Upload
                  </Button>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Thumbnail;
