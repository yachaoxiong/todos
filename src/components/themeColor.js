import React, { Component } from 'react';
import { Row, Button, Tabs, message, Divider } from 'antd';
import { AreaChartOutlined, UploadOutlined } from '@ant-design/icons';
import {
  red,
  volcano,
  orange,
  cyan,
  blue,
  purple,
  magenta,
} from '@ant-design/colors';
const { TabPane } = Tabs;
class themeColor extends Component {
  state = {
    defaultColor: localStorage.getItem('themeColor'),
    colors: [
      {
        name: 'Orange',
        values: [
          orange[3],
          orange[4],
          orange[5],
          orange[6],
          orange[7],
          orange[8],
          orange[9],
        ],
      },
      {
        name: 'Volcano',
        values: [
          volcano[3],
          volcano[4],
          volcano[5],
          volcano[6],
          volcano[7],
          volcano[8],
          volcano[9],
        ],
      },
      {
        name: 'Red',
        values: [red[3], red[4], red[5], red[6], red[7], red[8], red[9]],
      },
      {
        name: 'Cyan',
        values: [cyan[3], cyan[4], cyan[5], cyan[6], cyan[7], cyan[8], cyan[9]],
      },
      {
        name: 'Blue',
        values: [blue[3], blue[4], blue[5], blue[6], blue[7], blue[8], blue[9]],
      },
      {
        name: 'Purple',
        values: [
          purple[3],
          purple[4],
          purple[5],
          purple[6],
          purple[7],
          purple[8],
          purple[9],
        ],
      },
      {
        name: 'Magenta',
        values: [
          magenta[3],
          magenta[4],
          magenta[5],
          magenta[6],
          magenta[7],
          magenta[8],
          magenta[9],
        ],
      },
    ],
  };
  renderColorList() {
    let { colors } = this.state;
    return colors.map((c, index) => {
      // console.log('index is ', index);
      return (
        <div key={index}>
          <Divider
            orientation='left'
            style={{ fontWeight: 600, fontSize: '1.1rem' }}
          >
            {c.name}
          </Divider>
          <Row style={{ padding: 10 }}>{this.renderColors(c.values)}</Row>
        </div>
      );
    });
  }

  renderColors = (values) => {
    return values.map((c) => {
      if (c === this.state.defaultColor) {
        return (
          <div key={c}>
            <Button type='link' onClick={() => this.handleSwitchChange(c)}>
              <div
                className='theme-color-item'
                style={{
                  height: '50px',
                  width: '100px',
                  background: c,
                  borderRadius: '20px',
                  boxShadow: `0px 0px 0px 8px ${
                    this.state.defaultColor + '42'
                  }`,
                }}
              ></div>
            </Button>
          </div>
        );
      } else {
        return (
          <div key={c}>
            <Button type='link' onClick={() => this.handleSwitchChange(c)}>
              <div
                className='theme-color-item'
                style={{
                  height: '50px',
                  width: '100px',
                  background: c,
                  borderRadius: '20px',
                }}
              ></div>
            </Button>
          </div>
        );
      }
    });
  };
  renderCurrentColor(color) {
    return (
      <div style={{ display: 'inline-flex' }}>
        <div
          style={{
            fontWeight: 600,
            fontSize: '1rem',
            padding: '15px 0px 5px 7px',
          }}
        >
          Current :
        </div>
        <div
          style={{
            height: '50px',
            width: '160px',
            background: color,
            borderRadius: '20px',
            marginLeft: 10,
          }}
        ></div>
      </div>
    );
  }
  handleSwitchChange = (color) => {
    localStorage.setItem('themeColor', color);
    this.setState({ defaultColor: color });
    //less variables that will be used here must be declared in themeVariables on config-overrides.js
    window.less
      .modifyVars({
        '@primary-color': color,
      })
      .then(() => {
        message.success({
          content: 'Color changed!',
          style: {
            marginTop: '5vh',
          },
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  render() {
    return (
      <div className='cdcontent'>
        <div>
          <h1>Setting</h1>
        </div>
        <div>
          <Tabs defaultActiveKey='1' style={{ paddingTop: '1px' }}>
            <TabPane
              tab={
                <span>
                  <UploadOutlined />
                  Theme Color
                </span>
              }
              key='1'
            >
              {this.renderCurrentColor(this.state.defaultColor)}
              {this.renderColorList()}
            </TabPane>
            <TabPane
              tab={
                <span>
                  <AreaChartOutlined />
                  Tab 2
                </span>
              }
              key='2'
            >
              Tab 2
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default themeColor;
