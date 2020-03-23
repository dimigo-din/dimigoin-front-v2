import * as React from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import css, { SerializedStyles } from '@emotion/css';
import DimiCard from '../components/dimiru/DimiCard';
import DimiInput from '../components/dimiru/DimiInput';
import DimiButton from '../components/dimiru/DimiButton';
import DimiDivider from '../components/dimiru/DimiDivider';
import variables from '../scss/_variables.scss';

type TStyleByDeviceWidth = {
  [key in 'tablet' | 'desktop']: SerializedStyles;
};

const until = (device: 'tablet' | 'desktop', style: string) =>
  (({
    tablet: css`
      @media only screen and (max-width: 769px) {
        ${style}
      }
    `,
    desktop: css`
      @media only screen and (max-width: 769px) {
        ${style}
      }
    `,
  } as TStyleByDeviceWidth)[device]);

export default () => (
  <Container
    css={css`
      padding: 0 0.5rem;
      margin-right: auto;
      margin-left: auto;
    `}
  >
    <CLogin>
      <Section className="section">
        <SectionTitle className="section__title">로그인</SectionTitle>
        <Content css={ContentMT}>
          <DimiInput
            v-model="id"
            css={LoginInput}
            placeholder="아이디"
            type="text"
          />
          <DimiInput
            v-model="password"
            css={LoginInput}
            placeholder="비밀번호"
            type="password"
          />
          <SubmitButton large>LOGIN</SubmitButton>
          <RegisterDescription>
            또는
            <RegisterLink to="/">회원가입</RegisterLink>
          </RegisterDescription>
        </Content>
      </Section>
      <DimiDivider vertical />
      <Section className="section">
        <SectionTitle>
          {true ? '내일의 급식' : '오늘의 급식'}
          {/* 여기는 추후에 mealgroup api로 대체해주세요 */}
        </SectionTitle>
        <Content>{/* <MealGroup /> */}</Content>
      </Section>
    </CLogin>
  </Container>
);

const Container = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  ${until(
    'tablet',
    `
    width: unset;
    display: block;
    height: unset;
    padding: 12px;
  `
  )}
  @media only screen and (min-width: 769px) {
    width: 737px;
  }
  @media only screen and (min-width: 1024px) {
    width: 992px;
  }
  @media only screen and (min-width: 1216px) {
    width: 1186px;
  }
  @media screen and (min-width: 1216px) {
    width: 960px;
  }
`;

const CLogin = styled(DimiCard)`
  display: flex;
  width: 100%;
  justify-content: center;
  ${until(
    'tablet',
    `display: block;
      width: unset;`
  )}
  .section:first-child {
    order: 2;
  }
  .section:last-child {
    order: 1;
  }
`;

const Section = styled.div`
  display: flex;
  width: 50%;
  flex-direction: column;
  padding: 2rem;
  ${until('tablet', 'width: unset')}
`;

const SubmitButton = styled(DimiButton)`
  align-self: center;
  padding: 0.625em 2.75em;
  margin-top: 3rem;
  font-weight: ${variables.fontWeightExtraBold};
  ${until('tablet', 'margin-top: 0.8rem')}
`;

const RegisterDescription = styled.p`
  align-self: center;
  margin-top: 1rem;
  color: ${variables.gray};
`;

const SectionTitle = styled.h1`
  position: relative;
  font-size: 2.25em;
  font-weight: ${variables.fontWeightExtraBold};
`;

const RegisterLink = styled(Link)`
  color: ${variables.orange};
  text-decoration: none;
`;

const Content = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 3em;
`;

const ContentMT = css`
  margin-top: 7em;
  ${until('tablet', 'margin-top: 1.5em')}
`;

const LoginInput = css`
  margin-bottom: 1rem;
`;
