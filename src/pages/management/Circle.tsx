/* eslint-disable no-nested-ternary */
import * as React from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';
import swal from 'sweetalert2';
import * as handleCircle from '../../api/util/handle-circle-status';
import { circleManager } from '../../api/circle';
import variables from '../../scss/_variables.scss';
import ContentWrapper from '../../components/ContentWrapper';
import DimiCard from '../../components/dimiru/DimiCard';
import DimiBadgeGroup from '../../components/dimiru/DimiButtonGroup';
// import axios from '../../api';
type status = |'applied'| 'document-fail'| 'document-pass'| 'interview-fail'| 'interview-pass'| 'final';
interface Application {
  status: status;
  _id: string;
  circle: string;
  form: {
    [key: string]: string;
  };
  applier: {
    _id: string;
    name: string;
    serial: number;
  };
}
const { useState, useEffect } = React;

const Name = css`
  width: 99%;
  line-height: 1.5;
  white-space: normal;
`;

const Status = css`
  text-align: right;
`;

const Empty = css`
    padding: 24px;
    margin-right: 16px;
    color: ${variables.gray};
    font-size: 16px;
    font-weight: ${variables.fontWeightBold};
`;

export default () => {
  const [list, setList] = useState<Application[]>([]);
  useEffect(() => {
    if (list.length) return;
    circleManager.getCircleApplicant().then((applications) => setList(applications)).catch((err) => swal.fire('이런!', err.message, 'error'));
  });

  const updateStatus = async ({ setPrevent, ...event }: {value: number;
    items: string[];
    setPrevent: () => void;
    done(): void;},
    application: Application,
    selectedStatus: status|string,
    selectedMessage: string) => {
    const ask = (type: string) => swal.fire({
      title: '경고',
      text: `정말 ${application.applier.name} 지원자를 ${type}처리 하실건가요? 이 작업은 되돌릴 수 없습니다.`,
      icon: 'warning',
      confirmButtonText: '확인',
      cancelButtonText: '취소',
      showCancelButton: true,
      showCloseButton: true,
    });
    const answer = await ask(selectedMessage);
    const setStatus = () => circleManager.setApplierStatus(application.applier._id, selectedStatus);
    try {
      if (!answer.value) setPrevent();
      else {
        await setStatus();
        setList(await circleManager.getCircleApplicant());
      }
    } catch (err) {
      swal.fire({
        title: '에러!',
        text: err.message,
        icon: 'error',
      });
      setPrevent();
    }
    event.done();
  };

  return (
    <ContentWrapper
      header={(
        <h1>
          <span className="icon-club" />
동아리 신청자 관리
        </h1>
)}
    >
      <Card>
        <Table>
          <tbody>
            {!list.length && (
              <Row>
                <Cell css={Empty}>
            아직 동아리를 신청한 사람이 없습니다
                </Cell>
              </Row>
            )}
            {
          list.map((item) => {
            const [items, statuses] = item.status === handleCircle.APPLIED
              ? [['서류합격', '불합격'], [handleCircle.DOCUMENT_PASS, handleCircle.DOCUMENT_FAIL]]
              : item.status === handleCircle.DOCUMENT_PASS
                ? [['면접합격', '불합격'], [handleCircle.INTERVIEW_PASS, handleCircle.INTERVIEW_FAIL]]
                : item.status === handleCircle.DOCUMENT_FAIL
                  ? [['서류탈락']]
                  : item.status === handleCircle.INTERVIEW_FAIL
                    ? [['면접탈락']]
                    : item.status === handleCircle.INTERVIEW_PASS
                      ? [['면접합격']]
                      : item.status === handleCircle.FINAL ? [['최종선택']] : [['알수없음']];
            return (
              <Row key={item._id}>
                <Cell>
                  { item.applier.serial }
                </Cell>
                <Cell css={Name}>
                  { item.applier.name }
                  {' '}
                  <br />
                  <br />
                  {' '}
                  {Object.keys(item.form).map((q, i) => `${(() => {
                    if (q === '5e79c2b0cf414516739e5fcc') return '지원동기';
                    if (q === '5e79c2b0cf414516739e5fcd') return '하고 싶은 일과 앞으로의 목표';
                    if (q === '5e79c2b0cf414516739e5fce') return '자기계발을 위해 내가 한 노력';
                    if (q === '5e79c2b0cf414516739e5fcf') return '성격과 생활태도를 중심으로 자신의 장단점 서술';
                    return '알수없는질문';
                  })()}: ${item.form[q]}`).map((e) => <p>{e}</p>) }
                </Cell>
                <Cell>
                  <DimiBadgeGroup
                    v-model="item.status"
                    items={items}
                    colors={['aloes', 'orange']}
                    click={(e) => {
                      if (statuses) updateStatus(e, item, statuses[e.value], items[e.value]);
                    }}
                    css={Status}
                  />
                </Cell>
              </Row>
            );
          })
        }
          </tbody>
        </Table>
      </Card>

    </ContentWrapper>
  );
};

const Card = styled(DimiCard)`
  overflow: auto;
  padding-top: 0;
  padding-bottom: 0;
`;

const Table = styled.table`
  width: 100%;
`;

const Cell = styled.td`
  padding: 20px 10px;
  white-space: nowrap;
`;

const Row = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid ${variables.grayLighter};
  }
`;
