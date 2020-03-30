import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { throttle } from 'lodash';

import ContentWrapper from '../../../components/ContentWrapper';
import DimiLoading from '../../../components/dimiru/DimiLoading';
import auth from '../../../utils/auth';
import swal from '../../../utils/swal';
import { graphqlErrorMessage } from '../../../utils/error';

import { statusType, Application } from './types';
import { GET_ALL_APPLICATIONS, GET_APPLICATIONS_BY_CIRCLE, SET_APPLIER_STATUS } from './gql';
import { getQuestionByObjectId, getActionByStatus } from './functions';
import {
  Row, Cell, Qna, Question, Badges, Card, Table,
  Name, Header, EmptyList, LoadingContainer, badgesWrap, Chip,
  ChipWithHoverWrap, NameWrapper, HoverTip,
} from './styles';
import DimigoIcon from '../../../components/Dimigoincon';

const ChipWithHover = ({ name }: {name: string}) => (
  <ChipWithHoverWrap>
    <Chip src="https://dimigoin.s3.ap-northeast-2.amazonaws.com/CIRCLE_PROFILE/%EC%84%A0%EC%9D%B8%EC%9E%A5.png" />
    <HoverTip>{name}</HoverTip>
  </ChipWithHoverWrap>
);

const FoldableRow = ({
  application, isTeacher, buttonConfig,
}: {
  application: Application;
  isTeacher: boolean;
  buttonConfig: {
    items: string[];
    clickable?: boolean;
    onClick: (index: number) => void;
  };
}) => {
  const [opened, setOpenedStatus] = useState(false);
  return (
    <Row
      key={application._id}
      onClick={() => {
        // getSelection().toString()은 현재 windows에서 선택된 문자를 가져옵니다.
        if (!getSelection()?.toString()) {
          // 토글
          setOpenedStatus((previousStatus) => !previousStatus);
        }
      }}
    >
      {isTeacher && (
      <Cell>
        {application.circle.name}
      </Cell>
      )}
      <Cell>
        { application.applier.serial }
      </Cell>
      <Cell css={Name}>
        <NameWrapper>
          <p>{application.applier.name}</p>
          <ChipWithHover name="선인장" />
          <ChipWithHover name="선인장" />
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
      </Cell>
      <Cell css={badgesWrap}>
        <Badges
          items={buttonConfig.items}
          colors={['aloes', 'orange']}
          click={buttonConfig.onClick}
          clickable={buttonConfig.clickable}
        />
      </Cell>
    </Row>
  );
};

const CircleApplication: React.FC = () => {
  let loadedPages = 1;
  let pending = false;
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

  const list = isTeacher ? query.data?.allApplications : query.data?.applications;

  useEffect(() => {
    // disable loadmore for 동장
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
  }, []);

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
  console.log(list);
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
              <Cell>상태</Cell>
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

            {list?.map((application) => {
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
