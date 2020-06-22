import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { HomeOutlined, UserOutlined, UnorderedListOutlined, SnippetsOutlined } from '@ant-design/icons';
import './nav.scss';
import logo from '../../static/ke.png';

export default class Nav extends Component{
  constructor(props){
    super(props);
  }
  render(){
    return (
      <aside className="sider">
        <div className="sider-children">
          <div className="logo"><img src={logo}></img></div>
          <ul className="sider-menu" role="menu">
            <NavLink exact className="sider-menu-item" activeClassName="item-selected" to="/">
              <li>
                <HomeOutlined />
                首页
              </li>
            </NavLink>
            <NavLink className="sider-menu-item" activeClassName="item-selected" to="/user">
              <li>
                <UserOutlined />
                用户管理
              </li>
            </NavLink>
            <NavLink className="sider-menu-item" activeClassName="item-selected" to="/product">
              <li>
                <UnorderedListOutlined />
                商品管理
              </li>
            </NavLink>
            <NavLink className="sider-menu-item" activeClassName="item-selected" to="/order">
              <li>
                <SnippetsOutlined />
                订单管理
              </li>
            </NavLink>
          </ul>
        </div>
      </aside>
    );
  }
}