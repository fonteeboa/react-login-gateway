// libraries
import React, { Component } from "react"
import { injectIntl } from "react-intl"
import { validAuthCookie } from '../helpers/init'
import { getService } from '../helpers/requests'
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
    this.fetchSourcePost();
  }

  validateCookie = async () => {
    let response = await validAuthCookie();
    this.setState({ logged: response})
  }  

  fetchSourcePost = async () => {
    const response = await getService('https://jsonplaceholder.typicode.com/todos', {}, false)
    //this.setState({ dataSourcePosts: response })
  }

  render() {
    const { dataSourcePosts } = this.state;
    return (
      <nav>
        <div>
          <ul>
            {dataSourcePosts.map(item => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        </div>
      </nav>
    );
  }
}

export default injectIntl(withSidebar(Dashboard))