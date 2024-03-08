import CallToAction from '@/components/common/CallToAction/CallToAction';
import { getCardSettings } from '@/components/common/cards/Card/CardHelpers';
import renderCard from '@/components/common/cards/Card/CardWrapper';
import HeaderTitle from '@/components/common/HeaderTitle/HeaderTitle';
import Picture from '@/components/common/Picture/Picture';
import styles from '@/components/modules/HeroStatic/HeroStatic.module.scss';
import { getFilteredItems } from '@/helpers/forgeDistributionEntityHelper';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { getBooleanProperty, getNumberProperty } from '@/helpers/pageComponentPropertyHelper';
import { CardLayout, CardProps, CardType } from '@/models/types/card';
import { ComponentProps, EditorialModuleProps } from '@/models/types/components';
import { getSelection } from '@/services/forgeDistributionService';
import { translate } from '@/services/translationService';
import { transformations } from '@/utilities/cloudinaryTransformations';
import { formatDate } from '@/utilities/dateFormatter';
import { parseFieldValue } from '@/utilities/fieldValueParser';
import { DistributionEntity } from '@/models/types/forge';

const HeroStatic = async ({ data }: { data: ComponentProps }) => {
  const { selectionSlug, skip, limit, headerTitle, headerTitleHeadingLevel, hideHeaderTitle, ctaTitle, ctaLink } =
    data.properties as EditorialModuleProps;

  if (moduleIsNotValid(data, ['selectionSlug'])) {
    return null;
  }

  const maxItemLimit = 4;
  let itemsLimit = getNumberProperty(limit, maxItemLimit);
  itemsLimit = itemsLimit <= maxItemLimit ? itemsLimit : maxItemLimit;

  const selection = await getSelection(selectionSlug, {
    hasLinkRules: true,
    variables: data.variables,
  });
  const items = getFilteredItems(selection?.items, getNumberProperty(skip, 0), itemsLimit);

  if (!items?.length) {
    return null;
  }

  const mainHero = items[0];

  const cardType = CardType.Media;
  const cardLayout = CardLayout.Landscape;
  const cardDesign = getCardSettings(cardType, { hideSummary: true }, cardLayout, 'hero__cards');

  return (
    <div className={`${styles.hero} mb-6 lg:mb-10`}>
      <HeaderTitle
        headerTitle={headerTitle}
        headerTitleHeadingLevel={headerTitleHeadingLevel}
        hideHeaderTitle={getBooleanProperty(hideHeaderTitle)}
      />
      <div className="hero grid">
        <a
          href={mainHero.url}
          aria-label={mainHero.title}
          className="hero__image relative after:content-[''] after:absolute after:inset-0 after:bg-gradient-to-t after:from-black lg:after:right-1/2 lg:after:bg-gradient-to-r"
        >
          <Picture
            transformations={transformations.hero_static_main_item}
            className="w-full h-full object-cover"
            src={mainHero?.thumbnail?.templateUrl ?? ''}
            alt={mainHero?.title}
            priority={true}
            imageStyle={{
              width: '100vw',
              height: '100%',
            }}
          />
        </a>
        <div className="hero__main container flex flex-col items-start justify-end mb-40 sm:mb-60 lg:mb-14 xl:mb-32 2xl:mb-40 pb-6 sm:pb-16 lg:pb-10 2xl:pb-28 z-0 pointer-events-none">
          <div className="flex flex-col gap-2 lg:gap-6 lg:w-[max(720px,_50%)]">
            <p className="d3-ty-tag-large text-component-module-hero-static-roofline">{mainHero.context?.title}</p>
            <h2 className="d3-ty-heading-1 text-component-module-hero-static-title line-clamp-3">{mainHero.title}</h2>
            <p className="d3-ty-tag-large text-component-module-hero-static-date">
              {formatDate(mainHero.contentDate, 'DD MMM YYYY')}
            </p>
          </div>
        </div>
        {items.length > 1 && (
          <div className="hero__list container flex flex-col lg:flex-row gap-6 -mt-40 sm:-mt-60 lg:-mt-14 xl:-mt-32 2xl:-mt-40">
            {items.slice(1, items.length).map((el: DistributionEntity, index: number) => {
              const cardProps = {
                entity: el,
                cardDesign,
              } as CardProps;
              return (
                <div
                  className="basis-1/3"
                  key={index}
                >
                  {renderCard(cardProps)}
                </div>
              );
            })}
          </div>
        )}
      </div>
      {ctaTitle && ctaLink ? (
        <div className="container text-center mt-6 lg:mt-10">
          <CallToAction
            url={parseFieldValue(ctaLink, data.variables)}
            text={translate(ctaTitle)}
            style="primary"
          />
        </div>
      ) : null}
    </div>
  );
};
export default HeroStatic;
