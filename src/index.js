// libraries
import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { injectIntl, IntlProvider } from "react-intl";
// css
import { importCSS } from './frontend/css/cssImports';
// modules
import Login from './frontend/modules/login/Login';
import Dashboard from './frontend/modules/dashboard/Dashboard';
import Logout from './frontend/modules/admin/logout';
import Admin from './frontend/modules/admin/Admin';
import CovidPortal from './frontend/modules/covid/Covid19';

// languages
import i18n from './frontend/i18n';

importCSS();

class ReactApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      language: sessionStorage.getItem('lang') || window.navigator.language.replace('-', '_') || 'pt_BR' ,
      allLanguages: Object.keys(i18n)
    };
  }

  componentDidMount() {
    if (this.state.language !== 'pt_BR') {
      this.handleChangeLang(this.state.language);
    }
  }

  handleChangeLang = (lang) => {
    if (lang) {
      if (!this.state.allLanguages.includes(lang)) lang = 'pt_BR';
      sessionStorage.setItem('lang', lang);
      this.setState({ 
        language: lang,
        messages: i18n[lang]
      });
    }
  }

  render() {
    const { language, allLanguages } = this.state;
    const messages = i18n[language] || i18n['pt_BR'];
    let bodyClassName = "containerBody "+ language;

    return (
      <div className={bodyClassName}>
        <IntlProvider locale={language.replace('_', '-')} messages={messages}>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" render={() => <Login handleChangeLang={this.handleChangeLang} allLanguages={allLanguages} language={language}/>}/>
              <Route exact path="/dashboard" render={() => <Dashboard language={language}/>}/>
              <Route exact path="/info/advices" render={() => <Dashboard language={language}/>}/>
              <Route exact path="/info/coronavirus" render={() => <CovidPortal language={language}/>}/>
              <Route exact path="/admin" render={() => <Admin language={language}/>}/>
              <Route exact path="/logout" render={() => <Logout language={language} />}/>
            </Switch>
          </BrowserRouter>
        </IntlProvider>
      </div>
    );
  }
}

export default injectIntl(ReactApp);

createRoot(document.getElementById('root')).render(<ReactApp />);