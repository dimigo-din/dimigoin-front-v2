import React from 'react';
import css from '@emotion/css';
import styled from '@emotion/styled';

import DimiCard from './dimiru/DimiCard';

import variables from '../scss/_variables.scss';

interface ICircleCard {
  imageKey: string;
  name: string;
  category: string;
  status?: string;
  onClick?: () => void;
}

const CardStyle = css`
  display: flex;
  cursor: pointer;
  transition: all 0.2s ease-in-out 0s, background-color 0.5s ease 0s;

  &:hover {
    z-index: 1;
    box-shadow: 2px 16px 36px rgba(21, 19, 19, 0.15), -5px -5px 10px #fff;
  }
`;

const CircleCard = ({
  status, onClick, imageKey, name, category,
}: ICircleCard) => (
  <DimiCard
    css={CardStyle}
    onClick={onClick}
  >
    <CircleLogo imageKey={imageKey} />
    <CircleInfoWrap>
      <CircleTitle>{name}</CircleTitle>
      <CircleFeatureWrap>
        <CircleFeatureInfo>
          {category}
        </CircleFeatureInfo>
      </CircleFeatureWrap>
    </CircleInfoWrap>
    {status && (
      <StatusBadge
        src={`/static/badges/${status.toUpperCase()}.svg`}
      />
    )}
  </DimiCard>
);

interface ICircleLogo {
  imageKey: string;
}

const CircleLogo = styled.div<ICircleLogo>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url(
    "${({ imageKey }) => `https://dimigoin.s3.ap-northeast-2.amazonaws.com/${imageKey}`}"
  );
  background-size: cover;
  background-position: center center;
  margin-right: 20px;
`;

const CircleInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const CircleFeatureWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const CircleTitle = styled.span`
  color: ${variables.black};
  font-size: 16px;
  font-weight: ${variables.fontWeightBold};
  margin-bottom: 1rem;
`;

const CircleFeatureInfo = styled.span`
  color: ${variables.gray};
  font-size: 16px;
  font-weight: ${variables.fontWeightRegular};
  margin-right: 1rem;
`;

const StatusBadge = styled.img`
  position: absolute;
  width: 70px;
  height: 70px;
  bottom: -12px;
  right: -12px;
  transform: rotate(-11deg);
`;

export default CircleCard;
