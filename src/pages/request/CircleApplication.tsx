import React, { useState, useEffect } from 'react';
import css from '@emotion/css';
import styled from '@emotion/styled';
import { useHistory } from 'react-router-dom';

import variables from '../../scss/_variables.scss';

import api from '../../api';

import DimiCard from '../../components/dimiru/DimiCard';
import DimiLongInput from '../../components/dimiru/DimiLongInput';
import DimiButton from '../../components/dimiru/DimiButton';
import DimiLoading from '../../components/dimiru/DimiLoading';

import SweetAlert from '../../utils/swal';
import { ICircle } from '../../interface/circle';

const Header = styled.div`
  margin-bottom: 1.5rem;
  color: ${variables.grayDark};
  font-size: 26px;
  font-weight: ${variables.fontWeightBold};
`;

const CircleInfoCard = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const QuestionCardWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin: 2rem 0;
`;

const QuestionCard = css`
  margin-bottom: 1rem;
  &: last-child {
    margin-bottom: 0;
  }
`;

interface ICircleLogo {
  imageKey: string;
}

const CircleLogo = styled.div<ICircleLogo>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-image: url(${({ imageKey }) =>
    `"https://dimigoin.s3.ap-northeast-2.amazonaws.com/${imageKey}"`});
  background-size: cover;
  background-position: center center;
  margin-right: 40px;
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
  font-size: 24px;
  font-weight: ${variables.fontWeightBold};
  margin-bottom: 1rem;
`;

const CircleFeatureTitle = styled.span`
  color: ${variables.grayDark};
  font-size: 20px;
  font-weight: ${variables.fontWeightRegular};
  margin-right: 0.3rem;
  &: last-child {
    margin-right: 0;
  }
`;

const CircleFeatureInfo = styled.span`
  color: ${variables.gray};
  font-size: 20px;
  font-weight: ${variables.fontWeightRegular};
  margin-right: 1rem;
`;

const FormTitle = styled.h1`
  color: ${variables.black};
  font-size: 20px;
  font-weight: ${variables.fontWeightBold};
  margin-bottom: 1rem;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = css`
  font-size: 20px;
`;

const Loading = css`
  margin: auto;
`;

interface IHistory {
  circleId: string;
}

const CircleApplication = () => {
  const history = useHistory<IHistory>();
  const [info, setInfo] = useState<ICircle>();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [active, setActive] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    api
      .get(`/circle/id/${history.location.state.circleId}`)
      .then(({ data }) => {
        console.log(data.circle);
        setInfo(data.circle);
      });
    api.get('/circle/application/form').then(({ data }) => {
      console.log(data.form);
      setQuestions(data.form);
    });
  }, [history.location.state.circleId]);

  const LoadingInterval = setInterval(() => {
    if (!(info && questions)) {
      setLoading(true);
      clearInterval(LoadingInterval);
    }
  }, 300);

  useEffect(() => {
    console.log(answers);
  }, [answers]);

  const applyFrom = async () => {
    try {
      await setActive(false);
      await api.post('/circle/application', {
        circle: history.location.state.circleId,
        form: answers,
      });
      await SweetAlert.success('지원서 제출이 완료되었습니다.');
      await history.goBack();
    } catch ({ response }) {
      await setActive(true);
      await SweetAlert.error(response.data.message);
    }
  };

  return (
    <>
      <Header>지원서 작성</Header>
      <DimiCard css={CircleInfoCard}>
        {info && questions && loading ? (
          <>
            <CircleLogo imageKey={info?.imageKey || ''} />
            <CircleInfoWrap>
              <CircleTitle>{info?.name}</CircleTitle>
              <CircleFeatureWrap>
                <CircleFeatureTitle>분류</CircleFeatureTitle>
                <CircleFeatureInfo>{info?.category}</CircleFeatureInfo>
                <CircleFeatureTitle>동장</CircleFeatureTitle>
                <CircleFeatureInfo>
                  {`${info?.chair.serial
                    .toString()
                    .substr(0, 1)}학년 ${info?.chair.serial
                    .toString()
                    .substr(1, 1)}반 ${info?.chair.name}`}
                </CircleFeatureInfo>
              </CircleFeatureWrap>
            </CircleInfoWrap>
          </>
        ) : (
          <DimiLoading css={Loading} />
        )}
      </DimiCard>
      <QuestionCardWrap>
        {loading &&
          questions.map(({ _id, question, maxLength }: any) => (
            <DimiCard key={_id} css={QuestionCard}>
              <FormTitle>{question}</FormTitle>
              <DimiLongInput
                value={answers._id}
                onChange={(event) => {
                  event.persist();
                  setAnswers((prevState) => ({
                    ...prevState,
                    [_id]: event.target.value,
                  }));
                }}
                height={300}
                maxLength={maxLength}
                placeholder={`최대 글자수는 ${maxLength}자예요.`}
              />
            </DimiCard>
          ))}
      </QuestionCardWrap>
      <ButtonWrap>
        {loading && (
          <DimiButton active={active} click={applyFrom} css={Button}>
            제출하기
          </DimiButton>
        )}
      </ButtonWrap>
    </>
  );
};

export default CircleApplication;
