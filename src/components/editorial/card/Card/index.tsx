import { CardOptions, DistributionEntity } from "@/models/types/dapi";
import { transformations } from "@/utilities/cloudinaryTransformations";
import CardTitle from "@/components/editorial/card/CardTitle";
import CardDate from "@/components/editorial/card/CardDate";
import CardAuthor from "@/components/editorial/card/CardAuthor";
import CardCta from "@/components/editorial/card/CardCta";
import CardRoofline from "@/components/editorial/card/CardRoofline";
import CardIcon from "@/components/editorial/card/CardIcon";
import { getImageOrPlaceholder } from "@/services/gadService";
import Picture from "@/components/common/Picture";


type CardProps = {
  entity: DistributionEntity;
  options: CardOptions;
};


const Card = async ({ ...props }: CardProps) => {
  const entity = props.entity;
  const options = props.options

  // const getImageOrPlaceholderFetch = getImageOrPlaceholder(entity.thumbnail, "");
  // const [entityImage] = await Promise.all([getImageOrPlaceholderFetch]);
  const entityImage = entity.thumbnail;
  return entity && (
    <><div>
      {entityImage != null && (

        <figure className="col-start-1 row-start-1">
          <Picture
            src={entityImage.templateUrl}
            className="w-full h-full object-cover"
            transformations={transformations.thumbnailGridItem}
            width={416}
            height={234} alt={entity.title}          />
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
