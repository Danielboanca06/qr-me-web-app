"use client";
import QrCard from "components/qr/qrCard";
interface UserPreviewCodesProps {
  session: User;
}

const UserPreviewCodes = ({ session }: UserPreviewCodesProps) => {
  if (session.qrCodes) {
    return (
      <main className=" flex  w-ful max-w-[1400px] flex-wrap justify-center w-full pt-10 gap-5 ">
        {session.qrCodes.map((code, i) => (
          <QrCard qrcode={code} key={code._id} />
        ))}
      </main>
    );
  } else {
    return (
      <div>
        <h1>You Do Not have any Codes</h1>
        <p>Get Qr Codes</p>
      </div>
    );
  }
};

export default UserPreviewCodes;
