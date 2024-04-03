import SectionWithHeader from '@/components/commons/SectionWithHeader/SectionWithHeader';
import FormView from '@/components/modules/Form/FormView';
import { moduleIsNotValid } from '@/helpers/moduleHelper';
import { getBooleanProperty } from '@/helpers/pageComponentPropertyHelper';
import { ComponentProps, ModuleProps } from '@/models/types/components';
import { DistributionEntity, ForgeDapiEntityCode } from '@/models/types/forge';
import { getEntity } from '@/services/forgeDistributionService';
import { getFormEntity } from '@/services/formService';

type FormProps = {
  slug?: string;
} & ModuleProps;

const Form = async ({ data }: { data: ComponentProps }) => {
  const { isFullWidth, headerTitle, headerTitleHeadingLevel, hideHeaderTitle, slug } = data.properties as FormProps;

  if (moduleIsNotValid(data, ['slug'])) return null;

  const formEntity: DistributionEntity | null = await getEntity(ForgeDapiEntityCode.forms, slug, {
    variables: data.variables,
  });
  const formData = formEntity ? await getFormEntity(formEntity) : null;

  if (!formEntity || !formData) return null;

  return (
    <SectionWithHeader
      data={{
        headerTitle: headerTitle,
        headerTitleHeadingLevel: headerTitleHeadingLevel,
        hideHeaderTitle: getBooleanProperty(hideHeaderTitle),
        hasFullWidthHeader: isFullWidth,
        hasFullWidthContent: isFullWidth,
        sectionClassName: `d3-form ${isFullWidth ? '-full-width' : ''}`,
        children: (
          <FormView
            entity={formEntity}
            formData={formData}
            siteKey={process.env.RECAPTCHA_SITE_KEY}
            className="form"
          ></FormView>
        ),
      }}
    />
  );
};

export default Form;
