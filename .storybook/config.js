import { configure } from '@storybook/react';
import requestContext from 'require-context.macro';

const req = requestContext('../src/components', true, /\.stories\.js$/);

function loadStories() {
  req.keys().forEach((filename) => req(filename));
}

configure(loadStories, module);
