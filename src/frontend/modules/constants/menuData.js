import { faHome, faCog, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export const menuItems = [
  {
    label: 'common.dashboard',
    icon: faHome,
    subMenu: [
      { label: 'common.dashboard', route: '/dashboard', icon: faHome },
    ],
  },
 {
    label: 'common.socialmedias',
    icon: 'LinkOutlined',
    subMenu: [
      { label: 'common.github', route: 'https://github.com/galvao845', icon: 'GithubOutlined', external: true },
      { label: 'common.linkedin', route: 'https://www.linkedin.com/in/galvao845', icon: 'LinkedinOutlined', external: true  },
    ],
  },  
  {
    label: 'common.settings',
    icon: faCog,
    subMenu: [
      { label: 'common.admin', route: '/admin', icon: faUser },
      { label: 'common.logout', route: '/logout', icon: faSignOutAlt },
    ],
  }
];
