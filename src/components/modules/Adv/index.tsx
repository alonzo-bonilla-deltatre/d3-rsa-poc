import Image from "next/image";
import { ComponentProps } from "@/models/types/components";

const Adv = async ({ ...data }: ComponentProps) => {
  const { properties } = data;

  return (
    <Image
      src="https://via.placeholder.com/1932x828"
      width="1932"
      height="828"
      alt="ADV"
      className="pt-8 m-auto w-full h-full max-w-none object-cover"
    />
  );
};
export default Adv;
