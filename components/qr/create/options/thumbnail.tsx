"use client";
import { Button } from "components/ui";
import { ChevronLeft, Loader2, Image as Img } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "lib/utils";
import { Sheet, SheetContent, SheetTitle } from "components/ui/sheet";
import { useBoardState } from "../boardStateContext";
import Resizer from "react-image-file-resizer";

interface ThumbnailProps {
  id: string;
  onBlur: () => void;
  thumbnailImg: string;
  show: boolean;
}

const Thumbnail = ({ id, onBlur, show, thumbnailImg }: ThumbnailProps) => {
  const { updateLink } = useBoardState();
  const [isHidden, setIsHidden] = useState(true);
  const [modal, setModal] = useState(false);
  const [modalOption, setModalOption] = useState("upload-option");
  const [loading, setLoading] = useState(false);
  const [uploadData, setUploadData] = useState<Blob | MediaSource | string>("");

  useEffect(() => {
    if (thumbnailImg) {
      setUploadData(JSON.parse(thumbnailImg));
    }
  }, [thumbnailImg]);

  const resize = (file: Blob) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        200,
        "JPEG",
        100,
        0,
        (uri) => {
          //@ts-ignore
          setUploadData(uri || "");
        },
        "base64",
        100,
        100
      );
    });

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
      const image = await resize(file);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClear = () => {
    setUploadData("");
    updateLink({ id, thumbnail: "" });
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

  const handleUpload = () => {
    const thumbnail = JSON.stringify(uploadData);
    updateLink({ id, thumbnail });
    setModal(false);
    onBlur();
  };
  const handleRemove = () => {
    setUploadData("");
    updateLink({ id, thumbnail: "" });
    setModal(false);
    setLoading(false);
    onBlur();
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
      {uploadData && (
        <div className="flex mx-5 justify-center items-center gap-5">
          <img
            //@ts-ignore
            src={uploadData || ""}
            alt="Uploaded Image"
            className="size-[100px] rounded-lg max-w-full mx-auto"
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
      {!uploadData && (
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
              <div className="animate-fade flex flex-col gap-5">
                {uploadData === "" ? (
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
                  <img
                    //@ts-ignore
                    src={uploadData || "st"}
                    alt="Uploaded Image"
                    className="size-[100px] rounded-lg max-w-full mx-auto"
                  />
                )}

                <div className="flex w-full gap-5">
                  <Button
                    variant={"outline"}
                    className="w-full rounded-lg"
                    disabled={uploadData === ""}
                    onClick={handleClear}
                  >
                    Clear
                  </Button>
                  <Button
                    disabled={uploadData === ""}
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
