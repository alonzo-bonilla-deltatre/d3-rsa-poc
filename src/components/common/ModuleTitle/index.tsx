import { translate } from '@/utilities/i18n';
import Image from 'next/image';
import ImgIcon from '@/components/common/ImgIcon';

type TitleProps = {
  canRender?: boolean;
  heading?: string;
  text?: string;
};

const ModuleTitle = ({ ...props }: TitleProps) => {
  const { canRender, heading, text } = props as TitleProps;

  const HeadingTag = `${heading ? heading.toLowerCase() : 'h2'}` as keyof JSX.IntrinsicElements;

  return (
    <>
      {canRender && text && (
        <div className="container flex w-full mx-auto">
          <div
            data-after={`${translate(text)}`}
            className={`relative uppercase flex mx-auto ml-4 items-center h-[120px] md:h-[214px] z-[1] w-[1440px]
      after:absolute after:content-[attr(data-after)] after:z-0 after:opacity-[.06] after:text-[100px] after:md:text-[160px] after:font-bold after:whitespace-nowrap`}
          >
            <ImgIcon
              className={'ml-2 z-[1] md:w-[32px] md:h-auto'}
              src={'/icons/title_rectangle.svg'}
              width={22}
              height={31}
              alt={''}
              ariaHidden={true}
            />
            <HeadingTag className="text-base md:text-5xl font-bold ml-2 z-[1]">{translate(text)}</HeadingTag>
          </div>
        </div>
      )}
    </>
  );
};

export default ModuleTitle;
