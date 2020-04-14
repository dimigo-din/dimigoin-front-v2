import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from '@emotion/styled';
import css, { SerializedStyles } from '@emotion/css';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import auth from '../utils/auth';

import DimiCard from '../components/dimiru/DimiCard';
import DimiInput from '../components/dimiru/DimiInput';
import DimiButton from '../components/dimiru/DimiButton';
import DimiDivider from '../components/dimiru/DimiDivider';

import SweetAlert from '../utils/swal';
import { graphqlErrorMessage } from '../utils/error';

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

const ContentMT = css`
  margin-top: 7em;
  ${until('tablet', 'margin-top: 1.5em')}
`;

const LoginInput = css`
  margin-bottom: 1rem;
`;

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
  `,
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
      width: unset;`,
  )}
  .section:first-of-type {
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

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SubmitButton = css`
  font-size: 24px;
  padding: 0.625em 2.75em;
  align-self: center;
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

const LOGIN_MUTATION = gql`
  mutation($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      accessToken
      refreshToken
      user {
        _id
        idx
        username
        name
        userType
        gender
        phone
        photo
        class
        grade
        number
        serial
        createdAt
        updatedAt
      }
    }
  }
`;

export default () => {
  const history = useHistory();

  const [info, setInfo] = useState({ username: '', password: '' });
  const [active, setActive] = useState<boolean>(true);

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      ...info,
    },
    onCompleted: async (data) => {
      await auth.setToken(data.login.accessToken);
      await auth.setUserInfo(data.login.user);
      await history.push('/');
    },
    onError: async (error) => {
      await setActive(true);
      await SweetAlert.error(graphqlErrorMessage(error));
    },
  });

  useEffect(() => {
    auth.clearAppStorage();
  }, []);

  return (
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
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                setActive(false);
                login();
              }}
            >
              <DimiInput
                css={LoginInput}
                placeholder="아이디"
                type="text"
                value={info.username}
                onChange={(e) => {
                  e.persist();
                  setInfo((prevState) => ({
                    ...prevState,
                    username: e.target.value,
                  }));
                }}
              />
              <DimiInput
                css={LoginInput}
                placeholder="비밀번호"
                type="password"
                value={info.password}
                onChange={(e) => {
                  e.persist();
                  setInfo((prevState) => ({
                    ...prevState,
                    password: e.target.value,
                  }));
                }}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setActive(false);
                    login();
                  }
                }}
              />
              <DimiButton
                css={SubmitButton}
                active={active}
                onClick={() => {
                  setActive(false);
                  login();
                }}
              >
                LOGIN
              </DimiButton>
            </Form>
            <RegisterDescription>
              또는
              {'  '}
              <RegisterLink to="/">회원가입</RegisterLink>
            </RegisterDescription>
          </Content>
        </Section>
        <DimiDivider vertical />
        <Section className="section">
          <SectionTitle>
            오늘의 급식
            {/* {false ? '내일의 급식' : '오늘의 급식'} */}
            {/* 여기는 추후에 mealgroup api로 대체해주세요 */}
          </SectionTitle>
          <Content>{/* <MealGroup /> */}</Content>
        </Section>
      </CLogin>
    </Container>
  );
};
