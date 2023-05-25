import { Table, Button, Empty } from 'antd';
import React, { Component } from 'react';
import { injectIntl } from "react-intl"

class Grid extends Component {
  render() {
    const { dataSource, action } = this.props;

    const columns = dataSource[0] ? Object.keys(dataSource[0]).map((key) => ({
      title: key,
      dataIndex: key,
      key: key,
    })) : [];

    if (action) {
      columns.push({
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Button onClick={() => action(record)}>Action</Button>
        ),
      });
    }

    return (
      <div className='grid'>
        {dataSource.length > 0 ? (
          <Table dataSource={dataSource} columns={columns} />
        ) : (
          <Empty description="No data available" />
        )}
      </div>
    );
  }
}

export default injectIntl(Grid)