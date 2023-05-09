import { CardProps } from '@/models/types/card';
import Title from '@/components/common/Title';
import Date from '@/components/common/Date';
import Author from '@/components/common/Author';
import CallToAction from '@/components/common/CallToAction';
import Roofline from '@/components/common/Roofline';
import CardIcon from '@/components/common/CardIcon';
import Picture from '@/components/common/Picture';
import { transformations } from '@/utilities/cloudinaryTransformations';

const CardDefault = ({ ...props }: CardProps) => {
  const entity = props.entity;
  const options = props.options;
  const entityImage = entity.thumbnail;
  const cardClassName = options.className;
  const cardInfoClassName = 'py-5 w-4/6';
  const imgTrasformation = transformations.thumbnailGridItem;

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
            ></Roofline>
            <Title
              title={entity.title}
              hide={options.hideTitle}
            ></Title>
            <Date
              date={entity.contentDate}
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
              hide={options.hideCta}
            ></CallToAction>
            {/* //TODO: add card link */}
          </>
        </div>
      </div>
    )
  );
};

export default CardDefault;
