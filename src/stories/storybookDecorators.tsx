import { Decorator } from '@storybook/react';
import React from 'react';

export const withBaseDecorator: Decorator = (Story) => (
  <div className="container mx-auto py-12">
    <Story />
  </div>
);
export const withStoryPartDecorator: Decorator = (Story) => (
  <div className="container mx-auto py-12">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Story />
    </div>
  </div>
);
