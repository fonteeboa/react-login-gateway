import React, { Component, Fragment } from "react";
import { injectIntl } from "react-intl";
import { Col, Empty, Table, Input } from 'antd';
import { getService } from '../helpers/requests';
import { tableStyle} from '../constants/constants'; 

class Audit extends Component {
    constructor(props) {
        super(props)
        this.state = {
            dataSource: [],
            userName: "",
            userEmail: "",
            userId: "",
            userPassword: "",
            errorFields: [],
        }
    }

    componentDidMount() {
        this.getUsers();
    }

    getUsers = async () => {
        const { intl } = this.props;
        this.setState({ loading: true })
        const response = await getService('/audit')

        response.map(item => { return item.event_type = intl.formatMessage({ id: item.event_type }) });
        response.map(item => { return item.error_log = intl.formatMessage({ id: item.error_log.replace('"','').replace('"','') }) });
        
        this.setState({ loading: false, dataSource: response })
    }

    handleSearch = (e) => {
        console.log(e)
    }

    render () {
        const { intl } = this.props;
        const { dataSource } = this.state;

        const columns = [
            { title: intl.formatMessage({ id: "common.email" }), dataIndex: 'email' },
            { title: intl.formatMessage({ id: "common.event_type" }), dataIndex: 'event_type' },
            { title: intl.formatMessage({ id: "common.event_date" }), dataIndex: 'event_date' },
            { title: intl.formatMessage({ id: "common.error_log" }), dataIndex: 'error_log' },
        ];

        return (
            <Fragment>
                <Col span={24} className="margintop6">
                    {dataSource.length === 0 ? (
                    <Empty className="top30 " description={intl.formatMessage({ id: "common.noData" })} />
                    ) : (
                        <>
                            <Input.Search
                                placeholder={intl.formatMessage({ id: "common.search" })}
                                size="medium"
                                allowClear
                                onSearch={this.handleSearch}
                                
                            />  

                            <Table 
                                className="top1 alltables75"
                                dataSource={dataSource} 
                                columns={columns} 
                                size="small"
                                pagination={false}
                                rowKey={(text, record) => `${record}-${text.id}-${text.name}`}
                                style={tableStyle}
                                scroll={{ y: 700 }}
                            />
                        </>
                    )}
                </Col>
            </Fragment>
        );
    };
}

export default injectIntl(Audit);
