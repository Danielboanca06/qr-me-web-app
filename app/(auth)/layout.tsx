import Image from "next/image";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full justify-between font-inter">
      {children}
      <div className="auth-asset">
        <div>
          <div className="flex justify-center items-center h-screen bg-black">
            <Image
              src="/wavy_background_1.png"
              alt="Auth image"
              width={500}
              height={500}
              className="rounded-l-xl object-contain shadow-custom"
            />

            <div className="absolute bottom-10 left-40">
              <Image
                src="/sign-up-preview.png"
                alt="Auth image"
                width={300}
                height={400}
                className="rounded-l-xl object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
