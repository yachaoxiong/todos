import React, { Component } from 'react';
//import moment from 'moment';
import { connect } from 'react-redux';
import { Calendar, Badge } from 'antd';
import { getTodos } from '../../actions/index';

class todoCalendar extends Component {
  getListData = (value) => {
    let listData;
    switch (value.date()) {
      case 8:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
        ];
        break;
      case 10:
        listData = [
          { type: 'warning', content: 'This is warning event.' },
          { type: 'success', content: 'This is usual event.' },
          { type: 'error', content: 'This is error event.' },
        ];
        break;
      case 15:
        listData = [
          { type: 'warning', content: 'This is warning event' },
          { type: 'success', content: 'This is very long usual event。。....' },
          { type: 'error', content: 'This is error event 1.' },
          { type: 'error', content: 'This is error event 2.' },
          { type: 'error', content: 'This is error event 3.' },
          { type: 'error', content: 'This is error event 4.' },
        ];
        break;
      default:
    }
    return listData || [];
  };

  dateCellRender = (value) => {
    const listData = this.getListData(value);
    return (
      <ul className='events'>
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  render() {
    return (
      <div>
        <div style={{ background: 'white', padding: 36, borderRadius: 5 }}>
          <Calendar
            dateCellRender={this.dateCellRender}
            todo={this.props.todo}
          />
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
