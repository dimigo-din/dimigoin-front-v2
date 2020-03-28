import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import { filter } from 'lodash';
import styled from '@emotion/styled';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import CircleCard from '../../components/CircleCard';
import DimiLoading from '../../components/dimiru/DimiLoading';
import DimiButton from '../../components/dimiru/DimiButton';

import { ICircle } from '../../interface/circle';
import AutoLinker from '../../utils/autolinker';

import variables from '../../scss/_variables.scss';

const LOAD_CIRCLES = gql`
  query {
    circles {
      _id
      name
      category
      description
      imageKey
      videoLink
      applied
      chair {
        _id
        name
        serial
      }
      viceChair {
        _id
        name
        serial
      }
    }
  }
`;

const LOAD_APPLIED_CIRCLES = gql`
  query {
    myApplications {
      _id
      status
      circle {
        _id
        name
        category
        imageKey
      }
    }
  }
`;

const LOAD_CIRCLE_INFO = gql`
  query($id: ID!) {
    circle(_id: $id) {
      _id
      name
      category
      description
      imageKey
      videoLink
      applied
      chair {
        _id
        name
        serial
      }
      viceChair {
        _id
        name
        serial
      }
    }
  }
`;

const CircleInformation = () => {
  const history = useHistory();

  const [open, setOpen] = useState<boolean>(false);
  const [circles, setCircles] = useState<Array<ICircle>>([]);
  const [applications, setApplications] = useState<
    Array<{ circle: ICircle; status: string }>
  >([]);
  const [selectedCircle, setSelectedCircle] = useState<string | null>('');
  const [
    selectedCircleInfo,
    setSelectedCircleInfo,
  ] = useState<ICircle | null>();

  const { data: circlesData } = useQuery(LOAD_CIRCLES);
  const { data: appliedCirclesData } = useQuery(LOAD_APPLIED_CIRCLES);
  const { data: circledata, refetch: circleDataRefetch } = useQuery(
    LOAD_CIRCLE_INFO,
  );

  useEffect(() => {
    if (circlesData) {
      const NotAppliedCircles = filter(circlesData.circles, { applied: false });
      setCircles(NotAppliedCircles);
    }
  }, [circlesData]);

  useEffect(() => {
    if (appliedCirclesData) {
      setApplications(appliedCirclesData.myApplications);
    }
  }, [appliedCirclesData]);

  useEffect(() => {
    if (selectedCircle) {
      circleDataRefetch({ id: selectedCircle });
    }
  }, [selectedCircle, circleDataRefetch]);

  useEffect(() => {
    if (circledata) {
      setSelectedCircleInfo(circledata.circle);
    }
  }, [circledata]);

  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSelectedCircle(null);
        setSelectedCircleInfo(null);
      }, 300);
    }
  }, [open]);

  return (
    <>
      <Header>동아리 가입 신청</Header>
      {applications.length > 0 && (
        <>
          <SectionHeader>신청한 동아리</SectionHeader>
          <CardContainer>
            {applications.map((application) => (
              <CircleCard
                key={application.circle._id}
                onClick={() => {
                  setSelectedCircle(application.circle._id);
                  setOpen(true);
                }}
                imageKey={application.circle.imageKey}
                name={application.circle.name}
                category={application.circle.category}
                status={application.status}
              />
            ))}
          </CardContainer>
        </>
      )}
      <SectionHeader>
        {applications.length > 0 ? '신청하지 않은 동아리' : '전체 동아리'}
      </SectionHeader>
      <CardContainer>
        {circles.map((circle) => (
          <CircleCard
            key={circle._id}
            onClick={() => {
              setSelectedCircle(circle._id);
              setOpen(true);
            }}
            imageKey={circle.imageKey}
            name={circle.name}
            category={circle.category}
          />
        ))}
      </CardContainer>

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        showCloseIcon={false}
        focusTrapped={false}
        center
        styles={{
          modal: {
            fontFamily:
              "'NanumSquareRound',-apple-system,BlinkMacSystemFont, 'Segoe UI',Helvetica,Arial,sans-serif",
            width: '900px',
            borderRadius: '30px',
            boxShadow: '0 10px 50px 0 rgba(0, 0, 0, 0.3)',
            padding: '25px',
          },
        }}
        animationDuration={300}
      >
        {selectedCircleInfo ? (
          <>
            <InfoContainer>
              <CircleLogo imageKey={selectedCircleInfo.imageKey} />
              <CircleInfoWrap>
                <CircleTitle>{selectedCircleInfo.name}</CircleTitle>
                <CircleFeatureWrap>
                  <CircleFeatureTitle>분류</CircleFeatureTitle>
                  <CircleFeatureInfo>
                    {selectedCircleInfo.category}
                  </CircleFeatureInfo>
                  <CircleFeatureTitle>동장</CircleFeatureTitle>
                  <CircleFeatureInfo>
                    {`${selectedCircleInfo?.chair.serial
                      .toString()
                      .substr(
                        0,
                        1,
                      )}학년 ${selectedCircleInfo?.chair.serial
                      .toString()
                      .substr(1, 1)}반 ${selectedCircleInfo?.chair.name}`}
                  </CircleFeatureInfo>
                </CircleFeatureWrap>
              </CircleInfoWrap>
            </InfoContainer>
            <CircleDescription
              dangerouslySetInnerHTML={{
                __html: AutoLinker.url(selectedCircleInfo.description),
              }}
            />
            <YoutubeIframe
              src={`https://www.youtube.com/embed/${selectedCircleInfo.videoLink}`}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            />
            <ButtonWrap>
              <DimiButton
                large
                click={() => history.push('/request/circle/application', {
                  circleId: selectedCircle,
                })}
              >
                지원하기
              </DimiButton>
            </ButtonWrap>
          </>
        ) : (
          <LoadingWrap>
            <DimiLoading />
          </LoadingWrap>
        )}
      </Modal>
    </>
  );
};

