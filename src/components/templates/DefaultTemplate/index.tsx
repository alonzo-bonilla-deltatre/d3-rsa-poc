import { ComponentProps } from "@/models/types/components";
import { renderItemsInSlot } from "@/services/renderService";
import { nanoid } from "nanoid";
import dynamic from "next/dynamic";

// @ts-ignore
const Header = dynamic(() => import("@/components/layouts/Header"));
// @ts-ignore
const Footer = dynamic(() => import("@/components/layouts/Footer"));

const DefaultTemplate = ({ ...data }: ComponentProps) => {
  const { properties } = data;
  const mainSlot = "main";

  return (
    <div className="overflow-hidden flex flex-col justify-between min-h-[100vh]">
      <Header />
      <main>
        {renderItemsInSlot(data.items, mainSlot)}
      </main>
      <Footer />
    </div>
  );
};

const render = ({ ...data }: ComponentProps): React.ReactElement =>
  data ? <DefaultTemplate key={nanoid()} {...data} /> : <></>;

export default render;
