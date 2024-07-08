import { useBoardState } from "../boardStateContext";
import ProfileCard from "./profileCard";

interface AppearanceProps {}

const Appearance = ({}: AppearanceProps) => {
  const { qrContent } = useBoardState();
  console.log(qrContent);
  return (
    <section className="flex flex-col w-full h-screen ">
      <ProfileCard qrContent={qrContent!} />
    </section>
  );
};

export default Appearance;
