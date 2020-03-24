import * as React from 'react';

import ServiceWrapper from '../../components/ServiceWrapper';
import DefaultNavbar from '../../components/DefaultNavbar';
import DimiMenu from '../../components/dimiru/DimiMenu';
import DimiMenuItem from '../../components/dimiru/DimiMenuItem';

const RequestWrapper: React.FC = () => (
  <ServiceWrapper
    navbar={<DefaultNavbar />}
    menu={(
      <DimiMenu>
        <DimiMenuItem route="/request/circle/application">
          동아리 가입 신청
        </DimiMenuItem>
      </DimiMenu>
    )}
  />
);

export default RequestWrapper;
