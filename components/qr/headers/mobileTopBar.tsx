import Link from "next/link";
import Image from "next/image";
import { Button } from "components/ui";
import { CircleUserRound, Share } from "lucide-react";
import { SheetTrigger, Sheet, SheetContent } from "components/ui/sheet";
import ShareModal from "../create/links/options/shareModal";
import { User } from "types";
interface MobileTopBarProps {
  user: User;
}

const MobileTopBar = ({ user }: MobileTopBarProps) => {
  return (
    <section className="mobile-topbar">
      <nav className="w-full flex justify-between space-x-2 items-center">
        <Link href="/" className="flex items-center ml-1">
          <Image src="/logo_1.svg" width={30} height={30} alt="Qr Me Logo" />
        </Link>
        <div className="flex gap-5 items-center">
          <Button variant={"ghost"} size="icon" className=" w-10 h-10  ">
            <CircleUserRound color="black " strokeWidth="1.5" size={32} />
          </Button>

          <Sheet>
            <SheetTrigger>
              <div className="self-start border-2 hover:bg-scrim-100 rounded-3xl shadow-2xl gap-2 text-[16px] h-10   px-8  inline-flex items-center justify-center whitespace-nowrap  text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50">
                <Share color="black" size={20} /> Share
              </div>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="border-none bg-white-100 w-screen"
            >
              <ShareModal />
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </section>
  );
};

export default MobileTopBar;
