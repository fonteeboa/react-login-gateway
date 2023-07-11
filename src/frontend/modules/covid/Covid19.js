// libraries
import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl"
import { Col } from "antd";
import withSidebar from '../components/withSidebar';

//components
class CovidPortal extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render(){
    const { intl, language } = this.props;

    return (

      <Fragment >
        <Col span={2} className="">
        </Col>
      </Fragment>

    );
  }
}
export default injectIntl(withSidebar(CovidPortal))
