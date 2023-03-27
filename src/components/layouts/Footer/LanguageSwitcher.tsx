"use client";

import { usePathname } from "next/navigation";

const languageNavItemClasses = "text-sm font-light text-[#BEBEBE]";

type LanguageSwitcherProps = {
  enLanguageTranslation: string;
  frLanguageTranslation: string;
};

const LanguageSwitcher = ({ ...props }: LanguageSwitcherProps) => {
  let pathname = usePathname();
  pathname = pathname ?? "";
  let feUrl = process.env.NEXT_PUBLIC_FRONTEND_BASE_URL_WITH_LANGUAGE_TOKEN ?? "";
  let enUrl = feUrl ? feUrl.replace("{language}", "en") : "";
  enUrl = enUrl ? new URL(pathname ?? "/", enUrl).href : pathname;
  let frUrl = feUrl ? feUrl.replace("{language}", "fr") : "";
  frUrl = frUrl ? new URL(pathname ?? "/", frUrl).href : pathname;

  return (
    <>
      <a href={enUrl} className={`${languageNavItemClasses} pr-4 border-[#FFFFFF33] border-r transition duration-300 hover:text-[#fff]`}>
        {props.enLanguageTranslation}
      </a>
      <a href={frUrl} className={`${languageNavItemClasses} pl-4 transition duration-300 hover:text-[#fff]`}>
        {props.frLanguageTranslation}
      </a>
    </>
  );
};

export default LanguageSwitcher;
