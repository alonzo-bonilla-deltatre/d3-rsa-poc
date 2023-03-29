import { ComponentProps } from "@/models/types/components";
import { getEntity } from "@/services/dapiService";
import Picture from "@/components/common/Picture";
import { transformations } from "@/utilities/cloudinaryTransformations";
import logger from "@/utilities/logger";
import { LoggerLevel } from "@/models/types/logger";
import CardRoofline from "@/components/editorial/card/CardRoofline";
import CardAuthor from "@/components/editorial/card/CardAuthor";
import CardDate from "@/components/editorial/card/CardDate";
import SocialIcons from "@/components/common/SocialIcons";
import dynamic from "next/dynamic";
import { StoryPart } from "@/models/types/storyPart";
import { renderStoryPart } from "@/services/renderHandlers/renderStoryPart";

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

  const storyEntityFetch = getEntity("stories", props.slug);

  const [storyEntity] = await Promise.all([storyEntityFetch]);
  const sponsorTag = "sponsor-coates";
  //TODO: sponsor as a related tag?

  return storyEntity ? (
    <>
      <section className="w-full container mx-auto mt-40">
        <CardRoofline
          context={storyEntity.context}
          hide={props.hideRoofline}
        ></CardRoofline>
        <div className="flex justify-between mx-20">
          <header className="w-full">
            <h3 className="font-bold text-5xl uppercase">
              {storyEntity.title}
            </h3>
            <div className="flex justify-between items-center">
              <div>
                {storyEntity.headline && (
                  <p className="mt-8 mb-3">{storyEntity.headline}</p>
                )}
                <CardAuthor
                  author={storyEntity.createdBy}
                  hide={props.hideAuthor}
                ></CardAuthor>
                <CardDate
                  date={storyEntity.contentDate}
                  format={null}
                  hide={props.hideDate}
                ></CardDate>
              </div>
              <div className="flex flex-row items-end col-start-10 row-start-10 mt-8">
                <div>
                  <Sponsored
                    hide={props.hideSponsor}
                    tag={sponsorTag}
                    name={props.sponsorName}
                    width={70}
                    height={20}
                    className={""}
                  ></Sponsored>
                  {!props.hideSocial && (
                    <div className="flex flex-row items-end col-start-10 row-start-10 mt-8">
                      <SocialIcons
                        hide={false}
                        size={50}
                        className={"mr-4"}
                      ></SocialIcons>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>
        </div>
      </section>
      <section className="w-full container mx-auto mt-20">
        {storyEntity.thumbnail && (
          <div className="mt-8 col-start-1">
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
        {storyEntity.parts.map((part: StoryPart) => {
          return (
            <>
              <div className="mx-20 mt-20 col-start-1">
                {renderStoryPart(part)}
              </div>
            </>
          );
        })}
      </section>
    </>
  ) : (
    <></>
  );
};
export default Story;
