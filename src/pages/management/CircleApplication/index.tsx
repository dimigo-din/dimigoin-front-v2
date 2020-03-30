import React, { useEffect, useState } from 'react';

import ContentWrapper from '../../../components/ContentWrapper';
import { circleManager } from '../../../api/circle';
import auth from '../../../utils/auth';
import swal from '../../../utils/swal';

import { statusType, Application } from './types';
import { getQuestionByObjectId, getActionByStatus } from './functions';
import {
  Row, Cell, Qna, Question, Badges, Card, Table, Name, Header, EmptyList,
} from './styles';
import DimigoIcon from '../../../components/Dimigoincon';

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
        {application.applier.name}
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
      <Cell>
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
  const [list, setList] = useState<Application[]>([]);
  const isTeacher = auth.getUserInfo().userType === 'T';

  useEffect(() => {
    circleManager.getCircleApplicant(isTeacher)
      .then((applications) => setList(applications))
      .catch((err) => swal.error(err.message));
  }, [isTeacher]);

  const selectStatus = async (
    application: Application,
    selectedStatus: statusType | string,
    selectedMessage: string,
  ) => {
    const { value: answer } = await swal.confirm(
      `정말 ${application.applier.name} 지원자를 ${selectedMessage}처리 하실 건가요? 이 작업은 되돌릴 수 없습니다.`,
    );
    if (!answer) return;

    circleManager
      .setApplierStatus(application.applier._id, selectedStatus)
      .then(() => circleManager.getCircleApplicant())
      .then((updatedApplications) => setList(updatedApplications))
      .catch((err) => swal.error(err.message, '에러!'));
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
              <Cell>상태</Cell>
            </Row>
          </thead>
          <tbody>
            {!list.length && (
              <Row>
                <Cell css={EmptyList}>
                  지원서를 불러오는중입니다...
                </Cell>
              </Row>
            )}
            {list.map((application) => {
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
      </Card>
    </ContentWrapper>
  );
};

export default CircleApplication;
