import { auth } from "auth";

import MenuBar from "components/qr/headers/menuBar";
import { redirect } from "next/navigation";

import MobileMenuBar from "components/qr/headers/mobileMenuBar";

import MobileTopBar from "components/qr/headers/mobileTopBar";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = await auth();

  if (!loggedIn) redirect("/sign-in");

  return (
    <main className="flex h-screen w-full font-inter px-2 py-2 ">
      <MenuBar user={loggedIn.user} />

      <div className="flex size-full flex-col">
        <div className="mobile-bar-layout mt-10">
          <MobileMenuBar user={loggedIn.user} />
        </div>
        {children}
      </div>
    </main>
  );
}
