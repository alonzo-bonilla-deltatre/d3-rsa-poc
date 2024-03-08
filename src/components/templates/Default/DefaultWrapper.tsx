import { ThemeProvider } from '@/app/theme-provider';
import { getDarkTheme } from '@/helpers/pageComponentPropertyHelper';
import { ComponentProps, ReturnComponentRender } from '@/models/types/components';
import dynamic from 'next/dynamic';
const Default = dynamic(() => import('@/components/templates/Default/Default'));

const DefaultWrapper = ({ data }: { data: ComponentProps }) => <Default data={data} />;

const render = ({ data }: { data: ComponentProps }): ReturnComponentRender => {
  if (!data) {
    return null;
  }
  return (
    <ThemeProvider
      attribute="class"
      forcedTheme={getDarkTheme(!!data.properties?.isDark)}
    >
      <DefaultWrapper data={data} />
    </ThemeProvider>
  );
};

export default render;
