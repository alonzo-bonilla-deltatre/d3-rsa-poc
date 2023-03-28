import { ComponentProps } from "@/models/types/components";
import { getEntity } from "@/services/dapiService";
import logger from "@/utilities/logger";
import { LoggerLevel } from "@/models/types/logger";
import dynamic from "next/dynamic";
import BrightcoveVideoPlayer from "@/components/common/BrightcoveVideoPlayer";
import CardRoofline from "@/components/common/CardRoofline";
import CardAuthor from "@/components/common/CardAuthor";
import CardDate from "@/components/common/CardDate";
import SocialIcons from "@/components/common/SocialIcons";

// @ts-ignore
const Title = dynamic(() => import("@/components/common/Title"));

type ModuleProps = {
  slug: string;
  moduleTitle: string;
  headingLevel: string;
  displayModuleTitle: string;
};

const BrightcoveVideo = async ({ ...data }: ComponentProps) => {
  const properties = data.properties as ModuleProps;
  if (!Object.hasOwn(properties, "slug") || !properties.slug.length) {
    logger.log(
      "Cannot render CustomPromo module with empty slug",
      LoggerLevel.warning
    );
    return null;
  }

  const entityFetch = getEntity("brightcovevideos", properties.slug);

  const [entity] = await Promise.all([entityFetch]);

  return entity ? (
    <>
      <section className="mt-8">
        <Title
          canRender={/true/.test(properties.displayModuleTitle)}
          heading={properties.headingLevel}
          text={properties.moduleTitle}
        ></Title>
        <section className="w-full container mx-auto mt-40 px-4">
          <CardRoofline context={entity.context} hide={false}></CardRoofline>
          <div className="flex justify-between">
            <header className="">
              <h3 className="font-bold text-5xl uppercase">{entity.title}</h3>
              <p className="mt-8">{entity.headline}</p>
              <CardAuthor author={entity.createdBy} hide={false}></CardAuthor>
              <CardDate
                date={entity.contentDate}
                format={null}
                hide={false}
              ></CardDate>
            </header>
          </div>
        </section>
        <section className="w-full container mx-auto mt-20 px-4">
          <div className="grid grid-cols-1 relative overflow-hidden w-full pt-[56.25%]">
            <BrightcoveVideoPlayer entity={entity} />
          </div>
        </section>
      </section>
    </>
  ) : (
    <></>
  );
};

export default BrightcoveVideo;
