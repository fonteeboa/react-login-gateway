import React from 'react';
import Sidebar from './sidebar';

const withSidebar = (WrappedComponent) => {
  return class extends React.Component {
    render() {
      return (
        <div>
          <Sidebar />
          <WrappedComponent {...this.props} />
        </div>
      );
    }
  };
};

export default withSidebar;
