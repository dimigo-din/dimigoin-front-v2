import React from 'react';
import css from '@emotion/css';
import styled from '@emotion/styled';

import DimiCard from './dimiru/DimiCard';

import variables from '../scss/_variables.scss';

const CircleCard = () => {
  return (
    <DimiCard css={CardStyle}>
      <CircleLogo imageKey={'CIRCLE_PROFILE/JnJ Communications.png'} />
      <CircleInfoWrap>
        <CircleTitle>JnJ Communications</CircleTitle>
        <CircleFeatureWrap>
          <CircleFeatureTitle>분류</CircleFeatureTitle>
          <CircleFeatureInfo>IT(프로젝트)</CircleFeatureInfo>
        </CircleFeatureWrap>
      </CircleInfoWrap>
    </DimiCard>
  );
};

const CardStyle = css`
  display: flex;
  cursor: pointer;
  & :hover {
    z-index: 1;
    box-shadow: 2px 16px 36px rgba(21, 19, 19, 0.15), -5px -5px 10px #fff;
  }
`;

interface ICircleLogo {
  imageKey: string;
}

const CircleLogo = styled.div<ICircleLogo>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-image: url(${({ imageKey }) =>
    `"https://dimigoin.s3.ap-northeast-2.amazonaws.com/${imageKey}"`});
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

const CircleFeatureTitle = styled.span`
  color: ${variables.grayDark};
  font-size: 16px;
  font-weight: ${variables.fontWeightRegular};
  margin-right: 0.3rem;
`;

const CircleFeatureInfo = styled.span`
  color: ${variables.gray};
  font-size: 16px;
  font-weight: ${variables.fontWeightRegular};
  margin-right: 1rem;
`;

export default CircleCard;
