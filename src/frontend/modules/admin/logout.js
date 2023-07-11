import React, { Component } from 'react';
import { postService } from '../helpers/requests'
import { Redirect } from 'react-router-dom';
import { injectIntl } from "react-intl"
import { message } from 'antd';
import { HashLoader } from "react-spinners";
import { flagColors } from '../constants/constants';

class LogoutPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      logout: false
    };
  }

  componentDidMount() {
    this.handleLogout();
  }

  handleLogout = async () => {
    const { intl } = this.props
    this.setState({ loading: true });

    try {
      // Solicitação ao backend para deslogar
      this.setState({ loading: true })
      const response = await postService('/logout');
      if (response.error) {
        return message.error(intl.formatMessage({ id: "common.error" }))      
      }
      sessionStorage.removeItem('authToken');
      // timeout no nomento apenas como "pausa dramatica"
      setTimeout(() => this.setState({ loading: false, logout: true }), 1500)
    } catch (error) {
      // Lógica de tratamento de erro aqui
      this.setState({ loading: false });
      return message.error(intl.formatMessage({ id: "common.error" }))      
    }
  };

  render() {
    const { loading, logout} = this.state;
    const { language, intl} = this.props;
    const hashColor = flagColors[language] ? flagColors[language] : '#ffffff';
    if (logout) {
      // Redirecionamento para a rota "/"
      return <Redirect to="/" />;
    }

    return (
      <div className="logout-page">
        <HashLoader
          color={ hashColor }
          size={100}
          speedMultiplier={0.5}
        />
        {loading ? <></> : <div>{intl.formatMessage({ id:"logout.complete"})}</div>}
      </div>
    );
  }
}

export default injectIntl(LogoutPage)