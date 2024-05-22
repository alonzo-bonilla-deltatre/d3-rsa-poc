import { StoryPart } from '@/models/types/storyPart';
import { ReturnComponentRender } from '@/models/types/components';
import { nanoid } from 'nanoid';
import Promo from '@/components/storyParts/Promo/Promo';

const PromoWrapper = ({ data }: { data: StoryPart }): ReturnComponentRender => <Promo entity={data} />;

const render = ({ ...data }: StoryPart): ReturnComponentRender => (
  <PromoWrapper
    key={nanoid()}
    data={data}
  />
);

export default render;
