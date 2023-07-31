import { ComponentProps } from '@/models/types/components';
import { nanoid } from 'nanoid';
import HtmlContent from '@/components/modules/HtmlContent/HtmlContent';

const HtmlContentWrapper = ({ ...data }: ComponentProps): React.ReactElement => {
  return <HtmlContent {...data} />;
};

const render = ({ ...data }: ComponentProps): React.ReactElement =>
  data ? (
    <HtmlContentWrapper
      key={nanoid()}
      {...data}
    />
  ) : (
    <></>
  );

export default render;
