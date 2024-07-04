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
          <div className="self-start border-2 hover:bg-scrim-100 rounded-3xl shadow-2xl gap-2 text-[16px] h-11  px-8  inline-flex items-center justify-center whitespace-nowrap  text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
            <Share color="black" size={20} /> Share
          </div>
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
