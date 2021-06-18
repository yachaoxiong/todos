import React, { Component } from 'react';
import Sidebard from './shared/sidebar';
import Header from './shared/header';
import Dashboard from './dashboard';
import Todo from './todos/index';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ThemeColor from './themeColor';
import './app.less';

class app extends Component {
  state = {
    collapsed: true,
  };
  closeSideBar = () => {
    this.setState({
      collapsed: true,
    });
  };
  openSideBar = () => {
    this.setState({
      collapsed: false,
    });
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  render() {
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header toggle={this.toggle} collapsed={this.state.collapsed} />
            <Sidebard
              close={this.closeSideBar}
              open={this.openSideBar}
              collapsed={this.state.collapsed}
            />
            <Switch>
              <Route path='/' exact component={Dashboard} />
              <Route path='/todos' exact component={Todo} />
              <Route path='/setting' exact component={ThemeColor} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default app;
