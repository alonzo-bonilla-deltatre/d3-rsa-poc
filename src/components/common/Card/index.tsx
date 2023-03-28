import { CardOptions, DistributionEntity } from "@/models/types/dapi";
import Picture from "../Picture";
import { transformations } from "@/utilities/cloudinaryTransformations";
import CardTitle from "../CardTitle";
import CardDate from "../CardDate";
import CardAuthor from "../CardAuthor";
import CardCta from "../CardCta";
import CardRoofline from "../CardRoofline";
import CardIcon from "../CardIcon";

type CardProps = {
  entity: DistributionEntity;
  options: CardOptions;
};


const Card = ({ ...props }: CardProps) => {
  const entity = props.entity;
  const options = props.options;
  return entity && (
    <><div>
      {entity.thumbnail && (

        <figure className="col-start-1 row-start-1">
          <Picture
            className="w-full h-full object-cover"
            src={entity.thumbnail.templateUrl}
            transformations={transformations.thumbnailGridItem}
            width={416}
            height={234}
            alt={entity.thumbnail.title ?? ""}
          />
        </figure>

      )}

      <div className="py-5 w-4/6">
        <>
          <CardIcon entityCode={entity.entityCode} hide={options.hideIcon}></CardIcon>
          <CardRoofline context={entity.context} hide={options.hideRoofline}></CardRoofline>
          <CardTitle title={entity.title} heading={null} hide={options.hideTitle}></CardTitle>
          <CardDate date={entity.contentDate} format={null} hide={options.hideDate}></CardDate>
          <CardAuthor author={entity.createdBy} hide={options.hideAuthor}></CardAuthor>
          <CardCta url={"#nolink"} text={""} isExternal={false} style={""} icon={""} hide={options.hideCta}></CardCta>
          {/* //TODO: add card link */}
        </>
      </div>
    </div>
    </>
  );
};

export default Card;
