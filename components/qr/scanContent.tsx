"use client";

import { useEffect } from "react";

interface ScanContentProps {
  html: string;
}

const ScanContent = ({ html }: ScanContentProps) => {
  useEffect(() => {
    const button = document.getElementById("myButton");
    if (button) {
      button.addEventListener("click", () => {
        console.log("Hello, World!");
      });
    }
    // Cleanup event listener on component unmount
    return () => {
      if (button) {
        button.removeEventListener("click", () => {
          console.log("Hello, World!");
        });
      }
    };
  }, []);

  return (
    <div
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  );
};

export default ScanContent;
