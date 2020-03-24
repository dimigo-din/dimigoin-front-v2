/* eslint-disable no-nested-ternary */
import * as React from 'react';

import ContentWrapper from '../../components/ContentWrapper';
import Dimigoincon from '../../components/Dimigoincon';
import DimiCard from '../../components/dimiru/DimiCard';

const CircleCreation: React.FC = () => {
  return (
    <ContentWrapper
      header={(
        <h1>
          <Dimigoincon icon="edit" />
          동아리 개설 신청
        </h1>
      )}
    >
      <DimiCard />
    </ContentWrapper>
  );
};

export default CircleCreation;
