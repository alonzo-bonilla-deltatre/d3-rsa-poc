import Card from '@/components/common/cards/Card/Card';
import { getCardSettings } from '@/components/common/cards/Card/CardHelpers';
import { CardLayout, CardOptions, CardType } from '@/models/types/card';
import { DistributionEntity } from '@/models/types/forge';

const EditorialEntity = ({ data }: { data: DistributionEntity }) => {
  if (!data) return null;
  const cardOptions = {
    hideAuthor: true,
  } as CardOptions;
  const cardType = CardType.Media;
  const cardLayout = CardLayout.Landscape;
  const cardDesign = getCardSettings(cardType, cardOptions, cardLayout);

  return (
    <Card
      data={{
        entity: data,
        cardDesign: cardDesign,
      }}
    />
  );
};

export default EditorialEntity;
