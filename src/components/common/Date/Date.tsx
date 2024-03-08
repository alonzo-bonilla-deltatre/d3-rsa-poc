'use client';

import { formatDate, getDay, getMonth, getYear } from '@/utilities/dateFormatter';
import { isRtlSiteDirection } from '@/utilities/direction';
import useTranslate from '@/hooks/useTranslate';

type DateProps = {
  date?: string;
  hide?: boolean;
  className?: string;
};

const Date = ({ date, hide, className }: DateProps) => {
  const translate = useTranslate();
  if (hide || !date) {
    return null;
  }
  const isRtlSiteDir = isRtlSiteDirection(process.env.LANGUAGE ?? '');
  let translatedDate = formatDate(date, 'DD MMM, YYYY');
  if (isRtlSiteDir) {
    translatedDate = `${translate(getMonth(date)?.toLowerCase() ?? '')} ${getYear(date)} ${getDay(date)}`;
  }
  return (
    <time
      suppressHydrationWarning
      dateTime={date}
      className={`${className}`}
    >
      {translatedDate}
    </time>
  );
};

export default Date;
