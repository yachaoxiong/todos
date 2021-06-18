import React, { Component } from 'react';
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  GithubOutlined,
} from '@ant-design/icons';
// import Title from 'antd/lib/skeleton/Title';

const { Header } = Layout;

class header extends Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          position: 'absolute',
          top: 0,
          WebkitFlexWrap: 'wrap',
          flexWrap: 'wrap ',
        }}
      >
        <Header
          className='header'
          style={{
            position: 'fixed',
            zIndex: 99,
            width: '100%',
            display: 'flex',
            // display: '-webkit-flexbox',
          }}
        >
          {React.createElement(
            this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: 'trigger',
              onClick: this.props.toggle,
            }
          )}

          <img
            alt='HOME'
            style={{ padding: 10, width: '220px' }}
            src={require('../../images/TODO.svg').default}
          />

          <div
            style={{
              diplay: 'flex',
              marginLeft: 'auto',
              color: 'inherit',
              marginRight: 20,
            }}
          >
            <h3>
              <GithubOutlined style={{ marginRight: 10 }} />
              Developed by Eric
            </h3>
          </div>
        </Header>
      </div>
    );
  }
}

export default header;
