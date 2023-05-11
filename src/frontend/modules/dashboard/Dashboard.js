// libraries
import React, { Component } from "react"
import { injectIntl } from "react-intl"
import { validAuthCookie } from '../helpers/init'

class Dashboard extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.validateCookie();
  }

  validateCookie = async () => {
    let response = await validAuthCookie();
    this.setState({ logged: response})
  }

  render() {
    return (
      <div>
        <h3>Dashboard</h3>
      </div>
    );
  }
}

export default injectIntl(Dashboard)