import { ComponentProps } from '@/models/types/components';
import { Adv as AdvComponent } from '@/components/common/Adv/Adv';

type AdvProps = {
  type: string;
};

const Adv = ({ data }: { data: ComponentProps }) => {
  const { type } = data.properties as AdvProps;
  return <AdvComponent type={type}></AdvComponent>;
};

export default Adv;
