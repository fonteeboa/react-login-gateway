// libraries
import React, { Component } from "react"
import { injectIntl, FormattedMessage } from "react-intl"
import { Form, Input, Button, Select, Card } from "antd"
import { FlagIcon } from 'react-flag-kit'
import { postService } from '../helpers/requests'
import { message } from 'antd';
import CryptoJS from 'crypto-js';

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  handleLogin = async (values) => {    
    const { intl } = this.props
    this.setState({ loading: true })
    // Criptografa os dados usando SHA-512
    values['password'] = CryptoJS.SHA512(values['password']).toString();
    const response = await postService('/login', values)
    this.setState({ loading: false })
    if (response.success) {
      return message.success(intl.formatMessage({ id: "login.success" }))
    } else {
      let msg = '';
      switch(response.error) {
        case 1:
          msg = intl.formatMessage({ id: "login.password.invalid" })
          break;
        case 2:
          msg = intl.formatMessage({ id: "login.user.invalid" })
          break;          
        case 3:
          msg = intl.formatMessage({ id: "login.password.error" })
          break;
        default:
          msg = intl.formatMessage({ id: "common.error" })
          console.log(response.error);
          break;
        }
      return message.error(msg)
    }
  }

  handleLanguageChange = (lang) => {
    this.props.handleChangeLang(lang)
  }

  render() {
    const { intl, allLanguages, loading, language } = this.props

    return (
      <div className="container">
        <Card className="login-card-content">
          <h3 className="logintitle" style={{ fontWeight: "bold" }}>
            <FormattedMessage id="common.title" />
          </h3>
          <Form
            name="login"
            initialValues={{ remember: true }}
            onFinish={this.handleLogin}
          >
            <Form.Item 
              disabled={loading}
              name="email"
              rules={[
                { required: true, message: intl.formatMessage({ id: "login.email.required" }) },
                { type: "email", message: intl.formatMessage({ id: "login.email.valid" }) },        
              ]}
            >
              <Input type="text" placeholder={intl.formatMessage({ id: "common.email" })} />
            </Form.Item>
            <Form.Item 
              disabled={loading}
              name="password"
              rules={[{ required: true, message: intl.formatMessage({ id:"login.password.required"}) }]}
              >
              <Input type="password" placeholder={intl.formatMessage({ id:"common.password"})} />
            </Form.Item>
            <Form.Item className="form_actions">
              <Button type="primary" htmlType="submit" disabled={loading} className={language + " letter"}>
                {intl.formatMessage({ id:"common.submit"})}
              </Button>
              <Select className="select-flag" defaultValue="pt_BR" onChange={this.handleLanguageChange}>
                { allLanguages.map((value, key)=>(
                  <Select.Option key={value+key} value={value}>
                    <FlagIcon code={value.split('_')[1]} />
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Card>
      </div>
    )
  }
}

export default injectIntl(Login)
