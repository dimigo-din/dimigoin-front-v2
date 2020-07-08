import React from 'react';
import styled from '@emotion/styled';

import Dimigoincon from '../components/Dimigoincon';
import variables from '../scss/_variables.scss';

import ienopeIllust from '../assets/ienope.png';

const browsers = [
  { name: '구글 크롬', href: 'https://google.com/chrome' },
  { name: '파이어폭스', href: 'https://mozilla.org/firefox' },
];

const ExplorerFoundPage = () => (
  <Page>
    <Column>
      <IenopeIllust src={ienopeIllust} alt="Internet Explorer - Nope" />
    </Column>
    <Column>
      <IenopeMessage>
        <Firefox>
          크롬보다 30% 더 가볍고 2배 빠른 파이어폭스 퀀텀 쓰실?
          <br />
        </Firefox>
        디미고인은 인터넷 익스플로러를 지원하지 않습니다.
        <br />
        인터넷 익스플로러를 끄고 다른 브라우저로 접속해 주세요.
      </IenopeMessage>
      <Links>
        {browsers.map((browser) => {
          const { name, href } = browser;
          return (
            <BrowserLink key={href} href={href}>
              <Dimigoincon icon="long-arrow-right" />
              {name}
              {' '}
브라우저 다운로드
            </BrowserLink>
          );
        })}
      </Links>
    </Column>
  </Page>
);

export default ExplorerFoundPage;

const Page = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  font-weight: ${variables.fontWeightBold};
  user-select: none;

  @media screen and (max-width: 769px) {
    /* until screen size tablet */
    flex-direction: column;
  }
`;

const Column = styled.div`
  margin: 32px;

  &:hover span {
    margin-top: 0.5rem;
    opacity: 1;
  }
`;

const IenopeIllust = styled.img`
  height: 256px;
`;

const IenopeMessage = styled.p`
  margin-bottom: 1.5rem;
  color: ${variables.black};
  font-size: 16px;
  line-height: 1.8;
  word-break: keep-all;
`;

const Firefox = styled.span`
  color: ${variables.grayLight};
  font-size: 14px;
  line-height: 1.4;
  opacity: 0;
  transition: all 0.5s ease;
`;

const Links = styled.div`
  padding-bottom: 32px;
`;

const BrowserLink = styled.a`
  display: block;
  margin-top: 1rem;
  color: ${variables.pink};
  cursor: pointer;
  font-size: 16px;
  text-decoration: none;
`;
