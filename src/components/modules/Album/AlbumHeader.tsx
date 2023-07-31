import Author from '@/components/common/Author/Author';
import Roofline from '@/components/common/Roofline/Roofline';
import Date from '@/components/common/Date/Date';
import { AlbumEntity } from '@/models/types/forge';
import SocialIcons from '@/components/common/SocialIcons/SocialIcons';
import { transform } from '@/helpers/markdownHelper';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import HtmlContent from '@/components/common/HtmlContent/HtmlContent';

type ModuleProps = {
  entity?: AlbumEntity;
  hideAuthor?: boolean;
  hideDate?: boolean;
  hideDescription?: boolean;
  hideRoofline?: boolean;
  hideTitle?: boolean;
  hideSocial?: boolean;
};
const AlbumHeader = async ({ ...props }: ModuleProps) => {
  const albumEntity = props.entity;
  const description = (albumEntity && albumEntity.description) ?? '';
  const descriptionHtml = await transform(description);
  return albumEntity && descriptionHtml ? (
    <section className="w-full container mx-auto">
      <div className="flex justify-between mx-20">
        <header className="w-full">
          <Roofline
            className={'uppercase mr-2 font-bold text-base bg-[#EE3123] p-2 w-fit mb-2'}
            context={albumEntity.context}
            hide={props.hideRoofline}
          ></Roofline>
          {!getBooleanProperty(props.hideTitle) && albumEntity.title && (
            <h3 className="font-bold text-5xl uppercase">{albumEntity.title}</h3>
          )}
          <div className="flex justify-between items-center mt-8">
            <div>
              {!getBooleanProperty(props.hideTitle) && albumEntity.headline && (
                <p className="mb-3">{albumEntity.headline}</p>
              )}
              {!getBooleanProperty(props.hideDescription) && albumEntity.description && (
                <HtmlContent
                  content={descriptionHtml}
                  classNames={'mt-8'}
                />
              )}
              <Author
                author={albumEntity.createdBy}
                hide={props.hideAuthor}
              ></Author>
              <Date
                date={albumEntity.contentDate}
                hide={props.hideDate}
              ></Date>
            </div>
            <div className="flex flex-row items-end col-start-10 row-start-10 mt-8">
              <div>
                {!getBooleanProperty(props.hideSocial) && (
                  <div className="flex flex-row items-end col-start-10 row-start-10 mt-8">
                    <SocialIcons
                      hide={false}
                      size={50}
                      className={'mr-4 cursor-pointer hover:text-[#EE3123] transition duration-300'}
                    ></SocialIcons>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>
      </div>
    </section>
  ) : (
    <></>
  );
};

export default AlbumHeader;
