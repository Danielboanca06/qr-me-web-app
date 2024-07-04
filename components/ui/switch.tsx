import * as Switch from "@radix-ui/react-switch";
import { ComponentProps } from "react";

type SwitchRootProps = ComponentProps<typeof Switch.Root>;

const MySwitch: React.FC<SwitchRootProps> = (props) => (
  <Switch.Root
    {...props}
    className="w-[39px] cursor-pointer  shadow-xl h-[23px] bg-gray-500 rounded-full relative data-[state=checked]:bg-green-600 outline-none "
  >
    <Switch.Thumb
      {...props}
      className="block cursor-pointer w-[19px] h-[19px] bg-white-100 rounded-full transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[18px]"
    />
  </Switch.Root>
);

export default MySwitch;
