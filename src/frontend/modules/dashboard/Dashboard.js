// libraries
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { validAuthCookie } from '../helpers/init';
import { Row, Col, Divider } from 'antd';
import { TagOutlined, InfoCircleOutlined  } from '@ant-design/icons';
// components
import withSidebar from '../components/withSidebar';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSourcePosts: [],
      logged: false // Inicialmente definido como falso
    };
  }

  componentDidMount() {
    this.validateCookie();
  }

  validateCookie = async () => {
    let response = await validAuthCookie();
    this.setState({ logged: response });
  }  

  render() {
    const { intl } = this.props;
    
    return (
      < div className="container">
        <Fragment>
          <Col span={20}>
            <Row gutter={[8, 8]} className="dashboardContent header justifyContentCenter">
              <h2 className="footerMessage">{intl.formatMessage({ id:"dashboard.welcome"})}</h2>
            </Row>
            <Row gutter={[8, 8]} className="dashboardContent rowBody">
              <Col flex="auto" className="leftBox boxSize">
                <Row gutter={[8, 8]} className="dashboardContent">
                  <Col span={21}>
                    <Divider orientation="left" >
                      <h2>{intl.formatMessage({ id:"dashboard.about.project"})}</h2>
                    </Divider>             
                  </Col>
                </Row>
                <Row gutter={[8, 8]} className="dashboardContent">
                  <Col span={7}>
                    <p>
                      <TagOutlined style={{ marginRight: '5px' }} /> 
                      <strong>{intl.formatMessage({ id:"dashboard.about.strong"})}</strong>{intl.formatMessage({ id:"dashboard.about"})}
                    </p>
                  </Col>
                  <Col span={7}>
                    <p>
                      <TagOutlined style={{ marginRight: '5px' }} /> 
                      <strong>{intl.formatMessage({ id:"dashboard.lang.strong"})}</strong>{intl.formatMessage({ id:"dashboard.lang"})}
                    </p>
                  </Col>
                  <Col span={7}>
                    <p>
                      <TagOutlined style={{ marginRight: '5px' }} /> 
                      <strong>{intl.formatMessage({ id:"dashboard.css.style.strong"})}</strong> {intl.formatMessage({ id:"dashboard.css.style"})}
                    </p>
                  </Col>
                </Row>
              </Col>
            </Row> 
            <Row span={21} className="dashboardContent footer justifyContentCenter">
              <p className="footerMessage">{intl.formatMessage({ id:"dashboard.feedback"})}</p>
            </Row>
          </Col>
        </Fragment>
      </div>
      
    );
  }
}

export default injectIntl(withSidebar(Dashboard));
