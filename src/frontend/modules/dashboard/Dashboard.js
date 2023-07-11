// libraries
import React, { Component } from "react"
import { injectIntl } from "react-intl"
import { validAuthCookie } from '../helpers/init'
//components
import withSidebar from '../components/withSidebar';

class Dashboard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      dataSourcePosts: []
    }
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
      </div>
        );
  }
}

export default injectIntl(withSidebar(Dashboard))