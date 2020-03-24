/* eslint-disable no-nested-ternary */
import React, { useState } from 'react';
import styled from '@emotion/styled';

import ContentWrapper from '../../components/ContentWrapper';
import Dimigoincon from '../../components/Dimigoincon';
import DimiCard from '../../components/dimiru/DimiCard';
import DimiLongInput from '../../components/dimiru/DimiLongInput';
import DimiInput from '../../components/dimiru/DimiInput';
import DimiButton from '../../components/dimiru/DimiButton';
import DimiDropdown from '../../components/dimiru/DimiDropdown';

import circleCategory from '../../utils/circleCategory';

const CircleCreation: React.FC = () => {
  const [category, setCategory] = useState<number>(0);

  return (
    <ContentWrapper
      header={(
        <h1>
          <Dimigoincon icon="edit" />
          동아리 개설 신청
        </h1>
        )}
    >
      <DimiCard>
        <FormRow>
          <CategoryDropdown
            items={circleCategory}
            value={category}
            onChange={setCategory}
          />
          <FormName>
            동아리명
          </FormName>
          <DimiInput
            placeholder="동아리 이름을 입력하세요."
          />
        </FormRow>
        <FormRow>
          <FormField>
            <FormName>
              동아리장
            </FormName>
            <DimiNumberInput
              placeholder="학번"
              maxLength={4}
            />
          </FormField>
          <FormField>
            <FormName>
              부동아리장
            </FormName>
            <DimiNumberInput
              placeholder="학번"
              maxLength={4}
            />
          </FormField>
        </FormRow>
        <FormRow>
          <DimiLongInput
            height={150}
            placeholder="동아리 설명을 입력해 주세요."
          />
        </FormRow>
        <FormRow>
          <DimiInput
            placeholder="유튜브 홍보영상 링크를 입력해 주세요."
          />
        </FormRow>
        <ButtonWrap>
          <DimiButton>
            제출하기
          </DimiButton>
        </ButtonWrap>
      </DimiCard>
    </ContentWrapper>
  );
};

export default CircleCreation;

const FormRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const FormField = styled.div`
  display: flex;
  align-items: center;

  &:first-child {
    margin-right: 2rem;
  }
`;

const FormName = styled.span`
  min-width: fit-content;
  margin-right: 1rem;
  color: #191616;
  font-weight: 600;
`;

const DimiNumberInput = styled(DimiInput)`
  width: 8rem;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CategoryDropdown = styled(DimiDropdown)`
  margin-right: 1rem;
`;
