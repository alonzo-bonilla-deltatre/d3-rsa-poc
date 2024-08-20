'use client';

import useIsMobile from '@/hooks/useIsMobile';
import { DistributionEntity } from '@/models/types/forge';
import { getSrcWithTransformation, transformations } from '@/utilities/cloudinaryTransformationsUtility';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { useEffect, useRef } from 'react';
import { generateMosaicLayout } from '@/components/commons/MosaicView/MosaicViewHelper';
import { GridImage, MosaicPatternItem } from '@/components/commons/MosaicView/types';
import { isRtlSiteDirection } from '@/helpers/pageHelper';
import { useEnvVars } from '@/hooks/useEnvVars';
import Picture from '@/components/commons/Picture/Picture';

type MosaicViewProps = {
  items: DistributionEntity[];
};

const MosaicView = ({ items }: MosaicViewProps) => {
  const { LANGUAGE } = useEnvVars();
  const containerRef = useRef(null);
  const isMobile = useIsMobile(containerRef);
  const gridLayout = generateMosaicLayout(items.length, isMobile);
  const filteredElementsWithSrc = items.filter((i) => i.image && i.image.templateUrl);

  const gridImages = gridLayout.map((layout: MosaicPatternItem, index: number) => {
    if (filteredElementsWithSrc[index]?.image?.templateUrl) {
      return {
        ...layout,
        src: filteredElementsWithSrc[index].image?.templateUrl,
        title: filteredElementsWithSrc[index].image?.title,
      };
    }
    return layout;
  });

  useEffect(() => {
    Fancybox.bind('[data-fancybox]', {
      animated: false,
      Thumbs: false,
      Toolbar: {
        display: {
          left: [isRtlSiteDirection(LANGUAGE) ? 'close' : ''],
          middle: [],
          right: [!isRtlSiteDirection(LANGUAGE) ? 'close' : ''],
        },
      },
      backdropClick: false,
      Images: {
        initialSize: 'cover',
        content: (_ref, slide) => {
          let rez = '<picture>';

          const media = slide.media?.split(';');
          slide.sources?.split(';').map((source, index) => {
            rez += `<source
              media="${media ? media[index] : ''}"
              srcset="${source}"
            />`;
          });

          // @ts-ignore
          rez += `<img src="${slide.src}" alt="${slide.title}" class="max-w-none w-full h-full object-cover block object-top"/>`;

          rez += '</picture>';

          return rez;
        },
      },
      wheel: false,
      on: {
        loaded: (_instance, slide) => {
          if (slide) {
            /* Workaround because it doesn't come out of the box from the library */
            const image = document.querySelector(`.fancybox-image[src="${slide.src}"]`);
            if (image) image.setAttribute('title', slide.title);
          }
        },
      },
    });
  }, [LANGUAGE]);

  const handleGalleryShow = (event: { preventDefault: () => void }) => {
    event?.preventDefault();
  };
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-0.5 w-full mt-5 ">
      {gridImages.map((image: GridImage, index: number) => (
        <div
          key={index}
          className={`${image.col} ${image.row}`}
          ref={containerRef}
        >
          {!!image.src && (
            <a
              href={getSrcWithTransformation(image?.src, transformations.fancy_box_detail.desktop.transformation)}
              data-fancybox="gallery"
              data-caption={items[index]?.fields?.description || items[index].title}
              onClick={handleGalleryShow}
              data-title={items[index].title}
              data-height="100%"
              data-media="(max-width: 40em);(max-width: 64em)"
              data-sources={`${getSrcWithTransformation(image?.src, transformations.fancy_box_detail.mobile.transformation)};
                ${getSrcWithTransformation(image?.src, transformations.fancy_box_detail.tablet.transformation)}`}
              className="w-full h-full"
            >
              <figure className="block overflow-hidden w-full h-full">
                <Picture
                  src={image.src}
                  alt={image.title || ''}
                  className="w-full h-full object-cover block object-center hover:scale-110 transition duration-300 cursor-pointer"
                  transformations={image.transformation ?? transformations.thumbnail_landscape_detail}
                  imageStyle={{
                    height: '100%',
                  }}
                />
              </figure>
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default MosaicView;
