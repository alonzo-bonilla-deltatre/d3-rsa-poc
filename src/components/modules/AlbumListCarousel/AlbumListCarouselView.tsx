import CarouselAlbum from '@/components/commons/list/CarouselAlbum/CarouselAlbum';
import { DistributionEntity } from '@/models/types/forge';
import 'swiper/swiper-bundle.css';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';
import Typography, { TypographyProps } from '@/components/commons/Typography/Typography';
import TranslatedLabel from '@/components/commons/TranslatedLabel/TranslatedLabel';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { twMerge } from 'tailwind-merge';

type AlbumListCarouselViewProps = {
  items: DistributionEntity[];
  isFullWidth?: boolean;
  uniqueId: string;
  headerTitle?: string;
  headerTitleHeadingLevel?: string;
  hideHeaderTitle?: boolean;
};

const AlbumListCarouselView = ({
  items,
  isFullWidth,
  uniqueId,
  headerTitle,
  headerTitleHeadingLevel,
  hideHeaderTitle,
}: AlbumListCarouselViewProps) => {
  return (
    <ModuleContainer
      isFullWidth={isFullWidth}
      className="flex flex-col gap-5 px-2 lg:gap-10"
    >
      <Typography
        variant={(headerTitleHeadingLevel as TypographyProps['variant']) ?? 'h2'}
        className={twMerge('container mx-auto', getBooleanProperty(hideHeaderTitle) ? 'hidden' : '')}
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
