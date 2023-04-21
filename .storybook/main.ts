import type { StorybookConfig } from "@storybook/nextjs";
const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y"
  ],
  staticDirs: ['../public','../src/__mocks__'],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  webpackFinal: async (config) => {
    const updatedConfig = {
      output: {
        path: './storybook',
        filename: '/storybook/[name].[hash].bundle.js',
        publicPath: '/storybook/',
      },
      ...config,
    };

    return updatedConfig;
  },
};
export default config;
