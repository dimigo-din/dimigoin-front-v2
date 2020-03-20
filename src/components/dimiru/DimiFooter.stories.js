import React from 'react';
import DimiFooter from './DimiFooter';
import { withKnobs, text } from '@storybook/addon-knobs';

export default {
  title: 'components|basic/DimiFooter',
  component: DimiFooter, 
  decorators: [withKnobs]
};

export const dimifooter = () => {
  const copyright = text('copyright', '<Copyright 2020. Author. All Rights Reserved.');
  const email = text('email', 'john@doe.net');
  const facebook = text('facebook', '@john (facebook)')

  return <DimiFooter copyright={copyright} email={email} facebook={facebook} />;
};
dimifooter.story = {
  name: 'Default'
};