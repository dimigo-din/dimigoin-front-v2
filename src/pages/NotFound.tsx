import * as React from 'react';
import { useHistory } from 'react-router-dom';
import styled from '@emotion/styled';

import Dimigoincon from '../components/Dimigoincon';

import roseInGrassIllust from '../assets/rose-in-glass.png';
import notFoundImage from '../assets/404.png';

import variables from '../scss/_variables.scss';

const NotFoundPage: React.FC = () => {
  const history = useHistory();

  const goBack = () => history.goBack();

  return (
    <Container>
      <Column>
        <Illust
          src={roseInGrassIllust}
        />
      </Column>
      <Column>
        <NotFoundImage
          src={notFoundImage}
        />
        <NotFoundMessage>
          페이지를 찾을 수 없습니다.
          <br />
          주소를 다시 확인해주세요.
        </NotFoundMessage>
        <BackButton
          onClick={goBack}
        >
          <Dimigoincon icon="long-arrow-right" />
          {' 메인으로'}
        </BackButton>
      </Column>
    </Container>
  );
};

export default NotFoundPage;

const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  user-select: none;
`;

const Column = styled.div`
  margin: 32px;
`;

const Illust = styled.img`
  height: 256px;
`;

const NotFoundImage = styled.img`
  height: 120px;
`;

const NotFoundMessage = styled.p`
  width: 14em;
  margin-top: 3.25rem;
  color: ${variables.black};
  font-size: 16px;
  line-height: 1.6;
  word-break: keep-all;
`;

const BackButton = styled.a`
  display: block;
  margin-top: 1rem;
  color: ${variables.red};
  cursor: pointer;
  font-size: 16px;
  font-weight: ${variables.fontWeightBold};
`;
