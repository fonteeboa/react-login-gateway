import { faHome, faInfo, faCog, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export const menuItems = [
  {
    label: 'common.dashboard',
    icon: faHome,
    subMenu: [
      { label: 'common.dashboard', route: '/dashboard', icon: faHome },
    ],
  },
  {
    label: 'common.info',
    icon: faInfo,
    subMenu: [
      { label: 'common.advices', route: '/info/advices', icon: faInfo },
      { label: 'common.corona', route: '/info/coronavirus', icon: faInfo },
    ],
  },
  {
    label: 'common.settings',
    icon: faCog,
    subMenu: [
      { label: 'common.admin', route: '/admin', icon: faUser },
      { label: 'common.logout', route: '/logout', icon: faSignOutAlt },
    ],
  },
];
