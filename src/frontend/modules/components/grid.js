import { Table, Button, Empty } from 'antd';
import React, { Component } from 'react';
import { injectIntl } from "react-intl"

class Grid extends Component {
  render() {
    const { dataSource, action, classNameGrid, intl} = this.props;

    const columns = dataSource[0] ? Object.keys(dataSource[0]).map((key) => ({
      title: key,
      dataIndex: key,
      key: key,
      responsive: ['md']
    })) : [];

    if (action) {
      columns.push({
        title: intl.formatMessage({ id:"'common.Action'"}),
        key: 'action',
        render: (_, record) => (
          <Button onClick={() => action(record)}>Action</Button>
        ),
      });
    }

    let className = typeof classNameGrid === 'string' ? classNameGrid : 'grid';
    return (
      <div className={className}>
        {dataSource.length > 0 ? (
          <Table dataSource={dataSource} columns={columns} position='bottomCenter' size="small" pagination={false} scroll={{ y: 500 }} />
        ) : (
          <Empty description="No data available" />
        )}
      </div>
    );
  }
}

export default injectIntl(Grid)