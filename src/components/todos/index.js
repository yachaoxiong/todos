import React, { Component } from 'react';
import Chart from 'react-apexcharts';
import moment from 'moment';
import Create from './create';
import TodoCalendar from './todoCalendar';
import { connect } from 'react-redux';
import { getTodos, deleteTodo, addTodo } from '../../actions/index';
import {
  Col,
  Row,
  Tabs,
  Table,
  Tag,
  Drawer,
  Button,
  Form,
  message,
  Divider,
  Tooltip,
} from 'antd';
import { blue, yellow, red, magenta, green } from '@ant-design/colors';
import {
  SnippetsOutlined,
  LineChartOutlined,
  PlusOutlined,
  DeleteFilled,
  EditFilled,
  CalendarOutlined,
  TableOutlined,
  FilterFilled,
  LayoutFilled,
} from '@ant-design/icons';
const { TabPane } = Tabs;
// let columns;
class index extends Component {
  // state = {
  //   series: [
  //     {
  //       name: 'Desktops',
  //       data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
  //     },
  //   ],
  //   options: {
  //     chart: {
  //       sparkline: {
  //         enabled: true,
  //       },
  //       type: 'line',
  //     },
  //   },
  // };

  columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <Button
          className='table-link'
          type='text'
          onClick={() => this.showItem(record)}
          style={{
            color: localStorage.getItem('themeColor'),
            fontWeight: 'bold',
          }}
        >
          {text}
        </Button>
      ),
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
      render: (text) => {
        if (text === 'Low') return <Tag color={blue[5]}>{text}</Tag>;
        if (text === 'Medium') return <Tag color={yellow[5]}>{text}</Tag>;
        if (text === 'High') return <Tag color={red[5]}>{text}</Tag>;
      },
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text) => {
        let color;
        if (text === 'Planed') color = magenta[5];
        if (text === 'In Progress') color = yellow[5];
        if (text === 'Finished') color = green[5];
        return (
          <div style={{ position: 'relative' }}>
            <span
              style={{
                background: color,
                borderRadius: '50%',
                width: '10px',
                height: '10px',
                left: '-15px',
                top: '5.8px',
                position: 'absolute',
              }}
            ></span>
            <span style={{ fontWeight: 500 }}>{text}</span>
          </div>
        );
      },
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text) => {
        // console.log('text',text)
        if (text === 'Work') return <Tag color='cyan'>{text}</Tag>;
        if (text === 'Study') return <Tag color='geekblue'>{text}</Tag>;
      },
    },
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      render: (text) => {
        if (text) return moment(text).format('LL');
      },
    },
    {
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (text) => {
        if (text) return moment(text).format('LL');
      },
    },

    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
  ];
  state = {
    deletedItmes: [],
    selectedItem: {},
    isModalVisible: false,
    visible: false,
    series: [44, 55, 41, 17, 15],
    dataSource: [],
    options: {
      chart: {
        type: 'donut',
      },
      legend: {
        show: true,
      },
      labels: ['Work', 'Camping', 'Shopping', 'Fishing', 'Movie'],
    },
  };
  componentDidMount() {
    this.props.getTodos();
  }
  showItem(record) {
    this.setState({ selectedItem: record });
    this.showDrawer();
  }
  showModal = () => {
    this.setState({ isModalVisible: true });
  };

  handleOk = (form) => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        values['key'] = 3;
        values['createdDate'] = Date.now();
        this.props.addTodo(values);
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
    this.setState({ isModalVisible: false });
    message.success({
      content: 'Task Added!',
      style: {
        borderRadius: '5px',
        marginTop: '5vh',
      },
    });
  };

  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };
  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };
  drawerTitle = (selectedItem) => {
    return (
      <div style={{ display: 'inline-flex', textAlign: 'center' }}>
        <h2 style={{ padding: '6px' }}>{selectedItem.title}</h2>
      </div>
    );
  };
  renderCategory = (text) => {
    if (text === 'Work') return <Tag color='cyan'>{text}</Tag>;
    if (text === 'Study') return <Tag color='geekblue'>{text}</Tag>;
  };
  renderPriority = (text) => {
    if (text === 'Low') return <Tag color={blue[5]}>{text}</Tag>;
    if (text === 'Medium') return <Tag color={yellow[5]}>{text}</Tag>;
    if (text === 'High') return <Tag color={red[5]}>{text}</Tag>;
  };
  renderStatus = (text) => {
    let color;
    if (text === 'Planed') color = magenta[5];
    if (text === 'In Progress') color = yellow[5];
    return (
      <div style={{ position: 'relative' }}>
        <span
          style={{
            background: color,
            borderRadius: '50%',
            width: '10px',
            height: '10px',
            left: '-15px',
            top: '10.8px',
            position: 'absolute',
          }}
        ></span>
        <span style={{ fontWeight: 500 }}>{text}</span>
      </div>
    );
  };
  renderDrawer = (selectedItem) => {
    // console.log('selected item', selectedItem);
    return (
      <Drawer
        title={this.drawerTitle(selectedItem)}
        mask={false}
        width={'50%'}
        onClose={this.onClose}
        visible={this.state.visible}
        bodyStyle={{ paddingBottom: 80 }}
      >
        <Form
          layout='vertical'
          fields={[
            {
              name: ['title'],
              value: selectedItem.title,
            },
          ]}
        >
          <Row style={{ padding: '0px 5px 10px 5px' }}>
            <Col span={12}>
              <div style={{ display: 'inline-flex' }}>
                <div style={{ fontSize: '1.2rem', color: 'gray' }}>
                  Created Date:
                </div>
                <div
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    paddingLeft: 5,
                  }}
                >
                  {moment(selectedItem.createdDate).format('LL')}
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div style={{ display: 'inline-flex' }}>
                <div style={{ fontSize: '1.2rem', color: 'gray' }}>
                  Due Date:
                </div>
                <div
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    paddingLeft: 5,
                  }}
                >
                  {moment(selectedItem.dueDate).format('LL')}
                </div>
              </div>
            </Col>
          </Row>

          <Row style={{ padding: '10px 5px' }}>
            <Col span={12}>
              <div style={{ display: 'inline-flex' }}>
                <div style={{ fontSize: '1.2rem', color: 'gray' }}>
                  Category:
                </div>
                <div
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    paddingLeft: 5,
                  }}
                >
                  {this.renderCategory(selectedItem.category)}
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div style={{ display: 'inline-flex' }}>
                <div style={{ fontSize: '1.2rem', color: 'gray' }}>
                  Priority:
                </div>
                <div
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    paddingLeft: 5,
                  }}
                >
                  {this.renderPriority(selectedItem.priority)}
                </div>
              </div>
            </Col>
          </Row>
          <Row style={{ padding: '10px 5px' }}>
            <Col span={12}>
              <div style={{ display: 'inline-flex' }}>
                <div style={{ fontSize: '1.2rem', color: 'gray' }}>Status:</div>
                <div
                  style={{
                    fontSize: '1.2rem',
                    fontWeight: 600,
                    paddingLeft: 25,
                  }}
                >
                  {this.renderStatus(selectedItem.status)}
                </div>
              </div>
            </Col>
          </Row>
          <Row style={{ padding: '10px 5px' }}>
            <Col span={24}>
              <div
                style={{
                  minHeight: '20px',
                  height: '160px',
                  borderLeft: '5px solid #2196f3',
                  borderRadius: '5px',
                  background: '#f3f3f3',
                  marginLeft: '5px',
                }}
              >
                <div
                  style={{
                    padding: '10px 10px 10px 15px',
                    fontSize: '1rem',
                  }}
                >
                  new
                </div>
              </div>
            </Col>
          </Row>
          <Divider orientation='center'>
            <h3 style={{ color: '#888888' }}>
              <EditFilled style={{ paddingRight: '15px' }} />
              My Notes
            </h3>
          </Divider>
          <Row style={{ padding: '10px 0px' }}>
            <Col span={24}>
              <div
                style={{
                  minHeight: '20px',
                  height: '160px',
                  border: '1px solid #dcdcdc',
                  borderRadius: '5px',
                  background: '#f3f3f3',
                }}
              >
                <div
                  style={{
                    padding: '10px 10px 10px 15px',
                    fontSize: '1rem',
                  }}
                ></div>
              </div>
            </Col>
          </Row>
        </Form>
      </Drawer>
    );
  };
  selectedItems = (items) => {
    console.log('clicked item selection');
    // return {
    //   onChange: (selectedRowKeys) => {
    //     console.log('this state items', selectedRowKeys);
    //   },
    // };
  };

  // rowSelection object indicates the need for row selection
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      this.setState({ deletedItmes: selectedRowKeys });
      //console.log('this state items', selectedRowKeys);
    },
    // onSelect: (record, selected, selectedRows) => {
    //   console.log(record, selected, selectedRows);
    // },
    // onSelectAll: (selected, selectedRows, changeRows) => {
    //   console.log(selected, selectedRows, changeRows);
    // },
    // getCheckboxProps: (record) => ({
    //   disabled: record.name === 'Disabled User', // Column configuration not to be checked
    // }),
  };
  getSeletedItems() {
    // console.log('current ', this.state.deletedItmes);
    this.props.deleteTodo(this.state.deletedItmes);
  }
  render() {
    //console.log('get todos', this.props.todos);
    return (
      <div>
        <div className='cdcontent'>
          <div>
            <h1>Todos</h1>
          </div>
          <div>
            <Tabs defaultActiveKey='1'>
              <TabPane
                tab={
                  <span>
                    <SnippetsOutlined />
                    Task List
                  </span>
                }
                key='1'
              >
                <div
                  style={{
                    display: 'flex',
                    padding: '20px 0px 30px 10px',
                  }}
                >
                  <Button type='primary' onClick={this.showModal}>
                    <PlusOutlined />
                    New Task
                  </Button>
                  <Button
                    onClick={() => this.getSeletedItems()}
                    style={{ marginLeft: 10 }}
                  >
                    <DeleteFilled />
                    Delete Selected
                  </Button>
                  <Button style={{ marginLeft: 10 }}>
                    <DeleteFilled />
                    Finish Selected
                  </Button>
                  <div style={{ marginLeft: 'auto' }}>
                    <Tooltip
                      title='Table View'
                      color={localStorage.getItem('themeColor')}
                    >
                      <Button>
                        <TableOutlined />
                      </Button>
                    </Tooltip>
                    <Tooltip
                      title='Card View'
                      color={localStorage.getItem('themeColor')}
                    >
                      <Button>
                        <LayoutFilled />
                      </Button>
                    </Tooltip>
                    <Tooltip
                      title='Filter'
                      color={localStorage.getItem('themeColor')}
                    >
                      <Button>
                        <FilterFilled />
                      </Button>
                    </Tooltip>
                  </div>
                </div>

                <Table
                  size='middle'
                  pagination={{
                    position: ['bottomRight'],
                    defaultPageSize: 10,
                    showSizeChanger: true,
                    pageSizeOptions: ['10', '20', '30', '100'],
                  }}
                  rowSelection={this.rowSelection}
                  dataSource={this.props.todos}
                  columns={this.columns}
                />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <CalendarOutlined />
                    Calendar
                  </span>
                }
                key='2'
              >
                <TodoCalendar todo={this.props.todos} />
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <LineChartOutlined />
                    Analytics
                  </span>
                }
                key='4'
              >
                <Row gutter={[38, 8]}>
                  <Col xxl={6} xl={12} lg={18} md={18} sm={24} xs={24}>
                    <div style={{ background: 'white', borderRadius: '15px' }}>
                      <div
                        style={{
                          textAlign: 'center',
                          fontSize: '1.2rem',
                          fontWeight: 'bold',
                          padding: 10,
                        }}
                      >
                        Task Summary
                      </div>
                      <Divider style={{ marginTop: 0 }}></Divider>
                      <div
                        style={{
                          height: '200px',
                          width: '100%',
                          padding: '20px',
                        }}
                      >
                        <Chart
                          type={'donut'}
                          width={'100%'}
                          height={'100%'}
                          options={this.state.options}
                          series={this.state.series}
                          style={{ padding: '0px 20px' }}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col xxl={6} xl={12} lg={18} md={18} sm={24} xs={24}>
                    <div style={{ background: 'white', borderRadius: '15px' }}>
                      <div
                        style={{
                          textAlign: 'center',
                          fontSize: '1.2rem',
                          fontWeight: 'bold',

                          padding: 10,
                        }}
                      >
                        Categories
                      </div>
                      <Divider style={{ marginTop: 0 }}></Divider>
                      <div style={{ height: '200px', width: '100%' }}>
                        <Chart
                          options={this.props.charts[0].options}
                          series={this.props.charts[0].series}
                          type='radialBar'
                          width={'100%'}
                          height={'100%'}
                        />
                      </div>
                    </div>
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          </div>
        </div>
        <Create
          visible={this.state.isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        />
        {this.renderDrawer(this.state.selectedItem)}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    todos: state.todos.payload,
    charts: state.statisticsChart,
  };
};
export default connect(mapStateToProps, { getTodos, deleteTodo, addTodo })(
  index
);
