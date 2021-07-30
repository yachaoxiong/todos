import React, { Component } from 'react';
import { Layout, Button, Tooltip } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  GithubOutlined,
} from '@ant-design/icons';
// import Title from 'antd/lib/skeleton/Title';

const { Header } = Layout;

class header extends Component {
  onClick(link) {
    window.open(link, '_blank'); //to open new page
  }
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
            <Tooltip placement='bottom' title='See My Personal Web App '>
              <Button
                type='link'
                onClick={() => this.onClick('https://yachao.vercel.app')}
                style={{ fontSize: '1.12rem' }}
              >
                Developed by Yachao
              </Button>
            </Tooltip>

            <Button
              type='link'
              onClick={() => this.onClick('https://github.com/yachaoxiong')}
              style={{ fontSize: '1.12rem' }}
            >
              <GithubOutlined style={{ marginRight: 0 }} />
            </Button>
          </div>
        </Header>
      </div>
    );
  }
}

export default header;
