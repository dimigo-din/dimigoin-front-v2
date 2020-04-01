import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';

import { useHistory } from 'react-router-dom';
import variables from '../scss/_variables.scss';

import NaiveContainer from '../components/grids/NaiveContainer';
import DimiCard from '../components/dimiru/DimiCard';
import DimiIcon from '../components/dimiru/DimiIcon';
import { ReactComponent as BrandImage } from '../assets/brand.svg';
import ServiceCards from '../components/ServiceCards';
import auth, { IUser } from '../utils/auth';

const photoCDN = `${process.env.REACT_APP_DIMIGO_API_URL}/user_photo`;

const MainPage = () => {
  const history = useHistory();

  const [info, setInfo] = useState<IUser>();

  useEffect(() => {
    setInfo(auth.getUserInfo());
  }, []);

  const isTeacher = info?.userType === 'T';

  return (
    <Container>
      <Brand>
        <BrandLogo />
      </Brand>
      <InfoContainer>
        <Column>
          <ProfileSection>
            <ProfileCard>
              <ProfileInfoLeft>
                {info?.photo[0] ? (
                  <ProfilePhoto src={`${photoCDN}/${info?.photo[0]}`} />
                ) : (
                  <ProfileDefaultPhoto className="icon-profile" />
                )}
                <ProfileInfo>
                  {isTeacher ? (
                    <>
                      <ProfileInfoName>{info?.name}</ProfileInfoName>
                      &nbsp;
                      <ProfileInfoSerial>
                        선생님
                      </ProfileInfoSerial>
                    </>
                  ) : (
                    <>
                      <ProfileInfoSerial>
                        {info && `${info.grade}학년 ${info.class}반`}
                      </ProfileInfoSerial>
                      <ProfileInfoName>{info?.name}</ProfileInfoName>
                    </>
                  )}
                </ProfileInfo>
              </ProfileInfoLeft>

              <ButtonList>
                <Button
                  icon="setting"
                  title="설정"
                  pointer
                  onClick={() => {
                    window.location.href = 'https://student.dimigo.hs.kr/user/profile';
                  }}
                />
                <Button
                  icon="logout"
                  title="로그아웃"
                  pointer
                  onClick={() => history.push('/auth/login')}
                />
              </ButtonList>
            </ProfileCard>
          </ProfileSection>
          <Section>
            <InfoCard>
              <InfoNotice>
                학년별 밴드에 교과별 온라인 학습이 공지되었습니다. 반드시
                확인하세요.
                <br />
                각 동아리의 디스코드 면접 방 주소는 동아리별 SNS 또는 동아리 설명란을 확인해 주세요.
              </InfoNotice>
            </InfoCard>
          </Section>
        </Column>
        <Column>
          <Section>
            <MealCard />
          </Section>
        </Column>
      </InfoContainer>
      <Column>
        <Section>
          <ServiceCards />
        </Section>
      </Column>
    </Container>
  );
};

export default MainPage;

const Container = styled(NaiveContainer)`
  padding-top: 1rem;
`;

const Brand = styled.h1`
  margin: 2rem 0 1rem 0.5rem;
  font-size: 36px;
  font-weight: ${variables.fontWeightExtraBold};
`;

const BrandLogo = styled(BrandImage)`
  display: block;
  width: 150px;
`;

const InfoContainer = styled.div`
  display: flex;
  min-height: 300px;

  @media (max-width: ${variables.tablet}) {
    flex-direction: column;
    width: 100%;
  }
`;

const Column = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: stretch;
  margin: 0.5rem;
`;

const ProfileSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const ProfileCard = styled(DimiCard)`
  display: flex;
  justify-content: space-between;
  flex: 1;
  min-height: 46px;
  align-items: center;
`;

const ProfileInfoLeft = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
`;

const ProfilePhoto = styled.img`
  border: 1px solid ${variables.grayLighter};
  border-radius: 50%;
  object-fit: cover;
  width: 44px;
  height: 44px;
  margin-right: 15px;
`;

const ProfileDefaultPhoto = styled.span`
  width: 44px;
  height: 44px;
  margin-right: 15px;

  &::before {
    margin-right: 0;
    margin-left: 0;
    font-size: 44px;
  }
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 20px;
`;

const ProfileInfoName = styled.span`
  color: ${variables.black};
`;

const ProfileInfoSerial = styled.span`
  color: ${variables.gray};
  margin-right: 5px;
`;

const ButtonList = styled.nav``;

const Button = styled(DimiIcon)`
  cursor: pointer;
  font-size: 23px;

  &:not(:last-child) {
    margin-right: 0.25em;
  }
`;

const Section = styled.section`
  flex: 1;
  display: flex;

  @media (max-width: ${variables.tablet}) {
    display: block;
  }
`;

const InfoCard = styled(DimiCard)`
  display: block;
  color: ${variables.grayDark};
  font-size: 18px;
  line-height: 2;
`;

const InfoNotice = styled.p`
  font-family: inherit;
  font-weight: ${variables.fontWeightRegular};
  white-space: pre-wrap;
  word-wrap: break-word;
`;

const MealCard = styled(DimiCard)`
  min-height: 15rem;
  flex: 1;
`;
