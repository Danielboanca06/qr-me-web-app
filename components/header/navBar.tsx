"use client";
import { cn } from "lib/utils";
import { Home, QrCode, Send, Bell } from "lucide-react";
import Link from "next/link";
import { AuthButtons } from "./authButtons";
import { usePathname } from "next/navigation";

type NavBarProps = {
  type?: "userOptions" | "navLinks";
  dropDown?: boolean;
  hasSession?: boolean;
};

export const NavBar = ({
  dropDown = false,
  type = "navLinks",
  hasSession,
}: NavBarProps) => {
  const currentRoute = usePathname();

  return (
    <nav
      className={cn(
        { "h-full w-full flex-col  flex": dropDown },
        {
          "hidden xl:flex justify-evenly  w-2/5   ": !dropDown,
        },
        {
          "flex flex-row absolute top-[50px] w-full bg-white-100":
            type === "userOptions",
        }
      )}
    >
      {type === "navLinks" && (
        <>
          <ul
            className={cn(
              "list-none flex w-full justify-evenly xl:items-center items-start py-5 gap-5 pl-10  h-full ",
              {
                "flex-col text-20": dropDown,
              }
            )}
          >
            <li>
              <Link href="/store-front" prefetch={false}>
                Store
              </Link>
            </li>
            <li>
              <Link href="/about" prefetch={false}>
                About
              </Link>
            </li>
            <li>
              <Link href="/help" prefetch={false}>
                Help
              </Link>
            </li>
            <li>
              <Link href="" prefetch={false}>
                Something
              </Link>
            </li>
          </ul>
          {dropDown && !hasSession && <AuthButtons dropDown />}
        </>
      )}
      {type === "userOptions" && (
        <ul className={cn("list-none flex  w-full justify-around  ")}>
          <li>
            <Link href={"/home"} className="icon-highlight">
              <Home
                color={currentRoute.includes("home") ? "#9A2CF6" : "#5077F5"}
              />
            </Link>
          </li>
          <li>
            <Link href={"/qr/customize"} className="icon-highlight">
              <QrCode
                color={currentRoute.includes("qr") ? "#9A2CF6" : "#5077F5"}
              />
            </Link>
          </li>
          <li>
            <Link href={"/message"} className="icon-highlight">
              <Send
                color={currentRoute.includes("message") ? "#9A2CF6" : "#5077F5"}
              />
            </Link>
          </li>
          <li>
            <Link href={"/notification"} className="icon-highlight">
              <Bell
                color={
                  currentRoute.includes("notification") ? "#9A2CF6" : "#5077F5"
                }
              />
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};
