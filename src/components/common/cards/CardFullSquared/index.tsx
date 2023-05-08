import { CardProps } from '@/models/types/card';
import Title from '@/components/common/Title';
import Date from '@/components/common/Date';
import Author from '@/components/common/Author';
import CallToAction from '@/components/common/CallToAction';
import Roofline from '@/components/common/Roofline';
import CardIcon from '@/components/common/CardIcon';
import Picture from '@/components/common/Picture';
import { transformations } from '@/utilities/cloudinaryTransformations';

const CardFullSquared = ({ ...props }: CardProps) => {
  const entity = props.entity;
  const options = props.options;
  const entityImage = entity.thumbnail;
  const cardClassName = `grid ${options.className}`;
  const cardInfoClassName = 'p-5 col-start-1 row-start-1 flex justify-end flex-col z-10';

  const imgTrasformation = transformations.mosaicSquareThumbnail;

  return (
    entity && (
      <div className={cardClassName}>
        {entityImage != null && (
          <figure className="col-start-1 row-start-1">
            <Picture
              src={entityImage.templateUrl}
              className="w-full h-full object-cover"
              transformations={imgTrasformation}
              alt={entity.title}
            />
          </figure>
        )}

        <div className={cardInfoClassName}>
          <>
            <CardIcon
              entityCode={entity.entityCode}
              hide={options.hideIcon}
            ></CardIcon>
            <Roofline
              context={entity.context}
              hide={options.hideRoofline}
              icon={null}
              asset={null}
            ></Roofline>
            <Title
              title={entity.title}
              heading={null}
              hide={options.hideTitle}
            ></Title>
            <Date
              date={entity.contentDate}
              format={null}
              hide={options.hideDate}
            ></Date>
            <Author
              author={entity.createdBy}
              hide={options.hideAuthor}
            ></Author>
            <CallToAction
              url={'#nolink'}
              text={''}
              isExternal={false}
              style={''}
              icon={''}
              hide={options.hideCta}
            ></CallToAction>
            {/* //TODO: add card link */}
          </>
        </div>
      </div>
    )
  );
};

export default CardFullSquared;
