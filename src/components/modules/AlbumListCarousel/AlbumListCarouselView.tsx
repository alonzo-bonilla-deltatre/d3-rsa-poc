import CarouselAlbum from '@/components/commons/list/Carousel/CarouselAlbum';
import { DistributionEntity } from '@/models/types/forge';
import 'swiper/swiper-bundle.css';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';
import Typography, { TypographyProps } from '@/components/commons/Typography/Typography';
import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';

type AlbumListCarouselViewProps = {
  items: DistributionEntity[];
  uniqueId: string;
  headerTitle?: string;
  headerTitleHeadingLevel?: string;
  hideHeaderTitle?: boolean;
};

const AlbumListCarouselView = ({
  items,
  uniqueId,
  headerTitle,
  headerTitleHeadingLevel,
  hideHeaderTitle,
}: AlbumListCarouselViewProps) => {
  return (
    <ModuleContainer className="px-2 flex flex-col gap-4">
      <Typography
        variant={(headerTitleHeadingLevel as TypographyProps['variant']) ?? 'h2'}
        className={getBooleanProperty(hideHeaderTitle) ? 'hidden' : ''}
      >
        <TranslatedLabel translationTermKey={headerTitle ?? 'gallery'} />
      </Typography>
      <CarouselAlbum
        items={items}
        uniqueId={uniqueId}
      />
    </ModuleContainer>
  );
};

export default AlbumListCarouselView;
