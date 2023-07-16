// sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { menuItems } from '../constants/menuData';
import { injectIntl } from "react-intl"
import { GithubOutlined, LinkedinOutlined, LinkOutlined } from '@ant-design/icons';


class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
    };
  }

  toggleMenu = () => {
    this.setState((prevState) => ({
      collapsed: !prevState.collapsed,
    }));
  };

  renderMenuItem = (item) => {
    const { intl } = this.props;
    return (
      <li className='submenus'>
        {this.renderMenuIcon(item.icon)}
        {!this.state.collapsed && <span className="menu-title">{intl.formatMessage({ id:item.label})}</span>}
        {item.subMenu && !this.state.collapsed && (
          <ul className="submenu">{item.subMenu.map(this.renderSubMenu)}</ul>
        )}
      </li>
    );
  };

  renderMenuIcon = (item) => {
    return typeof item === 'string' ?	this.renderAntdIcon(item)  : <FontAwesomeIcon icon={item} className="menu-icon" />;
  }

  renderAntdIcon = (item) => {
    switch(item) {
      case 'LinkedinOutlined':
        return <LinkedinOutlined />
      case 'GithubOutlined':
        return <GithubOutlined />
      case 'LinkOutlined':
        return <LinkOutlined />
      default : 
        return <FontAwesomeIcon icon={item} className="menu-icon" />
    }
  }

  renderSubMenu = (item) => {
    const { intl } = this.props;
    return (
      <ul className="submenu">
          <li key={item.label}>
            { item.external ? 
              <p className="footerIcon">
                <a href={item.route} target="_blank" rel="noreferrer">
                  {this.renderAntdIcon(item.icon)}
                  {intl.formatMessage({ id:item.label})}
                </a>
              </p>            
            :
              <Link to={item.route}>
                {!this.state.collapsed && <span className="submenu-title">{intl.formatMessage({ id:item.label})}</span>}
              </Link>
            }

          </li>
      </ul>
    );
  };
 

  render() {
    const sidebarClass = this.state.collapsed ? 'sidebar collapsed' : 'sidebar buildup';
    return (
      <div className={sidebarClass + ' transition-all duration-200 ease-in justify-center items-center bg-[#223345]'}>
        <button className="toggle-btn" onClick={this.toggleMenu}>
          <FontAwesomeIcon
            icon={(this.state.collapsed ? faAngleRight : faAngleLeft)}
            className="toggle-icon"
          />
        </button>
        <ul className='menus'>{menuItems.map(this.renderMenuItem)}</ul>
      </div>
    );
  }
}

export default injectIntl(Sidebar)