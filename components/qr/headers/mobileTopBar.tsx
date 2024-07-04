import Link from "next/link";
import Image from "next/image";
import { Button } from "components/ui";
import { CircleUserRound, Share } from "lucide-react";
import { SheetTrigger, Sheet, SheetContent } from "components/ui/sheet";
import ShareModal from "../create/options/shareModal";
interface MobileTopBarProps {
  user: User;
}

const MobileTopBar = ({ user }: MobileTopBarProps) => {
  return (
    <section className="mobile-topbar">
      <nav className="w-full flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image src="/logo_1.svg" width={30} height={30} alt="Qr Me Logo" />
        </Link>
        <div className="flex gap-5 items-center">
          <Button variant={"ghost"} size="icon" className="w-10 h-10 ">
            <CircleUserRound color="black" size={32} />
          </Button>

          <Sheet>
            <SheetTrigger>
              <Button
                variant={"outline"}
                size="sm"
                className="flex gap-2 items-center text-[16px] font-semibold "
              >
                <Share color="black" size={20} /> Share
              </Button>
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
