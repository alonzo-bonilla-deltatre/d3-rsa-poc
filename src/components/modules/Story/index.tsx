import { ComponentProps } from "@/models/types/components";
import { getEntity } from "@/services/dapiService";
import Picture from "@/components/common/Picture";
import { transformations } from "@/utilities/cloudinaryTransformations";
import logger from "@/utilities/logger";
import { LoggerLevel } from "@/models/types/logger";
import CardRoofline from "@/components/common/CardRoofline";
import CardAuthor from "@/components/common/CardAuthor";
import CardDate from "@/components/common/CardDate";
import SocialIcons from "@/components/common/SocialIcons";
import dynamic from "next/dynamic";
import { DistributionEntity } from "@/models/types/dapi";
import Markdown from "@/components/common/storyparts/Markdown";
import PhotoPart from "@/components/common/storyparts/PhotoPart";
import { nanoid } from "nanoid";

// @ts-ignore
const Sponsored = dynamic(() => import("@/components/common/Sponsored"));

type ModuleProps = {
  slug: string;
  hideAuthor: boolean;
  hideDate: boolean;
  hideDescription: boolean;
  hideRoofline: boolean;
  hideTitle: boolean;
  hideSocial: boolean;
  hideSponsor: boolean;
  sponsor: string;
  sponsorName: string;
};

const Story = async ({ ...data }: ComponentProps) => {
  const props = data.properties as ModuleProps;
  if (!Object.hasOwn(props, "slug") || !props.slug.length) {
    logger.log(
      "Cannot render Story module with empty slug",
      LoggerLevel.warning
    );
    return null;
  }

  const storyEntityFetch = getEntity(
    "stories",
    props.slug
  );

  const [storyEntity] = await Promise.all([storyEntityFetch]);
  const sponsorTag = "sponsor-coates";
  //TODO: sponsor as a related tag?

  return storyEntity ? (
    <>
      <section className="relative mx-auto mt-20 w-full max-w-container px-4 sm:px-6 lg:px-8">
        <CardRoofline context={storyEntity.context} hide={props.hideRoofline}></CardRoofline>
        <div className="grid grid-cols-1">
          <div className="mt-20 mx-40 col-start-1">
            <div className="flex justify-between">
              <div>
                <header className="max-w-lg">
                  <h3 className="font-bold text-5xl uppercase">
                    {storyEntity.title}
                  </h3>
                  <p className="mt-8">
                    {storyEntity.headline}
                  </p>
                  <CardAuthor author={storyEntity.createdBy} hide={props.hideAuthor}></CardAuthor>
                  <CardDate date={storyEntity.contentDate} format={null} hide={props.hideDate}></CardDate>
                </header>
              </div>
              <div>
                <Sponsored hide={props.hideSponsor} tag={sponsorTag} name={props.sponsorName} width={70} height={20} className={""}></Sponsored>
                {!props.hideSocial && (
                  <div className="flex flex-row items-end col-start-10 row-start-10 mt-8">
                    <SocialIcons hide={false} size={50} className={"mr-4"}></SocialIcons>
                  </div>
                )}
              </div>
            </div>
          </div>
          {storyEntity.thumbnail && (
            <div className="mt-8 mx-40 col-start-1">
              <Picture
                src={storyEntity.thumbnail.templateUrl}
                transformations={transformations.thumbnailDetail}
                width={630}
                height={270}
                alt={storyEntity.thumbnail.title ?? ""}
                className="w-full h-full object-cover"
              />
            </div>
          )}

        </div>
      </section>
      <section className="relative mx-auto mt-20 w-full max-w-container px-4 sm:px-6 lg:px-8">
        {storyEntity.parts.map((part: DistributionEntity) => {
          switch (part.type) {
            case "markdown":
              return <Markdown key={nanoid()} markdownText={part.content}></Markdown>;
            case "photo":
              return <PhotoPart key={nanoid()} image={part as DistributionEntity}></PhotoPart>;
            default:
              return <span key={nanoid()}>{part.type}</span>;
          }
          return (
            <span key={nanoid()}>{part.type}</span>
          );
        })}

      </section>
    </>
  ) : (
    <></>
  );
};
export default Story;
