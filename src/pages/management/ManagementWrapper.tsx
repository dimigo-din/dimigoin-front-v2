import * as React from 'react';

import ServiceWrapper from '../../components/ServiceWrapper';
import DefaultNavbar from '../../components/DefaultNavbar';
import DimiMenu from '../../components/dimiru/DimiMenu';
import DimiMenuItem, { MenuItem } from '../../components/dimiru/DimiMenuItem';

const menuItemList: MenuItem[] = [
  {
    route: '/management/circle',
    name: '동아리 개설 관리',
  },
  {
    route: '/management/circle/application',
    name: '동아리 가입 관리',
  },
];

const ManagementWrapper: React.FC = ({ children }) => (
  <ServiceWrapper
    navbar={<DefaultNavbar />}
    menu={(
      <DimiMenu>
        {menuItemList.map(({ route, name, disabled = false }) => (
          <DimiMenuItem key={route} route={route} disabled={disabled}>
            {name}
          </DimiMenuItem>
        ))}
      </DimiMenu>
    )}
  >
    {children}
  </ServiceWrapper>
);

export default ManagementWrapper;
