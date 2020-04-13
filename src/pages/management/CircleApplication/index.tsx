import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { throttle, sortBy } from 'lodash';

import ContentWrapper from '../../../components/ContentWrapper';
import DimiLoading from '../../../components/dimiru/DimiLoading';
import auth from '../../../utils/auth';
import swal from '../../../utils/swal';
import { graphqlErrorMessage } from '../../../utils/error';

import { statusType, AppliedCircle, Application } from './types';
import {
  GET_ALL_APPLICATIONS,
  GET_APPLICATIONS_BY_CIRCLE,
  GET_FINAL_APPLICATIONS,
  SET_APPLIER_STATUS,
  SET_INTERVIEW_TIME,
} from './gql';
import { getQuestionByObjectId, getActionByStatus } from './functions';
import {
  Row, Cell, Qna, Question, Badges, Card, Table,
  Name, Header, EmptyList, LoadingContainer, badgesWrap, Chip,
  ChipWithHoverWrap, NameWrapper, HoverTip, ChipListWrap,
  DateTimeWrapper, DateTimeField, DateTimePicker, DateTimeSubmitButton,
} from './styles';
import DimigoIcon from '../../../components/Dimigoincon';

const validDateStrings = ['Thu Apr 02 2020', 'Fri Apr 03 2020'];

const ChipWithHover: React.FC<AppliedCircle> = ({ name, imageKey }) => (
  <ChipWithHoverWrap>
    <Chip src={`https://dimigoin.s3.ap-northeast-2.amazonaws.com/${imageKey}`} />
    <HoverTip>{name}</HoverTip>
  </ChipWithHoverWrap>
);

const TimeInput: React.FC<{
  applierId: string;
  isTeacher: boolean;
  interviewTime: string | null;
}> = ({ applierId, isTeacher, interviewTime }) => {
  const defaultDate = new Date('2020.04.02 09:00');
  const [interviewDateTime, setInterviewDateTime] = useState<Date>(
    interviewTime ? new Date(Number(interviewTime)) : defaultDate,
  );

  const checkValidTime = (date: Date) => {
    const hours = date.getHours();
    return (
      validDateStrings.includes(date.toDateString())
      && (hours >= 9) && (hours <= 16)
    ) || hours === 1;
  };

  const onChangeInterviewDateTime = (changedDate: Date | null) => {
    if (!changedDate) {
      return setInterviewDateTime(defaultDate);
    }
    if (!checkValidTime(changedDate)) {
      return swal.error('올바른 면접 시간이 아닙니다');
    }
    return setInterviewDateTime(changedDate);
  };

  const [setInterviewTime] = useMutation(SET_INTERVIEW_TIME, {
    onCompleted: () => swal.success('면접 시간을 설정했습니다.'),
    onError: async (error) => {
      await swal.error(graphqlErrorMessage(error));
    },
  });

  const onClickSubmitTime = () => {
    setInterviewTime({
      variables: {
        applierId,
        interviewTime: interviewDateTime
          .getTime()
          .toString(),
      },
    });
  };

  return (
    <DateTimeWrapper>
      <DateTimeField>면접 시간</DateTimeField>
      <DateTimePicker
        value={interviewDateTime}
        onChange={onChangeInterviewDateTime}
        disabled={isTeacher}
      />
      {!isTeacher && (
        <DateTimeSubmitButton
          // die
          onClick={onClickSubmitTime}
        >
          설정하기
        </DateTimeSubmitButton>
      )}
    </DateTimeWrapper>
  );
};

const FoldableRow = ({
  application, isTeacher, buttonConfig, selectedOtherCircle,
}: {
  application: Application;
  isTeacher: boolean;
  buttonConfig: {
    items: string[];
    clickable?: boolean;
    onClick: (index: number) => void;
  };
  selectedOtherCircle?: string;
}) => {
  const [opened, setOpenedStatus] = useState(false);
  const { applier } = application;
  const onClickRow = () => {
    // getSelection().toString()은 현재 windows에서 선택된 문자를 가져옵니다.
    if (!getSelection()?.toString()) {
      // 토글
      setOpenedStatus((previousStatus) => !previousStatus);
    }
  };

  const isDocumentPassed = buttonConfig.items[0]
    === (isTeacher ? '서류합격' : '면접합격');

  return (
    <Row key={application._id}>
      {isTeacher && (
      <Cell>
        {application.circle.name}
      </Cell>
      )}
      <Cell>
        {applier.serial}
      </Cell>
      <Cell css={Name}>
        <NameWrapper
          onClick={onClickRow}
        >
          <p>{applier.name}</p>
        </NameWrapper>
        {Object.keys(application.form).sort().map((q) => (
          <Qna opened={opened} key={q}>
            <Question>
              {getQuestionByObjectId(q)}
            </Question>
            <p>
              {application.form[q]}
            </p>
          </Qna>
        ))}
        {isDocumentPassed && (
          <TimeInput
            applierId={applier._id}
            interviewTime={application.interviewTime}
            isTeacher={isTeacher}
          />
        )}
      </Cell>
      <Cell>
        <ChipListWrap>
          {applier?.appliedCircles?.map(({ name, imageKey }: AppliedCircle) => (
            <ChipWithHover
              key={`circle-${name}`}
              name={name}
              imageKey={imageKey}
            />
          ))}
        </ChipListWrap>
      </Cell>
      <Cell css={badgesWrap}>
        <Badges
          items={buttonConfig.items}
          colors={['aloes', 'orange']}
          onClick={buttonConfig.onClick}
          clickable={buttonConfig.clickable}
        />
      </Cell>
      <Cell>
        {selectedOtherCircle}
      </Cell>
    </Row>
  );
};

