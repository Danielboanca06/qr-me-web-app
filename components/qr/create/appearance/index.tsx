import { useBoardState } from "../boardStateContext";
import Backgrounds from "./backgrounds";
import ButtonCard from "./buttonCard";
import ProfileCard from "./profileCard";

interface AppearanceProps {}

const Appearance = ({}: AppearanceProps) => {
  const { qrContent } = useBoardState();

  return (
    <section className="flex flex-col w-full h-full ">
      <ProfileCard qrContent={qrContent!} />
      <Backgrounds qrContent={qrContent} />
      <ButtonCard />
    </section>
  );
};

export default Appearance;
