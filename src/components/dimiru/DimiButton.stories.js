import React from 'react';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import DimiButton from './DimiButton';

export default {
  title: 'components|basic/DimiButton',
  component: DimiButton,
  decorators: [withKnobs],
};

export const dimiButton = () => {
  const content = text('content', 'BUTTON');
  const large = boolean('large', false);
  const gray = boolean('gray', false);
  const small = boolean('small', false);
  const active = boolean('active', false);
  return (
    <DimiButton large={large} gray={gray} small={small} active={active}>
      {content}
    </DimiButton>
  );
};
