import { ComponentProps } from '@/models/types/components';
import CommonHeader from '@/components/commons/Header/Header';
import { getHideLayout } from '@/helpers/pageComponentPropertyHelper';

const Header = ({ data }: { data: ComponentProps }) => {
  if (getHideLayout(data)) {
    return null;
  }

  return <CommonHeader data={data}></CommonHeader>;
};

export default Header;
