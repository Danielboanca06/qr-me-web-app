import { auth } from "auth";
import Header from "components/header/header";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <>
      <Header hasSession={!!session} headerType={"homePage"} />
      <main>{children}</main>
    </>
  );
}
