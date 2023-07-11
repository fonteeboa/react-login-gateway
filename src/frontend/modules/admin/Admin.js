import React, { Component } from "react";
import { Tabs } from 'antd';
import { injectIntl } from "react-intl";
import withSidebar from '../components/withSidebar';
import Users from "./Users";
import Audit from "./Audit";
import { validAuthCookie } from '../helpers/init'

class Admin extends Component {
  onChange = (key) => {
    console.log(key);
  };

  componentDidMount() {
    this.validateCookie();
  }

  validateCookie = async () => {
    let response = await validAuthCookie();
    this.setState({ logged: response})
  }

  render() {
    const { intl } = this.props
    const items = [
      {
        key: '1',
        label: intl.formatMessage({ id: "common.users" }),
        children: <Users />,
      },
      {
        key: '2',
        label: intl.formatMessage({ id: "common.audit" }),
        children: <Audit />,
      },
    ];

    return (
      <div className="tabs-container">
        <Tabs className="custom-tabs" defaultActiveKey="1" items={items} centered  tabPosition='left' />
      </div>
    );
  }
}

export default injectIntl(withSidebar(Admin));
