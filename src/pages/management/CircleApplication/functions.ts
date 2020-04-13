import * as handleCircle from '../../../api/util/handle-circle-status';
import { statusType } from './types';

export const getQuestionByObjectId = (id: string) => {
  if (id === '5e79c2b0cf414516739e5fcc') return '지원동기';
  if (id === '5e79c2b0cf414516739e5fcd') return '하고 싶은 일과 앞으로의 목표';
  if (id === '5e79c2b0cf414516739e5fce') return '자기계발을 위해 내가 한 노력';
  if (id === '5e79c2b0cf414516739e5fcf')
    return '성격과 생활태도를 중심으로 자신의 장단점 서술';
  return '알수없는질문';
};

export const getActionByStatus = (status: statusType, isTeacher: boolean) => {
  if (isTeacher) {
    return (
      {
        [handleCircle.APPLIED]: [['제출']],
        [handleCircle.FAIL]: [['탈락']],
        [handleCircle.DOCUMENT_PASS]: [['서류합격']],
        [handleCircle.DOCUMENT_FAIL]: [['서류탈락']],
        [handleCircle.INTERVIEW_PASS]: [['면접합격']],
        [handleCircle.INTERVIEW_FAIL]: [['면접탈락']],
        [handleCircle.FINAL]: [['최종선택']],
      }[status] || '알수없음'
    );
  }

  return (
    {
      [handleCircle.APPLIED]: [
        ['서류합격', '불합격'],
        [handleCircle.DOCUMENT_PASS, handleCircle.DOCUMENT_FAIL],
      ],
      [handleCircle.FAIL]: [['탈락']],
      [handleCircle.DOCUMENT_PASS]: [
        ['면접합격', '불합격'],
        [handleCircle.INTERVIEW_PASS, handleCircle.INTERVIEW_FAIL],
      ],
      [handleCircle.DOCUMENT_FAIL]: [['서류탈락']],
      [handleCircle.INTERVIEW_FAIL]: [['면접탈락']],
      [handleCircle.INTERVIEW_PASS]: [['면접합격']],
      [handleCircle.FINAL]: [['최종선택']],
    }[status] || '알수없음'
  );
};
