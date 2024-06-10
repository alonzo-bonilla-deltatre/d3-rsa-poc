'use client';
import { formatDate, getDay, getMonth, getYear } from '@/helpers/dateHelper';
import useTranslate from '@/hooks/useTranslate';
import { TermType } from '@/models/types/translations';
import { DateType } from '@/models/types/date';
import { isRtlSiteDirection } from '@/helpers/pageHelper';
import { useEnvVars } from '@/hooks/useEnvVars';

type DateProps = {
  date?: string;
  dateType?: DateType;
};

const Date = ({ date, dateType }: DateProps) => {
  const translate = useTranslate();
  const envVars = useEnvVars();
  const isRtlSiteDir = isRtlSiteDirection(envVars.LANGUAGE ?? '');
  let translatedDate: string | null = ``;
  if (!date) {
    return null;
  }
  switch (dateType) {
    case DateType.day:
      translatedDate = getDay(date);
      break;
    case DateType.shortMonth:
      translatedDate = translate(getMonth(date)?.toLowerCase() ?? '', TermType.short);
      break;
    case DateType.month:
      translatedDate = translate(getMonth(date)?.toLowerCase() ?? '');
      break;
    case DateType.year:
      translatedDate = getYear(date);
      break;
    case DateType.short:
      translatedDate = !isRtlSiteDir
        ? formatDate(date, 'DD MMM, YYYY')
        : `${translate(getMonth(date)?.toLowerCase() ?? '', TermType.short)} ${getYear(date)} ${getDay(date)}`;
      break;
    case DateType.standard:
      translatedDate = !isRtlSiteDir
        ? formatDate(date, 'DD MMMM YYYY')
        : `${translate(getMonth(date)?.toLowerCase() ?? '')} ${getYear(date)} ${getDay(date)}`;
      break;
    default:
      translatedDate = !isRtlSiteDir
        ? formatDate(date, 'DD MMMM YYYY')
        : `${translate(getMonth(date)?.toLowerCase() ?? '')} ${getYear(date)} ${getDay(date)}`;
      break;
  }
  if (!translatedDate) {
    return null;
  }
  return (
    <time
      suppressHydrationWarning
      dateTime={date}
    >
      {translatedDate}
    </time>
  );
};

export default Date;
