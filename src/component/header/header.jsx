import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Dropdown } from 'antd';
import { SmileFilled, DownOutlined } from '@ant-design/icons';
import MyService from '../../service/request.jsx';
import LoginService from '../../service/login-service.jsx';
const ms = new MyService();
const ls = new LoginService();
import './header.scss';

export default class Header extends Component{
  constructor(props){
    super(props);
    this.state = {
      tel: ms.getStorage('userTel')
    }
  }
  onLogout(){
    ls.logout().then(res => {
      ms.removeStorage('userTel');
    }, errMsg => {
      ms.errorTips(errMsg)
    })
  }
  render(){
  	const menu=(
      <Menu>
        <Menu.Item>
          <Link to="/login" onClick={this.onLogout}>
            退出登录
          </Link>
        </Menu.Item>
      </Menu>
    );
    return(
      <header className="site-layout-header">
      {
        this.state.tel
        ?(<Dropdown overlay={menu}>
            <a className="ant-dropdown-link">
              <SmileFilled />
              <span>管理员:{this.state.tel}</span>
              <DownOutlined />
            </a>
          </Dropdown>)
        :<Link to="/login" className="ant-dropdown-link">Login</Link>
      }
      </header>
    );
  }
}