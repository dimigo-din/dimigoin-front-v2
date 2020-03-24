/* eslint-disable no-nested-ternary */
import * as React from 'react';
import styled from '@emotion/styled';
import css from '@emotion/css';
import variables from '../../scss/_variables.scss';
import ContentWrapper from '../../components/ContentWrapper';
import DimiCard from '../../components/dimiru/DimiCard';
import DimiBadgeGroup from '../../components/dimiru/DimiBadgeGroup';
import Dimigoincon from '../../components/Dimigoincon';

const { useState } = React;

interface Application {
  serial: string;
  name: string;
  introduce: string;
  status: number;
}

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
  const [list] = useState<Application[]>([
    {
      serial: '0001',
      name: '정한',
      introduce: '잘합시다',
      status: 0,
    },
    {
      serial: '0001',
      name: '정한',
      introduce: '잘합시다',
      status: 0,
    },
    {
      serial: '0001',
      name: '정한',
      introduce:
        '잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다잘합시다',
      status: 0,
    },
  ]);
  return (
    <ContentWrapper
      header={(
        <h1>
          <Dimigoincon icon="club-sm" />
          동아리 신청자 관리
        </h1>
      )}
    >
      <Card>
        <Table>
          <tbody>
            {!list.length && (
              <Row>
                <Cell className="applicant-row__serial" css={Empty}>
                  아직 동아리를 신청한 사람이 없습니다
                </Cell>
              </Row>
            )}
            {list.map((item) => (
              <Row>
                <Cell>{item.serial}</Cell>
                <Cell css={Name}>
                  {item.name}
                  {' '}
                  <br />
                  {' '}
                  {item.introduce}
                </Cell>
                <Cell css={Status}>
                  {item.status === 0 ? (
                    <DimiBadgeGroup
                      value={item.status}
                      items={['보류', '합격', '불합격']}
                      colors={['gray', 'aloes', 'orange']}
                      // click={updateStatus(item)}
                    />
                  ) : item.status === 3 ? (
                    <DimiBadgeGroup items={['최종']} colors={['cyan']} />
                  ) : (
                    <DimiBadgeGroup
                      v-else
                      value={item.status - 1}
                      items={['합격', '불합격']}
                      colors={['aloes', 'orange']}
                    />
                  )}
                </Cell>
              </Row>
            ))}
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
