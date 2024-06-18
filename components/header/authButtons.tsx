import { cn } from "lib/utils";
import Link from "next/link";

export const AuthButtons = ({ dropDown }: { dropDown?: boolean }) => {
  return (
    <div
      className={cn(
        {
          "flex justify-center space-x-5 md:space-x-20 px-2": dropDown,
        },
        { "w-1/5 gap-2 pr-10 min-w-[220px] xl:flex hidden": !dropDown }
      )}
    >
      <Link
        href={"sign-in"}
        className="header-auth-btn bg-scrim-100"
        prefetch={false}
      >
        Log In
      </Link>

      <Link
        href={"sign-up/auth-method"}
        className={cn(
          "header-auth-btn text-white-100 font-semibold bg-secondary-100 hover:bg-tertiary-100"
        )}
        prefetch={false}
      >
        Sign Up
      </Link>
    </div>
  );
};
