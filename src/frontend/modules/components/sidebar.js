// sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { menuItems } from '../constants/menuData';
import { injectIntl } from "react-intl"
import { GithubOutlined, LinkedinOutlined, LinkOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';


class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      language: sessionStorage.getItem('lang') || window.navigator.language.replace('-', '_') || 'pt_BR' ,
    };
  }

  toggleMenu = () => {
    this.setState((prevState) => ({
      collapsed: !prevState.collapsed,
    }));
  };

  renderMenuItem = (item) => {
    const { intl } = this.props;
    const { label, icon, subMenu } = item;

    const menuTitle = (
      <span className="menu-title">
        {this.renderMenuIcon(icon)}
        {intl.formatMessage({ id: label })}
      </span>
    );

    const subMenuList = subMenu && !this.state.collapsed && (
      <ul className="submenu">
        {subMenu.map(this.renderSubMenu)}
      </ul>
    );

    return (
      <li className='submenus'>
        {!this.state.collapsed && menuTitle}
        {subMenuList}
      </li>
    );
  };

  renderMenuIcon = (item) => {
    return typeof item === 'string' ?	this.renderAntdIcon(item)  : <FontAwesomeIcon icon={item} className={"menu-icon icon_" +  this.state.language}/>
  }

  renderAntdIcon = (item) => {
    switch(item) {
      case 'LinkedinOutlined':
        return <LinkedinOutlined className={"menu-icon icon_" +  this.state.language}/>
      case 'GithubOutlined':
        return <GithubOutlined className={"menu-icon icon_" +  this.state.language}/>
      case 'LinkOutlined':
        return <LinkOutlined className={"menu-icon icon_" +  this.state.language}/>
      default : 
        return <FontAwesomeIcon icon={item} className={"menu-icon icon_" +  this.state.language}/>
    }
  }

  renderSubMenu = (item) => {
    const { intl } = this.props;
    const { label, external, route, icon } = item;

    const submenuTitle = (
      <>
        {this.renderAntdIcon(icon)}
        {intl.formatMessage({ id: label })}
      </>
    );

    const submenuLink = external ? (
      <a href={route} target="_blank" rel="noreferrer" className='submenu-title'>
        {submenuTitle}
      </a>
    ) : (
      <Link to={route} className='submenu-title'>
        {!this.state.collapsed && submenuTitle}
      </Link>
    );

    return (
      <ul className="submenu">
        <li key={label} >
          <p>{submenuLink}</p>
        </li>
      </ul>
    );
  };
 

  render() {
    const { language, collapsed } = this.state;
    let  sidebarClass = 'border_' + language + ' sidebar ' + (collapsed ? 'collapsed' : 'buildup') + " background_" + language ;

    return (
      <div className={sidebarClass + ' transition-all duration-200 ease-in justify-center items-center bg-[#223345] ' + language}>
        <button className={"toggle-btn background_" + language} onClick={this.toggleMenu}>
          {collapsed ? <MenuUnfoldOutlined className="toggle-icon" /> : <MenuFoldOutlined className="toggle-icon" />}
        </button>
        <ul className='menus'>{menuItems.map(this.renderMenuItem)}</ul>
      </div>
    );
  }
}

export default injectIntl(Sidebar)