import { ComponentProps } from "@/models/types/components";
import dynamic from "next/dynamic";

// @ts-ignore
const Menu = dynamic(() => import("@/components/modules/Menu/index"));

const MenuWrapper = ({...data}: ComponentProps): React.ReactElement => {
    return <Menu {...data} />;
  };

  const render = ( {...data} : ComponentProps): React.ReactElement =>
  data ? <MenuWrapper {...data} /> : <></>;
  
  export default render;