import React from 'react';
import { connect } from 'react-redux';
import { getDashboard } from '../actions/dashboard';
import { getTodos, updateTodo } from '../actions/index';
import Chart from 'react-apexcharts';
import { Button, Col, Row, Progress, Tooltip, Checkbox, Tag } from 'antd';
import PropTypes from 'prop-types';
// import _ from 'lodash';
import moment from 'moment';
import { blue, yellow, red } from '@ant-design/colors';
import { Responsive, WidthProvider } from 'react-grid-layout';
import {
  OrderedListOutlined,
  ProfileFilled,
  ClockCircleFilled,
  CheckSquareFilled,
  HistoryOutlined,
} from '@ant-design/icons';
import '../../node_modules/react-grid-layout/css/styles.css';
import '../../node_modules/react-resizable/css/styles.css';

let ResponsiveReactGridLayout = WidthProvider(Responsive);
class grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      themeColor: localStorage.getItem('themeColor'),
      currentBreakpoint: 'lg',
      compactType: 'vertical',
      mounted: false,
      layouts: { lg: layouts },
    };
    this.onBreakpointChange = this.onBreakpointChange.bind(this);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onNewLayout = this.onNewLayout.bind(this);
  }

  componentDidMount() {
    this.props.getDashboard();
    this.props.getTodos();
    this.setState({ mounted: true });
  }
  componentWillMount() {
    setTimeout(() => {
      ResponsiveReactGridLayout = WidthProvider(Responsive);
      this.setState({ mounted: false });
    }, 100);
  }
  statusColor(status) {
    switch (status) {
      case 'Planed':
        return 'magenta';
      case 'In Progress':
        return 'yellow';
      case 'Finished':
        return 'green';
      default:
        return '';
    }
  }
  priorityColor(priority) {
    switch (priority) {
      case 'High':
        return red[5];
      case 'Medium':
        return yellow[5];
      case 'Low':
        return blue[5];
      default:
        return '';
    }
  }
  renderIcon(item) {
    switch (item.icon) {
      case 'OrderedListOutlined':
        return (
          <OrderedListOutlined
            style={{
              color: localStorage.getItem('themeColor') ? 'white' : 'gray',
            }}
          />
        );
      case 'ProfileFilled':
        return (
          <ProfileFilled
            style={{
              color: localStorage.getItem('themeColor') ? 'white' : 'gray',
            }}
          />
        );
      case 'ClockCircleFilled':
        return (
          <ClockCircleFilled
            style={{
              color: localStorage.getItem('themeColor') ? 'white' : 'gray',
            }}
          />
        );
      case 'CheckSquareFilled':
        return (
          <CheckSquareFilled
            style={{
              color: localStorage.getItem('themeColor') ? 'white' : 'gray',
            }}
          />
        );
      default:
        return '';
    }
  }
  renderTodoCard = () => {
    return (
      <div
        key='e'
        style={{
          background: 'white',
          padding: 25,
          borderRadius: 5,
          // borderTop: '5px solid' + localStorage.getItem('themeColor'),
          boxShadow: '0px 2px 6px #0000003b',
        }}
      >
        <div style={{ display: 'flex', padding: 15 }}>
          <h1 style={{ fontWeight: 'bold' }}>Todos</h1>
          <div style={{ marginLeft: 'auto' }}>
            <Button>Today</Button>
          </div>
        </div>
        <Row style={{ padding: 15, textAlign: 'center' }}>
          <Col
            span={6}
            style={{
              marginTop: '5%',
            }}
          >
            <div>
              <div
                style={{
                  textAlign: 'bold',
                  fontSize: '3.6rem',
                }}
              >
                7
              </div>
              <div style={{ color: 'gray' }}>Not Done</div>
            </div>
          </Col>
          <Col span={12}>
            <Progress
              style={{ transform: 'scale(1.5)' }}
              type='circle'
              strokeColor={{
                '0%': '#6C63FF',
                '100%': '#FF4D52',
              }}
              percent={75}
              format={(percent) => `${percent} %`}
            />
          </Col>
          <Col
            span={6}
            style={{
              marginTop: '5%',
            }}
          >
            <div>
              <div
                style={{
                  textAlign: 'bold',
                  fontSize: '3.6rem',
                }}
              >
                6
              </div>
              <div style={{ color: 'gray' }}>Planed</div>
            </div>
          </Col>
        </Row>
        <div
          className='db-todo-card-taskbar'
          style={{
            display: 'flex',
            padding: 5,
            background: '#e9e9e9',
            borderRadius: 5,
            marginTop: '5%',
          }}
        >
          <Tooltip title='High priority task (6)' color='red' key='red'>
            <div
              className='dashboard-task-bar'
              style={{ height: '26px', width: '30%', background: '#FF4D52' }}
            ></div>
          </Tooltip>
          <Tooltip
            title='Medium priority tasks (5)'
            color='#6C63FF'
            key='#6C63FF'
          >
            <div
              className='dashboard-task-bar'
              style={{ height: '26px', width: '20%', background: '#6C63FF' }}
            ></div>
          </Tooltip>
          <Tooltip
            title='Low priority tasks (11)'
            color='#0D9F2D'
            key='#0D9F2D'
          >
            <div
              className='dashboard-task-bar'
              style={{ height: '26px', width: '50%', background: '#0D9F2D' }}
            ></div>
          </Tooltip>
        </div>
      </div>
    );
  };

  renderTableItems = () => {
    return this.props.todos.map((t, index) => {
      return (
        <Row
          key={index}
          className='table-list-item'
          style={{ padding: '15px' }}
        >
          <Col span={12}>
            <div style={{ display: 'inline-flex' }}>
              <Checkbox
                style={{ margin: 'auto' }}
                value={t.key}
                onClick={() => this.props.updateTodo(t.key)}
                checked={t.status === 'Finished' ? true : false}
              ></Checkbox>
              <div style={{ margin: 'auto 0px auto 40px' }}>
                <div
                  className='db-tableList-title'
                  style={{ fontWeight: 'bold', fontSize: '1.3rem' }}
                >
                  {t.title}
                </div>
                <Tag color={this.priorityColor(t.priority)}>{t.priority}</Tag>
                <Tag color='cyan'> {t.category}</Tag>
              </div>
            </div>
          </Col>
          <Col span={4}>{this.renderTableItemStatus(t.status)}</Col>
          <Col span={8} style={{ textAlign: 'right' }}>
            <div
              className='table-dueDate'
              style={{ fontSize: '1.1rem', color: 'gray' }}
            >
              <HistoryOutlined style={{ paddingRight: '5px' }} />
              Due Date
            </div>
            <div
              className='table-dueDate-value'
              style={{ fontSize: '1.2rem', fontWeight: 600 }}
            >
              {moment(t.duoDate).format('LL')}
            </div>
          </Col>
        </Row>
      );
    });
  };
  renderTodoTable() {
    return (
      <div
        key='f'
        style={{
          background: 'white',
          padding: 25,
          borderRadius: 5,
          boxShadow: '0px 2px 6px #0000003b',
        }}
      >
        <div style={{ display: 'flex', padding: 15 }}>
          <h1 style={{ fontWeight: 'bold' }}>Todo List</h1>
          <div style={{ marginLeft: 'auto' }}>
            <Button>All</Button>
          </div>
        </div>
        <Progress
          percent={50}
          status='active'
          showInfo={false}
          style={{ height: 25 }}
        />
        <div style={{ height: '100%', position: 'relative' }}>
          {this.renderTableItems()}
        </div>
      </div>
    );
  }
  renderCards() {
    return this.props.cards.map((c) => {
      return (
        <div
          key={c.key}
          style={{ background: this.state.themeColor }}
          className='dashboard-card'
        >
          <Row style={{ padding: '20px 0px 30px 40px', height: '100%' }}>
            <Col span={12}>
              <p
                className='dash-card-title '
                style={{
                  color: localStorage.getItem('themeColor') ? 'white' : 'gray',
                  fontWeight: 'bold',
                }}
              >
                {c.title}
              </p>
              <h1
                style={{
                  marginBottom: 0,
                  fontSize: '2rem',
                  color: localStorage.getItem('themeColor') ? 'white' : 'black',
                }}
              >
                {c.value}
              </h1>
            </Col>
            <Col style={{ display: 'flex' }} span={12}>
              <div
                style={{
                  display: 'flex',
                  textAlign: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto',
                  fontSize: '3rem',
                  color: '#c1c1c1d9',
                }}
              >
                {this.renderIcon(c)}
              </div>
            </Col>
          </Row>
        </div>
        //</Col>
      );
    });
  }
  renderCharts() {
    return this.props.charts.map((c) => {
      return (
        <div
          key={c.key}
          style={{
            width: '100%',
            background: ' white',
            borderRadius: '5px',
            boxShadow: '0px 2px 8px #0000003b',
          }}
        >
          <div
            style={{
              textAlign: 'center',
              // background: localStorage.getItem('themeColor')
              //   ? localStorage.getItem('themeColor')
              //   : 'gray',
              // opacity: 0.4,
              // borderBottom: '1px solid #dcdcdc',
              borderRadius: '5px 5px 0px 0px',
            }}
          >
            <h3
              style={{
                // color: 'white',
                fontWeight: 600,
                margin: 'auto',
                padding: '16px',
                height: '100%',
              }}
            >
              {c.title}
            </h3>
          </div>
          <Chart
            type={c.options.chart.type}
            width={'100%'}
            height={'88%'}
            style={
              {
                // borderRadius: '6px',
                // boxShadow: ' 0px 2px 18px #dadada',
              }
            }
            options={c.options}
            series={c.series}
          />
        </div>
      );
    });
  }
  renderTableItemStatus(status) {
    switch (status) {
      case 'Planed':
        return (
          <div
            style={{
              position: 'relative',
              paddingTop: '20px',
              textAlign: 'center',
            }}
          >
            <span
              style={{ fontSize: '1.3rem', position: 'relative' }}
              data-color={this.statusColor(status)}
              className='table-status'
            >
              {status}
            </span>
          </div>
        );
      case 'In Progress':
        return (
          <div
            style={{
              position: 'relative',
              paddingTop: '20px',
              textAlign: 'center',
            }}
          >
            <span
              style={{ fontSize: '1.3rem', position: 'relative' }}
              data-color={this.statusColor(status)}
              className='table-status'
            >
              {status}
            </span>
          </div>
        );
      case 'Finished':
        return (
          <div style={{ textAlign: 'center' }}>
            <img
              alt='HOME'
              style={{
                padding: '0  15%',
                width: '100%',
                maxWidth: '220px',
              }}
              src={require('../images/finishIcon.svg').default}
            />
          </div>
        );
      default:
        break;
    }
  }
  onLayoutChange(layout, layouts) {
  
    this.props.onLayoutChange(layout, layouts);
    this.setState({ layouts });
  }
  generateDOM() {
    return;

    // this.renderTodoCard();

    // this.renderTodoTable();

    // this.renderCharts();
  }

  onBreakpointChange(breakpoint) {
    this.setState({
      currentBreakpoint: breakpoint,
    });
  }

  onNewLayout() {
    this.setState({
      layouts: { lg: layouts },
    });
  }

  render() {
    return (
      <ResponsiveReactGridLayout
        {...this.props}
        layouts={this.state.layouts}
        measureBeforeMount={false}
        // onLayoutChange={this.onLayoutChange}
        onBreakpointChange={this.onBreakpointChange}
        useCSSTransforms={this.state.mounted}
        compactType={this.state.compactType}
        preventCollision={!this.state.compactType}
      >
        {this.renderCards()}
        {this.renderTodoCard()}
        {this.renderTodoTable()}
        {this.renderCharts()}
      </ResponsiveReactGridLayout>
    );
  }
}

