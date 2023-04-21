import { ComponentProps } from "@/models/types/components";
import { getEntity } from "@/services/dapiService";
import { CustomPromoFields } from "@/models/types/dapi.customEntityFields";
import Picture from "@/components/common/Picture";
import { getSingleAssetByTag } from "@/services/gadService";
import { transformations } from "@/utilities/cloudinaryTransformations";
import logger from "@/utilities/logger";
import { LoggerLevel } from "@/models/types/logger";
import CallToAction from "@/components/common/CallToAction";
import Sponsored from "@/components/common/Sponsored";
import ModuleTitle from "@/components/common/ModuleTitle";

type ModuleProps = {
  slug: string;
  moduleTitle: string;
  headingLevel: string;
  displayModuleTitle: string;
};

const Promo = async ({ ...data }: ComponentProps) => {
  const properties = data.properties as ModuleProps;
  if (!Object.hasOwn(properties, "slug") || !properties.slug.length) {
    logger.log(
      "Cannot render CustomPromo module with empty slug",
      LoggerLevel.warning
    );
    return <div />;
  }

  const promoEntityFetch = getEntity(
    "promos",
    properties.slug
  );

  const [promoEntity] = await Promise.all([promoEntityFetch]);
  const cta1Url = promoEntity && (promoEntity.fields as CustomPromoFields).callToAction1Link?.url;
  const cta1Text = promoEntity && (promoEntity.fields as CustomPromoFields).callToAction1Link?.displayText;
  const cta1Ext = (promoEntity && (promoEntity.fields as CustomPromoFields).callToAction1Link?.openInNewTab) ?? false;
  const cta2Url = promoEntity && (promoEntity.fields as CustomPromoFields).callToAction2Link?.url;
  const cta2Text = promoEntity && (promoEntity.fields as CustomPromoFields).callToAction2Link?.displayText;
  const cta2Ext = (promoEntity && (promoEntity.fields as CustomPromoFields).callToAction2Link?.openInNewTab) ?? false;

  const sponsor = await getSingleAssetByTag("sponsor-coates");

  return promoEntity ? (
    <>
      <section className="mt-8">
        <ModuleTitle
          canRender={/true/.test(properties.displayModuleTitle)}
          heading={properties.headingLevel}
          text={properties.moduleTitle}
        ></ModuleTitle>
        <div className="grid grid-cols-1 max-h-[790px] min-h-[500px] bg-gray-700 w-full overflow-hidden">
          {promoEntity.thumbnail && (
            <div className="col-start-1 row-start-1">
              <Picture
                src={promoEntity.thumbnail.templateUrl}
                transformations={transformations.thumbnailDetail}
                alt={promoEntity.thumbnail.title ?? ""}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="mt-20 mx-40 col-start-1 row-start-1">
            <div className="flex justify-between">
              <div>
                <header className="max-w-md">
                  <h3 className="font-bold text-4xl uppercase">
                    {promoEntity.title}
                  </h3>
                  <p className="mt-8">
                    {(promoEntity.fields as CustomPromoFields)?.description}
                  </p>
                </header>

                <nav className="mt-8">
                  <ul className="list-none flex space-x-5">
                    {(cta1Url) && (
                      <li>
                        <CallToAction url={cta1Url} text={cta1Text} isExternal={cta1Ext} style={"default"} icon={""} hide={false}></CallToAction>
                      </li>
                    )}
                    {(cta2Url) && (
                      <li>
                        <CallToAction url={cta2Url} text={cta2Text} isExternal={cta2Ext} style={"reverse"} icon={""} hide={false}></CallToAction>
                      </li>
                    )}
                  </ul>
                </nav>
              </div>

              {sponsor && (
                <div>
                  <Sponsored hide={false} name={sponsor.name} width={70} height={20} className={""} assetUrl={sponsor.assetUrl}></Sponsored>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  ) : (
    <div />
  );
};
export default Promo;
