import { Col, Row } from 'antd';
import { connect } from 'react-redux';
import React, { Component } from 'react';

import {
  OrderedListOutlined,
  ProfileFilled,
  ClockCircleFilled,
  CheckSquareFilled,
} from '@ant-design/icons';
class card extends Component {
  renderIcon(icon) {
    switch (icon) {
      case 'OrderedListOutlined':
        return <OrderedListOutlined />;
      case 'ProfileFilled':
        return <ProfileFilled />;
      case 'ClockCircleFilled':
        return <ClockCircleFilled />;
      case 'CheckSquareFilled':
        return <CheckSquareFilled />;
      default:
        return '';
    }
  }
  renderCards() {
    return this.props.cards.map((c) => {
      return (
        //<Col >
        <div key={c.key} className='dashboard-card' style={{ width: '100%' }}>
          <Row style={{ padding: '20px 0px 20px 40px' }}>
            <Col span={12}>
              <p style={{ color: '#ff8882' }}>{c.title}</p>
              <h1 style={{ marginBottom: 0, fontSize: '2rem' }}>{c.value}</h1>
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
                {this.renderIcon(c.icon)}
              </div>
            </Col>
          </Row>
        </div>
        //</Col>
      );
    });
  }
  render() {
    return (
      <Row gutter={[18, 20]} style={{ marginBottom: 20 }}>
        {this.renderCards()}
      </Row>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cards: state.cards,
  };
};
export default connect(mapStateToProps)(card);