const layouts = [
  { i: 'a', x: 0, y: 0, w: 3, h: 3, minW: 3, minH: 3, maxH: 3 },
  { i: 'b', x: 3, y: 0, w: 3, h: 3, minW: 3, minH: 3, maxH: 3 },
  { i: 'c', x: 6, y: 0, w: 3, h: 3, minW: 3, minH: 3, maxH: 3 },
  { i: 'd', x: 9, y: 0, w: 3, h: 3, minW: 3, minH: 3, maxH: 3 },
  { i: 'e', x: 0, y: 3, w: 6, h: 10, minW: 4, minH: 8 },
  { i: 'f', x: 6, y: 3, w: 6, h: 10, minW: 6, minH: 9 },
  { i: 'g', x: 0, y: 6, w: 6, h: 10, minW: 6, minH: 9 },
  { i: 'h', x: 6, y: 6, w: 6, h: 10, minW: 6, minH: 9 },
];

// const initlayouts = [
//   { i: 'a', x: 0, y: 0, w: 3, h: 3, minW: 3, minH: 3, maxH: 3 },
//   { i: 'b', x: 3, y: 0, w: 3, h: 3, minW: 3, minH: 3, maxH: 3 },
//   { i: 'c', x: 6, y: 0, w: 3, h: 3, minW: 3, minH: 3, maxH: 3 },
//   { i: 'd', x: 9, y: 0, w: 3, h: 3, minW: 3, minH: 3, maxH: 3 },
//   { i: 'e', x: 0, y: 27, w: 12, h: 10, minW: 4, minH: 8 },
//   { i: 'f', x: 0, y: 27, w: 12, h: 14, minW: 6, minH: 9 },
//   { i: 'g', x: 0, y: 3, w: 6, h: 10, minW: 6, minH: 9 },
//   { i: 'h', x: 6, y: 15, w: 6, h: 10, minW: 6, minH: 9 },
// ];

grid.propTypes = {
  onLayoutChange: PropTypes.func.isRequired,
};

grid.defaultProps = {
  className: 'layout',
  rowHeight: 35,
  onLayoutChange: function () {},
  breakpoints: { lg: 1286, md: 996, sm: 768 },
  cols: { lg: 12, md: 12, sm: 3 },
  initialLayout: layouts,
};
const mapStateToProps = (state) => {
  return {
    charts: state.dashboard.charts,
    cards: state.dashboard.cards,
    todos: state.todos.payload,
  };
};

export default connect(mapStateToProps, { getDashboard, getTodos, updateTodo })(
  grid
);
