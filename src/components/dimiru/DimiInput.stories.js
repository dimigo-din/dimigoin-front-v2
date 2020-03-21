import React from 'react';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import DimiInput from './DimiInput';

export default {
  title: 'components|basic/DimiInput',
  component: DimiInput,
  decorators: [withKnobs],
};

export const dimiinput = () => {
  const error = boolean('error', false);
  const type = text('type', 'text');
  const placeholder = text('placeholder', '');
  const value = text('value', '');

  return <DimiInput error={error} type={type} placeholder={placeholder} value={value} />;
};
dimiinput.story = {
  name: 'Default',
};
