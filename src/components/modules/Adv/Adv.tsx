import { ComponentProps } from '@/models/types/components';
import { Adv as AdvComponent } from '@/components/commons/Adv/Adv';
import ModuleContainer from '@/components/commons/ModuleContainer/ModuleContainer';

type AdvProps = {
  type: string;
};

const Adv = ({ data }: { data: ComponentProps }) => {
  const { type } = data.properties as AdvProps;
  return (
    <ModuleContainer>
      <AdvComponent type={type}></AdvComponent>
    </ModuleContainer>
  );
};

export default Adv;
