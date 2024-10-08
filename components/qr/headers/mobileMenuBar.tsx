"use client";
import Link from "next/link";
import { sidebarLinks } from "lib/constants";
import { cn } from "lib/utils";
import { Link2, Lock, Palette, Bolt } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { User } from "types";

interface MobileMenuBarProps {
  user: User;
}

const MobileMenuBar = ({ user }: MobileMenuBarProps) => {
  const params = useSearchParams();
  return (
    <section className="mobile-bar">
      <nav className="flex items-center justify-evenly  w-full  gap-4">
        {sidebarLinks.map((item, i) => {
          const isActive =
            item.route === params.get("tab") ||
            (params.get("tab") === null && item.route === "/");

          return (
            <button
              onClick={() =>
                window.history.pushState({ item }, "", `?tab=${item.route}`)
              }
              key={item.label}
              className={cn("mobile-link", {
                "border-b-2 border-black-100 rounded-b-sm": isActive,
              })}
            >
              <div className="flex justify-center">
                {item.label === "Links" && (
                  <Link2 color={isActive ? "black" : "#9199A5"} />
                )}
                {item.label === "Appearance" && (
                  <Palette color={isActive ? "black" : "#9199A5"} />
                )}
                {item.label === "Privacy" && (
                  <Lock color={isActive ? "black" : "#9199A5"} />
                )}
                {item.label === "Settings" && (
                  <Bolt color={isActive ? "black" : "#9199A5"} />
                )}
              </div>
              <p
                className={cn("mobile-label", {
                  "!text-black-100": isActive,
                })}
              >
                {item.label}
              </p>
            </button>
          );
        })}

        {/* <PlaidLink user={user} /> */}
      </nav>
    </section>
  );
};

export default MobileMenuBar;
