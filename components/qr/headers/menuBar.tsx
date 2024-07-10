"use client";
import { cn } from "lib/utils";

import Link from "next/link";
import Image from "next/image";

import { sidebarLinks } from "lib/constants";

import { Link2, Lock, Palette, Bolt, CircleUserRound } from "lucide-react";
import { Button } from "components/ui";
import { useSearchParams } from "next/navigation";
import { User } from "types";

interface MenuBarProps {
  user: User;
}

const MenuBar = ({ user }: MenuBarProps) => {
  const params = useSearchParams();
  return (
    <section className="sidebar">
      {/* <div className="absolute z-50 top-1 right-[-60px] hidden xl:block">
        <Button
          variant={"ghost"}
          size={"icon"}
          className=" w-10 h-10 bg-white-100 shadow-xl border-2 "
          onClick={handleShrinkClick}
        >
          <ChevronLeft size={25} className="" color="black" />
        </Button>
      </div> */}
      <nav className="flex flex-col  gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image
            src="/logo_1.svg"
            width={34}
            height={34}
            alt="Qr Me Logo"
            className="size-[24px] max-xl:size-14"
          />
          <h1 className="sidebar-logo">Qr Me</h1>
        </Link>

        {sidebarLinks.map((item, i) => {
          const isActive = item.route === params.get("tab");

          return (
            <button
              onClick={() =>
                window.history.pushState({ item }, "", `?tab=${item.route}`)
              }
              key={item.label}
              className={cn(
                "sidebar-link",
                { "border-l-2 border-secondary-100": isActive },
                {
                  "bg-scrim-100": isActive,
                }
              )}
            >
              <div className="relative size-6">
                {item.label === "Links" && (
                  <Link2 color={isActive ? "#9A2CF6" : "black"} />
                )}
                {item.label === "Appearance" && (
                  <Palette color={isActive ? "#9A2CF6" : "black"} />
                )}
                {item.label === "Privacy" && (
                  <Lock color={isActive ? "#9A2CF6" : "black"} />
                )}
                {item.label === "Settings" && (
                  <Bolt color={isActive ? "#9A2CF6" : "black"} />
                )}
              </div>
              <p
                className={cn("sidebar-label", {
                  "!text-secondary-100": isActive,
                })}
              >
                {item.label}
              </p>
            </button>
          );
        })}
      </nav>

      <Button
        variant={"outline"}
        className="justify-start gap-5 h-fit p-0 text-[14px] font-semibold text-black-100 shadow-lg "
      >
        <CircleUserRound size={50} color="#9A2CF6" />
        <h3 className="hidden xl:block">
          {user?.username || user?.firstName || ""}
        </h3>
      </Button>
    </section>
  );
};

export default MenuBar;
