// libraries
import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { injectIntl, IntlProvider } from "react-intl";
// css
import './css/login.css';
import './css/index.css';
// modules
import Login from './modules/login/Login';
// languages
import i18n from './i18n';

class ReactApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: 'pt-BR',
      messages: i18n['pt_BR'],
      allLanguages: Object.keys(i18n)
    };
  }

  componentDidMount() {
    if (this.state.language === '') {
      this.handleChangeLang('pt_BR');
    }
  }

  handleChangeLang = (lang) => {
    if (lang) {
      if (!this.state.allLanguages.includes(lang)) {
        lang = 'pt_BR';
      }

      this.setState({ 
        language: lang.replace('_', '-'),
        messages: i18n[lang]
      });
    }
  }

  render() {
    const { language, messages, allLanguages } = this.state;
    let bodyClassName = "containerBody "+ language;
    return (
      <div className={bodyClassName}>
        <IntlProvider locale={language} messages={messages}>
          <BrowserRouter>
            <Switch>
              <Route path={["/"]} render={() => <Login handleChangeLang={this.handleChangeLang} allLanguages={allLanguages} language={language}/>}/>
            </Switch>
          </BrowserRouter>
          </IntlProvider>
      </div>
    );
  }
}

export default injectIntl(ReactApp);

createRoot(document.getElementById('root')).render(<ReactApp />);