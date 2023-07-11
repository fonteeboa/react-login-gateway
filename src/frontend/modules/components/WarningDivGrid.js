import React, { Component } from 'react';
import { injectIntl } from "react-intl"

class WarningDivGrid extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { message, intl} = this.props;
    return (
      <div className="warningDivGrid">
        <div>{intl.formatMessage({ id:message})}</div>
      </div>
    );
  }
}

export default injectIntl(WarningDivGrid)