export default CircleInformation;

const Header = styled.h1`
  margin-bottom: 1.5rem;
  color: ${variables.grayDark};
  font-size: 26px;
  font-weight: ${variables.fontWeightBold};
`;

const SectionHeader = styled.h2`
  font-size: 20px;
  margin: 24px 0;
`;

const CardContainer = styled.div`
  width: 100%;
  display: grid;
  grid-column-gap: 2rem;
  grid-row-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2em;
  flex-direction: column;
`;

interface ICircleLogo {
  imageKey: string;
}

const CircleLogo = styled.div<ICircleLogo>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-image: url(${({ imageKey }) => `"https://dimigoin.s3.ap-northeast-2.amazonaws.com/${imageKey}"`});
  background-size: cover;
  background-position: center center;
  margin-bottom: 1em;
`;

const CircleInfoWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const CircleFeatureWrap = styled.div`
  display: flex;
  flex-direction: row;
`;

const CircleTitle = styled.span`
  color: ${variables.black};
  font-size: 24px;
  font-weight: ${variables.fontWeightBold};
  margin-bottom: 1rem;
  text-align: center;
`;

const CircleFeatureTitle = styled.span`
  color: ${variables.grayDark};
  font-size: 20px;
  font-weight: ${variables.fontWeightRegular};
  margin-right: 0.5rem;
  &: last-child {
    margin-right: 0;
  }
`;

const CircleFeatureInfo = styled.span`
  color: ${variables.gray};
  font-size: 20px;
  font-weight: ${variables.fontWeightRegular};
  margin-right: 1rem;
`;

const CircleDescription = styled.span`
  display: block;
  white-space: pre-wrap;
  color: ${variables.black};
  line-height: 1.5;
  margin-bottom: 2em;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
`;

const YoutubeIframe = styled.iframe`
  width: 100%;
  height: 450px;
  margin-bottom: 2em;
`;

const LoadingWrap = styled.div`
  display: flex;
  justify-content: center;
`;
