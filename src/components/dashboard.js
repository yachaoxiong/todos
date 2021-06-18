import React, { Component } from 'react';

import Grid from './grid';

import { connect } from 'react-redux';

class dashboard extends Component {
  render() {
    return (
      <div className='cdcontent'>
        <div style={{ width: '100%' }}>
          <h1>Dashboard</h1>
          <Grid />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    charts: state.todos,
  };
};
export default connect(mapStateToProps)(dashboard);
