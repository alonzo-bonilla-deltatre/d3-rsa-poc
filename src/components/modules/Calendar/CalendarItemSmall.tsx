"use client";

import { DistributionEntity } from "@/models/types/dapi";
import { GrandPrixFields } from "@/models/types/dapi.customEntityFields";
import { getEventDayString, getEventMonthString } from "@/components/modules/Calendar/CalendarHelpers";

type ModuleProps = {
  entity: DistributionEntity;
  key: string;
  className: string;
};

const CalendarItemSmall = ({ ...data }: ModuleProps) => {
  const fields = data.entity.fields as GrandPrixFields;

  return (
    <div
      className={`${data.className} flex flex-col justify-center text-center uppercase`}
    >
      <span className="text-[#BEBEBE] text-lg leading-none font-bold">
        {fields.country}
        <br />
        {fields.city}
      </span>
      <span className="text-5xl font-black mt-3 mb-1">
        {getEventDayString(fields.dateFrom)}
      </span>
      <span className="text-2xl font-light">
        {getEventMonthString(fields.dateFrom)}
      </span>
    </div>
  );
};
export default CalendarItemSmall;
