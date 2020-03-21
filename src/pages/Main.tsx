import React from 'react';
import styled from '@emotion/styled';

import variables from '../scss/_variables.scss';

import NaiveContainer from '../components/grids/NaiveContainer';
import DimiCard from '../components/dimiru/DimiCard';
import DimiIcon from '../components/dimiru/DimiIcon';
import { ReactComponent as BrandImage } from '../assets/brand.svg';

const photoCDN = process.env.DIMIGO_API_URL + '/user_photo';

const MainPage = () => {
  const photoUrl = '';

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
                {photoUrl ?
                  <ProfilePhoto
                    src={`${photoCDN}/${photoUrl}`}
                  />
                  :
                  <ProfileDefaultPhoto
                    className="icon-profile"
                  />
                }
                <ProfileInfo>
                  <ProfileInfoSerial>
                    2학년 5반
                  </ProfileInfoSerial>
                  <ProfileInfoName>
                    여준호
                  </ProfileInfoName>
                </ProfileInfo>
              </ProfileInfoLeft>

              <ButtonList>
                <Button
                  icon="setting"
                  title="설정"
                  pointer
                />
                <Button
                  icon="logout"
                  title="로그아웃"
                  pointer
                />
              </ButtonList>
            </ProfileCard>
          </ProfileSection>
          <InfoSection>
            <InfoCard>
              <InfoNotice>
                학년별 밴드에 교과별 온라인 학습이 공지되었습니다. 반드시 확인하세요.
              </InfoNotice>
            </InfoCard>
          </InfoSection>
        </Column>
        <Column>
          <MealSection>
            <MealCard />
          </MealSection>
        </Column>
      </InfoContainer>
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

const ButtonList = styled.nav`
`;

const Button = styled(DimiIcon)`
  cursor: pointer;
  font-size: 23px;

  &:not(:last-child) {
    margin-right: 0.25em;
  }
`;

const InfoSection = styled.section`
  flex: 1;

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

const MealSection = styled.section`
  flex: 1;

  @media (max-width: ${variables.tablet}) {
    display: block;
  }
`;

const MealCard = styled(DimiCard)`
  min-height: 15rem;
`;
