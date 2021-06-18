import React, { Component } from 'react';
//import moment from 'moment';
import { connect } from 'react-redux';
import { Calendar } from 'antd';
import { getTodos } from '../../actions/index';

class todoCalendar extends Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <div style={{ background: 'white', padding: 36, borderRadius: 5 }}>
          <Calendar todo={this.props.todo} />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    todos: state.todos.payload,
  };
};

export default connect(mapStateToProps, { getTodos })(todoCalendar);
