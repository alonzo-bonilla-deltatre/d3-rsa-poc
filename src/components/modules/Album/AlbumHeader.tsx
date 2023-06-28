import Author from '@/components/common/Author';
import Roofline from '@/components/common/Roofline';
import Date from '@/components/common/Date';
import { AlbumEntity } from '@/models/types/forge';
import SocialIcons from '@/components/common/SocialIcons';
import { transform } from '@/helpers/markdownHelper';

type ModuleProps = {
  entity: AlbumEntity;
  hideAuthor: boolean;
  hideDate: boolean;
  hideDescription: boolean;
  hideRoofline: boolean;
  hideTitle: boolean;
  hideSocial: boolean;
};
const AlbumHeader = async ({ ...props }: ModuleProps) => {
  const albumEntity = props.entity;
  const description = (albumEntity && albumEntity.description) ?? '';
  const descriptionHtml = await transform(description);
  return albumEntity ? (
    <section className="w-full container mx-auto">
      <div className="flex justify-between mx-20">
        <header className="w-full">
          <Roofline
            className={'uppercase mr-2 font-bold text-base bg-[#EE3123] p-2 w-fit mb-2'}
            context={albumEntity.context}
            hide={props.hideRoofline}
          ></Roofline>
          {props.hideTitle.toString() === 'false' && albumEntity.title && (
            <h3 className="font-bold text-5xl uppercase">{albumEntity.title}</h3>
          )}
          <div className="flex justify-between items-center mt-8">
            <div>
              {props.hideTitle.toString() === 'false' && albumEntity.headline && (
                <p className="mb-3">{albumEntity.headline}</p>
              )}
              {props.hideDescription.toString() === 'false' && albumEntity.description && (
                <p
                  className="mt-8"
                  dangerouslySetInnerHTML={{ __html: descriptionHtml }}
                ></p>
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
                {props.hideSocial.toString() === 'false' && (
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
