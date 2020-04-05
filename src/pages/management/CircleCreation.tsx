/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';

import ContentWrapper from '../../components/ContentWrapper';
import Dimigoincon from '../../components/Dimigoincon';
import DimiCard from '../../components/dimiru/DimiCard';
import DimiLongInput from '../../components/dimiru/DimiLongInput';
import DimiInput from '../../components/dimiru/DimiInput';
import DimiButton from '../../components/dimiru/DimiButton';
import DimiDropdown from '../../components/dimiru/DimiDropdown';

import api from '../../api';
import { circleManager } from '../../api/circle';

import SweetAlert from '../../utils/swal';
import circleCategory from '../../utils/circleCategory';

import variables from '../../scss/_variables.scss';

const CircleCreation: React.FC = () => {
  const history = useHistory();
  const [category, setCategory] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [chairSerial, setChairSerial] = useState<string>('');
  const [viceChairSerial, setViceChairSerial] = useState<string>('');
  const [videoLink, setVideoLink] = useState<string>('');
  const [students, setStudents] = useState<any>([]);

  const loadStudents = async () => {
    const { data: { students: users } } = await api.get('/user/student');
    setStudents(users);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const getStudentIdFromSerial = (serial: string) => {
    try {
      return students.find((v: any) => v.serial === Number(serial))._id;
    } catch {
      return false;
    }
  };

  const onClickSubmit = async () => {
    const chair = getStudentIdFromSerial(chairSerial);
    const viceChair = getStudentIdFromSerial(viceChairSerial);

    if (!chair || !viceChair) {
      await SweetAlert.error('학번을 확인해주세요.');
      return;
    }

    if (['youtu', '?v=', '://'].some((v: string) => videoLink.includes(v))) {
      await SweetAlert.error('유튜브 영상의 ID만을 입력해 주세요.');
      return;
    }

    const payload = {
      name,
      description,
      chair,
      viceChair,
      videoLink,
      category: circleCategory[category],
    };

    try {
      await circleManager.createCircle(payload);
      await SweetAlert.success('동아리 개설이 완료되었습니다.');
      await history.goBack();
    } catch ({ response }) {
      await SweetAlert.error(response.data.message);
    }
  };

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
          <FormField>
            <CategoryDropdown
              items={circleCategory}
              value={category}
              onChange={setCategory}
            />
          </FormField>
          <FormField>
            <FormName>
              동아리명
            </FormName>
            <DimiInput
              placeholder="동아리 이름을 입력하세요."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormField>
        </FormRow>
        <FormRow>
          <FormField>
            <FormName>
              동아리장
            </FormName>
            <DimiNumberInput
              placeholder="학번"
              maxLength={4}
              value={chairSerial}
              onChange={(e) => setChairSerial(e.target.value)}
            />
          </FormField>
          <FormField>
            <FormName>
              부동아리장
            </FormName>
            <DimiNumberInput
              placeholder="학번"
              maxLength={4}
              value={viceChairSerial}
              onChange={(e) => setViceChairSerial(e.target.value)}
            />
          </FormField>
        </FormRow>
        <FormRow>
          <DimiLongInput
            height={150}
            placeholder="동아리 설명을 입력해 주세요."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormRow>
        <FormRow>
          <DimiInput
            placeholder="유튜브 홍보영상 링크의 ID를 입력해 주세요. (예시: Nzo1UYXw7WA)"
            value={videoLink}
            onChange={(e) => setVideoLink(e.target.value)}
          />
        </FormRow>
        <ButtonWrap>
          <DimiButton
            onClick={onClickSubmit}
          >
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

  @media (max-width: ${variables.tablet}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const FormField = styled.div`
  display: flex;
  align-items: center;

  &:first-child {
    margin-right: 2rem;
  }

  @media (max-width: ${variables.tablet}) {
    &:first-child {
      margin-bottom: 1rem;
      margin-right: none;
    }
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
`;
