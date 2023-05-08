import { CardProps } from '@/models/types/card';
import Title from '@/components/common/Title';
import Date from '@/components/common/Date';
import Author from '@/components/common/Author';
import CallToAction from '@/components/common/CallToAction';
import Roofline from '@/components/common/Roofline';
import CardIcon from '@/components/common/CardIcon';
import Picture from '@/components/common/Picture';
import { getContainerClassName, getImageTransformation, getInfoClassName } from '@/components/common/Card/Card.helpers';

const Card = ({ ...props }: CardProps) => {
  const entity = props.entity;
  const options = props.options;
  const layout = props.layout ?? 'default'; // default, fullimage, fullimage-portrait
  const cardClassName = `${getContainerClassName(layout)} ${options.className}`;
  const cardInfoClassName = getInfoClassName(layout);
  const entityImage = entity.thumbnail;

  return (
    entity && (
      <>
        <div className={cardClassName}>
          {entityImage != null && (
            <figure className="col-start-1 row-start-1">
              <Picture
                src={entityImage.templateUrl}
                className="w-full h-full object-cover"
                transformations={getImageTransformation(layout)}
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
      </>
    )
  );
};

export default Card;
