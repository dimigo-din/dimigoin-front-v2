import React from 'react';
import { withKnobs, text, number } from '@storybook/addon-knobs';
import DimiLoading from './DimiLoading';

export default {
  title: 'components|basic/DimiLoading',
  component: DimiLoading,
  decorators: [withKnobs],
};

export const dimiloading = () => {
  return (
    <DimiLoading />
  );
};

dimiloading.story = {
  name: 'Default',
};
