'use client';

import Picture from '@/components/common/Picture';
import { DistributionEntity } from '@/models/types/dapi';
import { AccessibleLink, GrandPrixFields } from '@/models/types/dapi.customEntityFields';
import { GraphicAssetsDashboardItem } from '@/models/types/gad';
import { transformations } from '@/utilities/cloudinaryTransformations';
import { getEventDayString, getEventMonthString } from '@/components/modules/Calendar/CalendarHelpers';
import CountDownClock from '@/components/modules/Calendar/CountDownClock';
import GadAsset from '@/components/common/GadAsset';

type ModuleProps = {
  entity: DistributionEntity;
  key: string;
  className: string;
  clockAsset?: GraphicAssetsDashboardItem;
};

const renderLink = (link: AccessibleLink, className: string) => {
  return (
    <a
      rel={link.openInNewTab ? 'noopener' : ''}
      target={link.openInNewTab ? 'blank' : 'self'}
      href={link.url}
      className={className}
    >
      {link.displayText}
    </a>
  );
};

const CalendarItemExpanded = ({ ...data }: ModuleProps) => {
  const fields = data.entity.fields as GrandPrixFields;
  const eventDate = new Date(fields.dateFrom);
  const ctaClasses = 'inline-block text-white bg-[#252525] font-bold uppercase px-8 py-2 rounded-full';

  return (
    <div className={`${data.className} flex flex-col justify-center text-center`}>
      <span className="text-4xl font-black uppercase leading-none">{data.entity.title}</span>
      <span className="text-lg font-light text-[#BEBEBE]">{`${fields.circuit} - ${fields.city}, ${fields.country}`}</span>
      <span className="pt-6 text-lg">
        {`${getEventMonthString(fields.dateFrom)} ${getEventDayString(fields.dateFrom)} - ${getEventDayString(
          fields.dateTo
        )} ${eventDate.getFullYear()}`}
      </span>
      <div className="mt-4 min-h-[110px] flex flex-col justify-center relative">
        {data.clockAsset?.assetThumbnailUrl?.length && (
          <GadAsset
            className="absolute left-10 top-[-16px]"
            src={data.clockAsset.assetUrl}
            title=""
            width={110}
            height={100}
            transformations={transformations.logos}
          />
        )}
        <CountDownClock
          deadline={fields.dateFrom}
          className="mx-auto"
        />
      </div>
      {(fields.enableTickets || fields.enableDetails) && (
        <div className="mt-8">
          <ul className="list-none flex space-x-5 justify-center">
            {fields.enableTickets && fields.buyTicket.url && <li>{renderLink(fields.buyTicket, ctaClasses)}</li>}
            {fields.enableDetails && fields.eventDetails.url && <li>{renderLink(fields.eventDetails, ctaClasses)}</li>}
          </ul>
        </div>
      )}
    </div>
  );
};
export default CalendarItemExpanded;
