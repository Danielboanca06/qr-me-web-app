"use client";
import { useState, forwardRef, FocusEvent } from "react";
import { Button, Input, InputProps } from "./ui";
import { Search as SearchIcon } from "lucide-react";
import { cn } from "lib/utils";

const SearchBar = forwardRef<HTMLInputElement, InputProps>(
  ({ className, onFocus, onBlur, ...props }, ref) => {
    const toggleFullScreen = () => {};

    return (
      <div
        className={cn(
          " flex items-center z-20 transition-width duration-300 mx-auto my-auto w-[85%] rouned-full "
        )}
      >
        <Input
          {...props}
          className={cn(
            "pl-10 bg-scrim-100   text-20 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-3xl  md:block focus:outline-none focus:ring-0  outline-none placeholder:text-20 "
          )}
          placeholder="Search"
          ref={ref}
        />
        <Button
          size="icon"
          variant="ghost"
          className="w-10 h-10 absolute"
          onClick={toggleFullScreen}
        >
          <SearchIcon color="#9199A5" />
        </Button>
      </div>
    );
  }
);

SearchBar.displayName = "SearchBar";

export default SearchBar;
