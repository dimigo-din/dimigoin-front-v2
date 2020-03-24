import React from 'react';
import { Link } from 'react-router-dom';

const Circle = () => (
  <Link
    to={{
      pathname: '/request/circle/application',
      state: { circleId: '5e79c1e62f54140f4fa37bcb' },
    }}
  >
      dd
  </Link>
);

export default Circle;
