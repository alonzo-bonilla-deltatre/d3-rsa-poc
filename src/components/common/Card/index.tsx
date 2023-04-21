import { CardOptions, DistributionEntity } from "@/models/types/dapi";
import { transformations } from "@/utilities/cloudinaryTransformations";
import Title from "@/components/common/Title";
import Date from "@/components/common/Date";
import Author from "@/components/common/Author";
import CallToAction from "@/components/common/CallToAction";
import Roofline from "@/components/common/Roofline";
import CardIcon from "@/components/common/CardIcon";
import Picture from "@/components/common/Picture";

export type CardProps = {
  entity: DistributionEntity;
  options: CardOptions;
};

const Card = ({ ...props }: CardProps) => {
  const entity = props.entity;
  const options = props.options

  const entityImage = entity.thumbnail;
  return entity && (
    <><div>
      {entityImage != null && (

        <figure className="col-start-1 row-start-1">
          <Picture
            src={entityImage.templateUrl}
            className="w-full h-full object-cover"
            transformations={transformations.thumbnailGridItem}
            alt={entity.title} />
        </figure>

      )}

      <div className="py-5 w-4/6">
        <>
          <CardIcon entityCode={entity.entityCode} hide={options.hideIcon}></CardIcon>
          <Roofline context={entity.context} hide={options.hideRoofline}></Roofline>
          <Title title={entity.title} heading={null} hide={options.hideTitle}></Title>
          <Date date={entity.contentDate} format={null} hide={options.hideDate}></Date>
          <Author author={entity.createdBy} hide={options.hideAuthor}></Author>
          <CallToAction url={"#nolink"} text={""} isExternal={false} style={""} icon={""} hide={options.hideCta}></CallToAction>
          {/* //TODO: add card link */}
        </>
      </div>
    </div>
    </>
  );
};

export default Card;