const CircleApplication: React.FC = () => {
  const isTeacher = auth.getUserInfo().userType === 'T';
  const hookConfig = {
    query: isTeacher ? GET_ALL_APPLICATIONS : GET_APPLICATIONS_BY_CIRCLE,
    config: {
      variables: {
        page: 1,
      },
    },
  };

  const query = useQuery<{
    allApplications?: Application[];
    applications?: Application[];
  }>(hookConfig.query, hookConfig.config);
  const { fetchMore, refetch } = query;

  const [setApplierStatus] = useMutation(SET_APPLIER_STATUS, {
    onError(err) {
      swal.error(graphqlErrorMessage(err));
    },
    onCompleted() {
      refetch();
    },
  });

  const {
    data: finalApplications,
  } = useQuery<{
    finalApplications: {
      _id: string;
      applier: {
        _id: string;
      };
      circle: {
        imageKey: string;
        name: string;
      };
    }[];
  }>(GET_FINAL_APPLICATIONS);

  const list = isTeacher ? query.data?.allApplications : query.data?.applications;
  const thisCircleName = list && list[0].circle.name;

  const applicationsWithFinalSelection = list?.map((application) => ({
    ...application,
    final: finalApplications
    ?.finalApplications
    .filter((final) => final.applier._id === application.applier._id)[0]?.circle.name,
  }));

  useEffect(() => {
    // disable loadmore for 동장
    let pending = false;
    let loadedPages = 1;
    if (isTeacher) {
      const eventListener = throttle((e) => {
        if (window.innerHeight + window.scrollY > document.documentElement.offsetHeight - 1800
         && (!pending)) {
          pending = true;
          e.preventDefault();
          loadedPages += 1;
          fetchMore({
            variables: {
              page: loadedPages,
            },
            updateQuery({ allApplications: prev }, { fetchMoreResult }) {
              pending = false;
              if (!fetchMoreResult?.allApplications || !prev) return { allApplications: prev };
              return {
                allApplications: [...prev, ...(fetchMoreResult.allApplications)],
              };
            },
          });
        }
      }, 300);
      window.addEventListener('scroll', eventListener);
      return () => {
        window.removeEventListener('scroll', eventListener);
      };
    }
    return undefined;
  }, [isTeacher, fetchMore]);

  const selectStatus = async (
    application: Application,
    selectedStatus: statusType | string,
    selectedMessage: string,
  ) => {
    const { value: answer } = await swal.confirm(
      `정말 ${application.applier.name} 지원자를 ${selectedMessage}처리 하실 건가요? 이 작업은 되돌릴 수 없습니다.`,
    );
    if (!answer) return;
    setApplierStatus({
      variables: {
        status: selectedStatus,
        applierId: application.applier._id,
      },
    });
  };
  return (
    <ContentWrapper
      header={(
        <h1>
          <DimigoIcon icon="club-sm" />
          동아리 신청자 관리
        </h1>
      )}
    >
      <Card>
        <Table>
          <thead>
            <Row css={Header}>
              {isTeacher && (
                <Cell>동아리</Cell>
              )}
              <Cell>학번</Cell>
              <Cell>이름</Cell>
              <Cell>지원한 동아리</Cell>
              <Cell>상태</Cell>
              {isTeacher || <Cell>최종선택</Cell>}
            </Row>
          </thead>
          <tbody>
            {!list?.length && (
              <Row>
                <Cell css={EmptyList}>
                  지원서를 불러오는중입니다...
                </Cell>
              </Row>
            )}

            {[...(applicationsWithFinalSelection?.filter((e) => e.final === thisCircleName) || []),
              ...sortBy(applicationsWithFinalSelection?.filter((e) => e.final !== thisCircleName), 'final')]
              .map((application) => {
                const [buttonItems,
                  settableStatus] = getActionByStatus(application.status, isTeacher);
                return (
                // 지원서를 접어보기 위함입니다.
                  <FoldableRow
                    key={application._id}
                    isTeacher={isTeacher}
                    application={application}
                    buttonConfig={{
                      items: buttonItems,
                      clickable: !!settableStatus,
                      onClick(index) {
                        if (settableStatus) {
                          selectStatus(application, settableStatus[index], buttonItems[index]);
                        }
                      },
                    }}
                    selectedOtherCircle={
                    application.final
                  }
                  />
                );
              })}
          </tbody>
        </Table>
        {isTeacher && (
        <LoadingContainer>
          <DimiLoading />
        </LoadingContainer>
        )}
      </Card>
    </ContentWrapper>
  );
};

export default CircleApplication;
