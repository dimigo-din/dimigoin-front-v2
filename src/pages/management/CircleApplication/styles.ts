import css from '@emotion/css';
import styled from '@emotion/styled';

import DimiBadgeGroup from '../../../components/dimiru/DimiButtonGroup';
import DimiButton from '../../../components/dimiru/DimiButton';
import DimiCard from '../../../components/dimiru/DimiCard';
import DimiDatetimePicker from '../../../components/dimiru/DimiDatetimeInput';

import variables from '../../../scss/_variables.scss';

export const Name = css`
  word-break: break-all;
  line-height: 1.5;
`;

export const EmptyList = css`
  padding: 24px;
  margin-right: 16px;
  color: ${variables.gray};
  font-size: 16px;
  font-weight: ${variables.fontWeightBold};
`;

export const Header = css`
  & > td {
    padding-bottom: 0px;
  }
`;

export const Card = styled(DimiCard)`
  overflow: auto;
  padding-top: 0;
  padding-bottom: 0;
`;

export const Table = styled.table`
  width: 100%;
`;

export const Cell = styled.td`
  padding: 20px 10px;
  /* white-space: nowrap; */
`;

export const Row = styled.tr`
  &:not(:last-child) {
    border-bottom: 1px solid ${variables.grayLighter};
  }
`;

export const Question = styled.p`
  font-weight: bold;
  margin-top: 6px;
`;

export const Qna = styled.div<{opened: boolean}>`
  height: 0px;
  overflow-y: hidden;
  ${({ opened }) => opened && `
    height: unset;
  `}
`;

export const Badges = styled(DimiBadgeGroup)`
  text-align: right;
`;
export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

export const badgesWrap = css`
  width: 143px;
`;

export const Chip = styled.img`
  width: 21px;
  height: 21px;
  vertical-align: middle;
  margin-left: 6px;
`;

export const ChipWithHoverWrap = styled.div`
  &:hover > p {
    opacity: 1;
    margin-top: 10px;
  }
`;

export const NameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

export const HoverTip = styled.p`
  position: absolute;
  opacity: 0;
  background: rgba(0, 0, 0, 0.7);
  padding: 8px;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 30px;
  color: white;
  margin-top: 0px;
  margin-left: -8px;
  transition: 200ms cubic-bezier(0,.65,.25,.95);
  font-size: 14px;
`;

export const ChipListWrap = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 0.5rem;
  min-width: 97px;
`;

export const DateTimeWrapper = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  margin-top: 1rem;
`;

export const DateTimeField = styled(Question)`
  margin: 0;
`;

export const DateTimePicker = styled(DimiDatetimePicker)`
  margin-left: 0.5rem;
`;

export const DateTimeSubmitButton = styled(DimiButton)`
  padding: 0.5rem 1.2rem;
  margin-left: 0.5rem;
`;
