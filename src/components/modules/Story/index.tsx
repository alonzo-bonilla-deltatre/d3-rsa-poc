import { ComponentProps } from "@/models/types/components";
import { getEntity } from "@/services/dapiService";
import { CustomPromoFields } from "@/models/types/dapi.customEntityFields";
import Picture from "@/components/common/Picture";
import { GraphicAssetsDashboardItem } from "@/models/types/gad";
import { getAssetsByTag } from "@/services/gadService";
import { transformations } from "@/utilities/cloudinaryTransformations";
import logger from "@/utilities/logger";
import { LoggerLevel } from "@/models/types/logger";
import { translate } from "@/utilities/i18n";
import dynamic from "next/dynamic";
import CardCta from "@/components/common/CardCta";
import CardRoofline from "@/components/common/CardRoofline";
import CardAuthor from "@/components/common/CardAuthor";
import CardDate from "@/components/common/CardDate";

type ModuleProps = {
  slug: string;
  hideAuthor: boolean;
  hideDate: boolean;
  hideDescription: boolean;
  hideRoofline: boolean;
  hideTitle: boolean;
  sponsor: string;
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

  const gadAssetsFetch = getAssetsByTag("sponsor-coates");

  const [gadAssets] = await Promise.all([gadAssetsFetch]);
  const logo: GraphicAssetsDashboardItem | null = gadAssets?.length
    ? gadAssets[0]
    : null;

  const storyEntityFetch = getEntity(
    "stories",
    props.slug
  );

  const [storyEntity] = await Promise.all([storyEntityFetch]);
  //const cta1Url = storyEntity && (storyEntity.fields as CustomPromoFields).callToAction1Link?.url;
  // const cta1Text = storyEntity && (storyEntity.fields as CustomPromoFields).callToAction1Link?.displayText;
  // const cta1Ext = (storyEntity && (storyEntity.fields as CustomPromoFields).callToAction1Link?.openInNewTab) ?? false;
  // const cta2Url = storyEntity && (storyEntity.fields as CustomPromoFields).callToAction2Link?.url;
  // const cta2Text = storyEntity && (storyEntity.fields as CustomPromoFields).callToAction2Link?.displayText;
  // const cta2Ext = (storyEntity && (storyEntity.fields as CustomPromoFields).callToAction2Link?.openInNewTab) ?? false;



  return storyEntity ? (
    <>
      <section className="relative mx-auto mt-20 w-full max-w-container px-4 sm:px-6 lg:px-8">
        <CardRoofline context={storyEntity.context} hide={props.hideRoofline}></CardRoofline>
        <div className="grid grid-cols-1 max-h-[790px] min-h-[500px] bg-gray-700 w-">
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
                  <CardDate date={storyEntity.contentDate} format={null}  hide={props.hideDate}></CardDate>
                </header>
              </div>

              {logo && (
                <div>
                  <div className="flex flex-row items-end col-start-10 row-start-10">
                    <span className="text-xs uppercase">
                      {translate("sponsored-by")}
                    </span>
                    <Picture
                      className=""
                      src={logo.assetUrl}
                      alt="Coates"
                      width={70}
                      height={20}
                      transformations={transformations.logos}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          {storyEntity.thumbnail && (
            <div className="mt-20 mx-40 col-start-1">
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
    </>
  ) : (
    <></>
  );
};
export default Story;
