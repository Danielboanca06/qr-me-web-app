import { Button } from "components/ui";
import { Plus, Type } from "lucide-react";
import { useBoardState } from "../create/boardStateContext";

interface ContainerHeadProps {}

const ContainerHead = ({}: ContainerHeadProps) => {
  const { addContent } = useBoardState();
  return (
    <section className="flex flex-col items-center gap-5 w-full">
      <Button
        size={"lg"}
        className="w-full  text-[16px] mx-5 text-white-100 flex gap-2 shadow-2xl rounded-3xl"
        onClick={() => addContent("link")}
      >
        <Plus />
        {"Add Link"}
      </Button>
      <Button
        variant={"outline"}
        size={"lg"}
        className="flex self-start rounded-3xl shadow-2xl gap-2 text-[16px]"
        onClick={() => addContent("text")}
      >
        <Type />
        {"Text"}
      </Button>
    </section>
  );
};

export default ContainerHead;
