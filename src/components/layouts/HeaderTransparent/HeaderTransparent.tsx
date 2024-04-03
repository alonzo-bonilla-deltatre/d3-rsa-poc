import CommonHeader from '@/components/commons/CommonHeader/CommonHeader';
import { getHideLayout } from '@/helpers/pageComponentPropertyHelper';
import { ComponentProps } from '@/models/types/components';

const HeaderTransparent = ({ data }: { data: ComponentProps }) => {
  if (getHideLayout(data)) {
    return null;
  }

  const commonHeaderData = { ...data, isTransparent: true };

  return <CommonHeader data={commonHeaderData}></CommonHeader>;
};

export default HeaderTransparent;
