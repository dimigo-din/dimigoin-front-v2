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
  const errorMessage = text('errorMessage', '');
  const type = text('type', 'text');
  const placeholder = text('placeholder', '');
  const value = text('value', '');

  return (
    <DimiInput
      error={error}
      errorMessage={errorMessage}
      type={type}
      placeholder={placeholder}
      value={value}
    />
  );
};
dimiinput.story = {
  name: 'Default',
};
