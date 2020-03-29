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
  applier?: number | null;
  applierColor?: string | null;
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
  status, onClick, imageKey, name, category, applier, applierColor,
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
    {applier && (
      <ApplierBadge>
        <strong>{applier}</strong>
        명
      </ApplierBadge>
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

const ApplierBadge = styled.span`
  font-size: 0.85rem;
  position: absolute;
  width: 58px;
  height: 58px;
  border-radius: 45%;
  bottom: -12px;
  right: -12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: #e83c3d !important;
  box-shadow: 0 5px 15px rgba(234,51,51,0.41);
  color: #fff;
  text-shadow: 2px 2px 3px rgba(248,105,105,0.9);

  strong {
    font-size: 1.2rem;
    font-weight: bold;
    margin-right: 1.5px;
  }
`;

export default CircleCard;
