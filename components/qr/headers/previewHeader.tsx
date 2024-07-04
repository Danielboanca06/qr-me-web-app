"use client";
import { Button } from "components/ui";
import { SheetTrigger, Sheet, SheetContent } from "components/ui/sheet";
import { Share } from "lucide-react";
import ShareModal from "../create/options/shareModal";

const PreviewHeader = () => {
  return (
    <div className="flex justify-end w-full">
      <Sheet>
        <SheetTrigger>
          <Button
            variant={"outline"}
            size={"lg"}
            className="flex self-start rounded-3xl shadow-2xl gap-2 text-[16px]"
          >
            <Share color="black" size={20} /> Share
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="border-none bg-white-100 rounded-tl-3xl rounded-bl-3xl"
        >
          <ShareModal />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default PreviewHeader;
