import React from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { CarryOutOutlined, HomeFilled, SettingFilled } from '@ant-design/icons';

const { Sider } = Layout;

class Siderbar extends React.Component {
  render() {
    return (
      <Sider
        style={{
          height: '100%',
          position: 'fixed',
          top: 0,
          marginTop: '64px',
          zIndex: 3,
          background: '#e8e8e8',
        }}
        trigger={null}
        collapsible
        collapsed={this.props.collapsed}
      >
        <Menu
          onMouseEnter={() => this.props.open()}
          onMouseLeave={() => this.props.close()}
          mode='inline'
          defaultSelectedKeys={['1']}
          style={{ background: 'inherit', borderRight: 0, marginTop: 5 }}
        >
          <Menu.Item key='1' icon={<HomeFilled />}>
            <Link className='nav-link' to='/dashboard'>
              Dashboard
            </Link>
          </Menu.Item>
          <Menu.Item key='2' icon={<CarryOutOutlined />}>
            <Link className='nav-link' to='/todos'>
              Todos
            </Link>
          </Menu.Item>
          <Menu.Item key='3' icon={<SettingFilled />}>
            <Link className='nav-link' to='/setting'>
              Setting
            </Link>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

export default Siderbar;
