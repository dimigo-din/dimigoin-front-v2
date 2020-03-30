import css from '@emotion/css';

import styled from '@emotion/styled';
import DimiBadgeGroup from '../../../components/dimiru/DimiButtonGroup';
import DimiCard from '../../../components/dimiru/DimiCard';
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
  /* transition: 200ms cubic-bezier(0,.65,.25,.95); */
`;

export const Badges = styled(DimiBadgeGroup)`
  text-align: right;
`;
