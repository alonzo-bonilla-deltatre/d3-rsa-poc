import CallToAction from '@/components/commons/CallToAction/CallToAction';
import { getCardSettings } from '@/components/commons/cards/Card/CardHelpers';
import renderCard from '@/components/commons/cards/Card/CardWrapper';
import { CardLayout, CardProps, CardType } from '@/models/types/card';
import { DistributionEntity } from '@/models/types/forge';

type AlbumListViewProps = {
  headerTitleHeadingLevel?: string;
  entityList: DistributionEntity[];
  isLoadMoreDisplayed: boolean;
  handleLoadMore: () => void;
};

const AlbumListView = ({ entityList, isLoadMoreDisplayed, handleLoadMore }: AlbumListViewProps) => {
  const cardType = CardType.AlbumList;
  const cardLayout = CardLayout.VerticalFull;
  const cardDesign = getCardSettings(cardType, null, cardLayout, 'even:translate-y-14 lg:even:translate-y-20');
  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-6 pb-14 lg:pb-20">
        {entityList?.map((el: DistributionEntity, index: number) => {
          const cardProps = {
            entity: el,
            cardDesign,
          } as CardProps;
          return <div key={index}>{renderCard(cardProps)}</div>;
        })}
      </div>
      <div className="flex mt-4">
        <CallToAction
          text="load-more"
          onClick={handleLoadMore}
          hide={!isLoadMoreDisplayed}
          style="primary"
          className="flex m-auto"
        />
      </div>
    </>
  );
};

export default AlbumListView;
