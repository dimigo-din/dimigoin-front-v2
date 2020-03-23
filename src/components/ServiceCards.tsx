import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

import DimiCard from './dimiru/DimiCard';
import Dimigoincon from './Dimigoincon';

import variables from '../scss/_variables.scss';
import useGetComputedStyle from '../hooks/useGetComputedStyle';

interface Service {
  icon: string;
  title: string;
  description: string;
  url: string;
  permission?: number;
}

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

const ServiceCards = () => {
  const getComputedStyle = useGetComputedStyle();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [services, setServices] = useState<Service[]>(temporaryServices);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);

  const registerServices = (registeredServices: Service[]) => {
    cardsRef.current = cardsRef.current.slice(0, registeredServices.length);
  };

  const updateServiceCardHeights = (getStyle: (element: HTMLDivElement) => { width: string }) => {
    const cards = cardsRef.current || [];
    cards.forEach((element) => {
      if (element) {
        // eslint-disable-next-line no-param-reassign
        element.style.height = getStyle(element).width;
      }
    });
  };

  useEffect(
    () => {
      registerServices(services);
      updateServiceCardHeights(getComputedStyle);
    },
    [services, getComputedStyle],
  );

  return (
    <Services>
      <ServicesCards>
        {services.map(({ icon, title, description }, index) => (
          <ServiceCard
            key={`service-${title}`}
            cardRef={(el: HTMLDivElement | null) => {
              cardsRef.current[index] = el;
              return el;
            }}
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
};

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
