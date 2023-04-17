import type { Preview } from "@storybook/react";
import { Poppins } from "@next/font/google"
import "@/app/globals.css";
import {INITIAL_VIEWPORTS} from "@storybook/addon-viewport"

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    viewport:{
      viewports: INITIAL_VIEWPORTS
    }
  },
};

export default preview;
