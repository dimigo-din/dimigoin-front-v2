import React from 'react';
import styled from '@emotion/styled';

import DimiCard from './dimiru/DimiCard';
import Dimigoincon from './Dimigoincon';

import variables from '../scss/_variables.scss';

const temporaryServices = [
  {
    icon: 'club-lg',
    title: '동아리 관리',
    description: '동아리 정보를 입력하고 수정할 수 있어요.',
    url: '',
    permission: 1,
  },
  {
    icon: 'request',
    title: '동아리 신청',
    description: '동아리 정보를 확인하고 신청하세요.',
    url: '',
    permission: 1,
  },
];

const ServiceCards = () => (
  <Services>
    <ServicesCards>
      {temporaryServices.map(({ icon, title, description }) => (
        <ServiceCard
          key={`service-${title}`}
        >
          <Icon
            icon={icon}
          />
          <Title>
            {title}
          </Title>
          <Description>
            {description}
          </Description>
        </ServiceCard>
      ))}
    </ServicesCards>
  </Services>
);

export default ServiceCards;

const Services = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

const ServicesCards = styled.div`
  display: grid;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));

  @media (max-width: ${variables.tablet}) {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }
`;

const ServiceCard = styled(DimiCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: 0.2s;
`;

const Icon = styled(Dimigoincon)`
  font-size: 64px;

  @media (max-width: ${variables.tablet}) {
    font-size: 42px;
  }
`;

const Title = styled.h4`
  margin-top: 1.2rem;
  font-size: 24px;
  font-weight: ${variables.fontWeightExtraBold};
  text-align: center;
  word-break: keep-all;

  @media (max-width: ${variables.tablet}) {
    font-size: 16px;
  }
`;

const Description = styled.p`
  margin-top: 0.5rem;
  color: ${variables.gray};
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
  word-break: keep-all;

  @media (max-width: ${variables.tablet}) {
    display: none;
  }
`;
