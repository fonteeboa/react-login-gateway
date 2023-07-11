import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Row, Col, Empty, Button, Table, message, Input } from 'antd';
import { getService, postService} from '../helpers/requests';
import UserModal from '../components/userModal';
import { tableStyle } from '../constants/constants';

class Users extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            userName: "",
            userEmail: "",
            userId: "",
            userPassword: "",
            errorFields: [],
            modalEdit: false
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers = async () => {    
        this.setState({ loading: true })
        const response = await getService('/users')
        this.setState({ loading: false, dataSource: response })
    }

    handleOpenModal = () => {
        this.setState({ showModal: true });
    };

    handleCloseModal = () => {
        this.setState(({
            loading: false,
            userName: "",
            userEmail: "",
            userId: "",
            userPassword: "",
            showModal: false,
            errorFields: [],
            modalEdit: false
        }));
    };

    handleInputChange = async (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        if (name === 'userPassword') {
            this.calculatePasswordStrength(value)
        }
    };
  
    handleAddEditUser = async () => {
        const { intl } = this.props;
        const { userName, userEmail, userId, userPassword, errorFields, modalEdit } = this.state;
        const newUser = { userName: userName, userEmail: userEmail, userId: userId, userPassword: userPassword, modalEdit: modalEdit };
        const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        
        if (!regex.test(userEmail)) {
            errorFields.push('userEmail');
        }

        if ( !userId &&  ( (userPassword && userPassword.length < 8) || this.calculatePasswordStrength(userPassword) < 70)) {
            errorFields.push('userPassword');
        }

        if (errorFields.length > 0 ) {
            return this.setState({ errorFields: errorFields });
        }

        this.setState({ loading: true })
        const response = await postService('/addUser', newUser)
        if (response.success) {
            message.success(intl.formatMessage({ id: "users.add.success" }))
        } else {
            switch(response.error) {
                
            }
            message.error(intl.formatMessage({ id: "users.add.error" }))
        }	

        console.log(response);

        this.handleCloseModal();
        this.getUsers();
    };

    handleEditUser = (id) => {
        if (!id) return false;

        const { dataSource } = this.state;
        const user = dataSource.find(item => item.id === id);
  
        if (user) {
            this.setState({
                userId: id,
                userName: user.name,
                userEmail: user.email,
                userPassword: user.password,
                showModal: true,
                modalEdit: true,
            });
        }
    }
  

    handleDeleteUser = async (id) => {
        if (!id) return false;
        const { intl } = this.props;
  
        this.setState({ loading: true })
        const response = await postService('/deleteUser', { userId: id })
        if (response.success) {
            message.success(intl.formatMessage({ id: "users.add.success" }))
        } else {
            switch(response.error) {
                
            }
            message.error(intl.formatMessage({ id: "users.add.error" }))
        }

        this.handleCloseModal();
        this.getUsers();
    }


    calculatePasswordStrength = (password) => {
        if (typeof password !== 'string') return 0;
        const lengthScore = Math.min(password.length * 4, 25); // Pontuação baseada no comprimento da senha (máximo de 25 pontos)
        const uppercaseScore = /[A-Z]/.test(password) ? 10 : 0; // Pontuação por ter pelo menos uma letra maiúscula (10 pontos)
        const lowercaseScore = /[a-z]/.test(password) ? 10 : 0; // Pontuação por ter pelo menos uma letra minúscula (10 pontos)
        const digitScore = /\d/.test(password) ? 10 : 0; // Pontuação por ter pelo menos um dígito (10 pontos)
        const specialCharScore = /[^A-Za-z0-9]/.test(password) ? 25 : 0; // Pontuação por ter pelo menos um caractere especial (25 pontos)
        const score = lengthScore + uppercaseScore + lowercaseScore + digitScore + specialCharScore;
        const strength = Math.min(Math.floor((score / 70) * 100), 100); // Converter a pontuação para uma escala de 0 a 100      
        return strength;
    };

    render() {
        const { intl } = this.props;
        const { dataSource, showModal, userName, userEmail, userPassword, userId, errorFields, modalEdit } = this.state;
        const passwordStrength = this.calculatePasswordStrength(userPassword);
    
        const columns = [
          { title: intl.formatMessage({ id: "common.name" }), dataIndex: 'name' },
          { title: intl.formatMessage({ id: "common.email" }), dataIndex: 'email' },
          {
            title: intl.formatMessage({ id: "common.actions" }),
            key: 'actions',
            render: (text, record) => (
              <>
                <Button className="customButtonAction" onClick={() => this.handleEditUser(record.id)}>Editar</Button>
                <Button className="customButtonAction" onClick={() => this.handleDeleteUser(record.id)}>Excluir</Button>
              </>
            )
          }
        ];
    
        return (
          <>
            {dataSource.length === 0 ? (
              <Empty description={intl.formatMessage({ id: "common.noData" })} />
            ) : (
            <Col span={24} className="margintop6">
                <Row gutter={[16, 8]}>
                    <Col flex="auto">
                        <Input.Search
                        placeholder={intl.formatMessage({ id: "common.search" })}
                        size="medium"
                        onSearch={this.handleSearch}
                        />
                    </Col>
                    <Col>
                        <Button className="customButton" type="primary" onClick={this.handleOpenModal}>
                            {intl.formatMessage({ id: "common.add" })}
                        </Button>
                    </Col>
                </Row>
    
                <Table
                    className="top1 alltables75 stayBottom"
                    dataSource={dataSource}
                    columns={columns}
                    size="small"
                    pagination={false}
                    style={tableStyle}
                    rowKey={(text, record) => `${record}-${text.id}-${text.name}`}
                    scroll={{ y: 700 }}
                />
    
                <UserModal
                    showModal={showModal}
                    modalEdit={modalEdit}
                    userId={userId}
                    userName={userName}
                    userEmail={userEmail}
                    errorFields={errorFields}
                    userPassword={userPassword}
                    passwordStrength={passwordStrength}
                    handleAddUser={this.handleAddEditUser}
                    handleCloseModal={this.handleCloseModal}
                    handleInputChange={this.handleInputChange}
                    handleChange={this.calculatePasswordStrength}
                />
              </Col>
            )}
          </>
        );
    }
}

export default injectIntl(Users);
