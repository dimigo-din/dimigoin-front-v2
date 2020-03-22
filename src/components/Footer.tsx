import React from 'react';

import Dimigoincon from './Dimigoincon';
import DimiFooter from './dimiru/DimiFooter';

const Copyright = () => (
  <a href="https://jnjcomu.github.io/landing">
    © 2020 JnJ Communications
  </a>
);

const Mail = () => (
  <a href="mailto:contact@dimigo.in">
    <Dimigoincon icon="email" />
    {' '}
    contact@dimigo.in
  </a>
);

const Facebook = () => (
  <a href="https://fb.com/isdimigoin">
    <Dimigoincon icon="facebook-sm" />
    {' '}
    fb.com/isdimigoin
  </a>
);

const Footer = () => (
  <footer>
    <DimiFooter
      copyright={<Copyright />}
      mail={<Mail />}
      facebook={<Facebook />}
    />
  </footer>
);

export default Footer;
