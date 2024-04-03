import { formatDate } from '@/helpers/dateHelper';

type CompProps = {
  dateFrom?: string;
};

const EventRibbon = ({ dateFrom }: CompProps) => {
  if (!dateFrom) return null;

  const dateFromDay = formatDate(dateFrom, 'DD');
  const dateFromMonth = formatDate(dateFrom, 'MMM');
  return (
    <div className="card__featDate flex flex-col justify-items-center center">
      <span className="d3-ty-caption-large text-center">{dateFromDay}</span>
      <span className="d3-ty-caption uppercase text-center -mt-1">{dateFromMonth}</span>
    </div>
  );
};

export default EventRibbon;
