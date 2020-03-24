import React from 'react';
import { withKnobs } from '@storybook/addon-knobs';
import DimiLoading from './DimiLoading';

export default {
  title: 'components|basic/DimiLoading',
  component: DimiLoading,
  decorators: [withKnobs],
};

export const dimiloading = () => <DimiLoading />;

dimiloading.story = {
  name: 'Default',
};
