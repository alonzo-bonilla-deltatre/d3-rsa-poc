import { FieldProps } from '@/models/types/components/commons/form';

const FormDivider = ({ field }: FieldProps) => {
  if (!field) return null;
  return <label className="block mt-12 mb-2 lg:mb-4 d3-ty-sec-navigation text-greyscale-grey">{field.label}</label>;
};

export default FormDivider;
