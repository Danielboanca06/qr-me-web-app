"use client";
import Image from "next/image";
import { Button } from "../ui";
import SearchBar from "../searchBar";
import { useState } from "react";
import Link from "next/link";
import {
  Search as SearchIcon,
  ShoppingBasket,
  Menu,
  X,
  UserRound,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { cn } from "lib/utils";
import { NavBar } from "./navBar";
import { AuthButtons } from "./authButtons";
import { usePathname } from "next/navigation";

interface HeaderProps {
  hasSession: boolean;
  headerType: "homePage" | "profile" | "scan";
}

type ModalState = {
  show: boolean;
  type?: "search" | "menu";
};

const Header = ({ hasSession, headerType }: HeaderProps) => {
  const pathname = usePathname();
  const [showModal, setShowModal] = useState<ModalState>({
    show: false,
    type: "menu",
  });
  const [animation, setAnimation] = useState("animate-fadeDown");

  const openModal = (type: ModalState["type"]) => {
    setAnimation("animate-fadeDown");
    setShowModal({ show: true, type: type });
  };

  const closeModal = () => {
    if (showModal.show) {
      setAnimation("animate-fadeUp");
      setTimeout(() => setShowModal({ show: false }), 350); // Match the animation duration
    }
  };

  const handleDropDownClick = (type: ModalState["type"]) => {
    if (showModal.show && showModal.type !== type) {
      openModal(type);
    } else if (showModal.show === false) {
      openModal(type);
    } else {
      closeModal();
    }
  };

  return (
    <header
      className={cn(
        "flex  justify-between h-min  items-center relative rounded-full border shadow-2xl ",
        pathname.includes("/qr/customize/") && "absolute z-1000"
      )}
      onMouseLeave={closeModal}
    >
      {pathname.includes("/qr/customize/") && (
        <Button
          size="icon"
          variant="ghost"
          className="w-10 h-10 justify-center ml-5 mt-5 absolute z-10"
        >
          <ChevronLeft size={30} />
        </Button>
      )}

      {!pathname.includes("/qr/customize/") && (
        <>
          <Link
            href={"/"}
            className={cn("w-1/5 flex justify-center ml-5 md:ml-0")}
          >
            <Image
              src={"/logo_3.svg"}
              width={130}
              height={50}
              alt="Qr-Me logo"
            />
          </Link>

          {headerType !== "scan" && (
            <NavBar hasSession={hasSession} type="navLinks" />
          )}

          <div className="flex justify-center xl:mx-20 mr-5 gap-5 m-1">
            {/* {hasSession && (
          <Button
            size="icon"
            variant="ghost"
            className="w-10 h-10 justify-center"
          >
            <Bell size={25} />
          </Button>
        )}
        {hasSession && (
          <Button
            size="icon"
            variant="ghost"
            className="w-10 h-10 justify-center"
          >
            <Send size={25} />
          </Button>
        )} */}

            {hasSession && (
              <Link href={"/qr/customize"} className="icon-highlight">
                <UserRound size={25} />
              </Link>
            )}

            {headerType !== "scan" && (
              <Button
                size="icon"
                variant="ghost"
                className="w-10 h-10 justify-center"
                onClick={() => handleDropDownClick("search")}
              >
                <SearchIcon size={25} />
              </Button>
            )}

            {headerType === "profile" && (
              <Link href={"/settings"} className="icon-highlight">
                <Settings size={25} />
              </Link>
            )}

            {headerType === "homePage" && (
              <>
                <Link href={"/cart"} className="icon-highlight">
                  <ShoppingBasket size={25} />
                </Link>
              </>
            )}

            <Button
              size="icon"
              variant="ghost"
              className={cn(
                { "w-10 h-10 justify-center xl:hidden": headerType !== "scan" },
                { "w-10 h-10 justify-center": headerType === "scan" }
              )}
              onClick={() => handleDropDownClick("menu")}
            >
              <Menu size={25} />
            </Button>
          </div>

          {headerType === "profile" && (
            <NavBar hasSession={hasSession} type="userOptions" />
          )}

          {!hasSession && headerType !== "scan" && <AuthButtons />}
          {showModal.show && (
            <div
              className={`absolute inset-0  top-[50px] xl:top-[65px] h-[200px] transform-all ease-linear flex  bg-opacity-50  border rounded-3xl shadow-2xl  min-w-[150px]  ${animation}`}
            >
              <Button
                onClick={closeModal}
                size="icon"
                variant="ghost"
                className={cn(
                  "w-7 h-7 absolute right-[23px] top-5 xl:right-[100px]",
                  {
                    "xl:hidden": headerType !== "scan",
                  }
                )}
              >
                <X size={20} />
              </Button>

              {/* Search Bar Drop-Down*/}
              {showModal.type === "search" && (
                <div className="flex  bg-white-100 w-full rounded-b-2xl ">
                  <SearchBar />
                  {/* Have freqently searched items here */}
                </div>
              )}
              {/* Menu Drop-Down*/}
              {showModal.type === "menu" && (
                <div
                  className={cn(
                    "flex  bg-white-100 w-full  h-fit  rounded-b-2xl",
                    {
                      "xl:hidden": headerType !== "scan",
                    }
                  )}
                >
                  <NavBar dropDown hasSession={hasSession} />
                </div>
              )}
            </div>
          )}
        </>
      )}
    </header>
  );
};

export default Header;
