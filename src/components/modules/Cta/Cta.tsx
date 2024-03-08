import { ComponentProps, ModuleProps } from '@/models/types/components';
import CallToAction from '@/components/common/CallToAction/CallToAction';
import { getHideModule } from '@/helpers/pageComponentPropertyHelper';
import { translate } from '@/services/translationService';
import { parseFieldValue } from '@/utilities/fieldValueParser';

type CtaProps = {
  ctaStyle?: string;
} & ModuleProps;

const Cta = ({ data }: { data: ComponentProps }) => {
  const { ctaLink, ctaTitle, ctaStyle } = data.properties as CtaProps;
  if (getHideModule(data)) return null;

  return (
    <div className="flex">
      <CallToAction
        url={parseFieldValue(ctaLink, data.variables)}
        text={translate(ctaTitle)}
        isExternal={false}
        style={ctaStyle === 'outlined' ? 'primary-outlined' : 'primary'}
        hide={false}
        className="mx-auto"
      ></CallToAction>
    </div>
  );
};
export default Cta;
