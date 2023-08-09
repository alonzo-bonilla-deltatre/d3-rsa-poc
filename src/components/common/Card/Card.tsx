import Author from '@/components/common/Author/Author';
import { getContainerClassName, getImageTransformation, getInfoClassName } from '@/components/common/Card/CardHelpers';
import CardIcon from '@/components/common/CardIcon/CardIcon';
import Date from '@/components/common/Date/Date';
import Roofline from '@/components/common/Roofline/Roofline';
import Title from '@/components/common/Title/Title';
import { CardProps } from '@/models/types/card';
import Picture from '@/components/common/Picture/Picture';

const Card = ({ ...props }: CardProps) => {
  const entity = props.entity;
  const options = props.options;
  const layout = props.layout ?? 'default'; // default, fullimage, fullimage-portrait
  const cardClassName = `${getContainerClassName(layout)} ${options.className}`;
  const cardInfoClassName = getInfoClassName(layout);

  const entityImage = entity.image ? entity.image : entity.thumbnail ? entity.thumbnail : entity.coverImage;

  return (
    entity && (
      <>
        <div className={cardClassName}>
          <a
            href={entity.url}
            aria-label={entity.title}
          >
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
                  entityCode={entity.entityCode as string}
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
              </>
            </div>
          </a>
        </div>
      </>
    )
  );
};

export default Card;
