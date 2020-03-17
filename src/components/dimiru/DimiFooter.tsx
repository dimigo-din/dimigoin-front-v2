import React from 'react';
import styled from 'styled-components';

import variables from '../../scss/_variables.scss';
import NaiveContainer from '../grids/NaiveContainer';

type DimiFooterProps = {
  copyright?: React.ReactNode;
  mail?: React.ReactNode;
  facebook?: React.ReactNode;
};

const DimiFooter: React.FC<DimiFooterProps> = ({ copyright, mail, facebook }) => {
  return (
    <Footer>
      <NaiveContainer>
        <Container>
          <FooterCopyright>
            {copyright}
          </FooterCopyright>
          <FooterContacts>
            <FooterMail>
              {mail}
            </FooterMail>
            <FooterFacebook>
              {facebook}
            </FooterFacebook>
          </FooterContacts>
        </Container>
      </NaiveContainer>
    </Footer>
  );
};

export default DimiFooter;

const Footer = styled.div`
  display: flex;
  min-height: 8rem;
  align-items: center;
  background-color: ${variables.grayLighter};
  border-radius: 3.3em 3.3em 0 0;
  box-shadow: 20px 20px 41px #c4c4c4,
    -20px -20px 41px ${variables.white};

  @media (max-width: ${variables.tablet}) {
    min-height: 12rem;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: ${variables.tablet}) {
    flex-direction: column;
  }
`;

const FooterText = styled.span`

  * {
    color: ${variables.gray};
    text-decoration: none;
  }
`;

const FooterCopyright = styled(FooterText)`
  color: ${variables.grayLight};
`;

const FooterContacts = styled.div`
  display: flex;
  padding: 12px;

  @media (max-width: ${variables.tablet}) {
    flex-direction: column;
    padding-top: 24px;
    padding-bottom: 0;
  }
`;

const FooterContact = styled(FooterText)`
  padding: 4px;
`;

const FooterMail = styled(FooterContact)`
  @media (min-width: ${variables.tablet}) {
    padding-right: 64px;
  }
`;

const FooterFacebook = styled(FooterContact)`
`;
