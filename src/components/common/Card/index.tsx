import { DistributionEntity } from "@/models/types/dapi";
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
};


const Card = ({ ...props }: CardProps) => {
  const entity = props.entity;

  return entity && (
    <>
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
        <CardIcon entityCode={entity.entityCode} hide={false}></CardIcon>
        <CardRoofline context={entity.context} hide={false}></CardRoofline>
        <CardTitle title={entity.title} heading={null} hide={false}></CardTitle>
        <CardDate date={entity.contentDate} format={null}  hide={false}></CardDate>
        <CardAuthor author={entity.createdBy} hide={false}></CardAuthor>
        <CardCta url={"#nolink"} text={""} isExternal={false} style={""} icon={""} hide={false}></CardCta>
        
        </>
      </div>
    </>
  );
};

export default Card;
