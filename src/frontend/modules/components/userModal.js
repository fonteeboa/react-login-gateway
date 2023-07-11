import React from 'react';
import { Modal, Form, Input, Progress } from 'antd';
import { injectIntl } from "react-intl";

class UserModal extends React.Component {

  calculateGradientColor = (value) => {
    if (value < 45) {
      return 'rgb(255, 0, 0)'; // Vermelho
    } else if (value < 80) {
      return 'rgba(219, 219, 18, 1)'; // Amarelo
    } else {
      return 'rgb(0, 128, 0)'; // Verde
    }
  };

  render() {
    const {
      intl,
      userId,
      userName,
      showModal,
      modalEdit,
      userEmail,
      errorFields,
      userPassword,
      handleAddUser,
      passwordStrength,
      handleCloseModal,
      handleInputChange,
    } = this.props;

    return (
      <Modal
        title="Adicionar Usuário"
        open={showModal}
        onOk={handleAddUser}
        onCancel={handleCloseModal}
      >
        <Form>
          <Form.Item>
            <Input name="userId" type="hidden" value={userId} />
          </Form.Item>
          <Form.Item label="Nome">
            <Input name="userName" value={userName} onChange={handleInputChange} autoComplete="off"/>
          </Form.Item>
          { !modalEdit &&
            <>
              <Form.Item 
                label="Email"
                help={errorFields.includes('userPassword') ? intl.formatMessage({ id: "login.email.valid" }) : ''}
              >
                <Input name="userEmail" value={userEmail} onChange={handleInputChange} className={errorFields.includes('userEmail') ? 'errorInField' : ''} autoComplete="off" />
              </Form.Item>
              <Form.Item 
                label="Senha"
                help={errorFields.includes('userPassword') ? intl.formatMessage({ id: "login.password.invalid" }) : ''}
                >
                <Input.Password name="userPassword" value={userPassword} onChange={handleInputChange} className={errorFields.includes('userPassword') ? 'errorInField' : ''}  autoComplete="new-password" />
              </Form.Item>
              <Form.Item label="Força da Senha">
                <Progress
                  percent={passwordStrength}
                  strokeColor={this.calculateGradientColor(passwordStrength)}
                  showInfo={false}
                  />
              </Form.Item>
            </>
          }
        </Form>
      </Modal>
    );
  }
}

export default injectIntl(UserModal);