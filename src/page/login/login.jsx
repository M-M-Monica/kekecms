import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
const { Item } = Form;
import MyService from '../../service/request.jsx';
import LoginService from '../../service/login-service.jsx';
const ms = new MyService();
const ls = new LoginService();
import './login.scss';

export default class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
      telephone: '',
      redirect: '/'
    };
    this.onFinish = this.onFinish.bind(this);
	}
  onFinish(values){
    let loginInfo = {
      tel: values.telephone,
      password: values.password
    },
    checkResult = ls.checkLoginInfo(loginInfo);
    if(checkResult.status) {
			ls.login(loginInfo).then(res => {
				let tel = loginInfo.tel
				ms.setStorage('userTel', tel);
				this.setState({
					telephone: tel
				});
				if (this.state.telephone) {
					this.props.history.push(this.state.redirect);
				}
  		}, errMsg => {
  			ms.errorTips(errMsg);
      })
    }else {
      ms.errorTips(checkResult.msg);
    }
	}
	render() {
		return (
			<div className="login-layout">
				<div className="border-layout">
					<Form
			      name="basic"
			      onFinish={this.onFinish}
		    	>
			      <Item
			        name="telephone"
			        rules={[
			          {
			            required: true,
			            message: 'Please input your telephone number!',
			          },
			        ]}
			      >
		        	<Input placeholder="Telephone"/>
		      	</Item>
			      <Item
			        name="password"
			        rules={[
			          {
			            required: true,
			            message: 'Please input your password!',
			          },
			        ]}
			      >
		        	<Input.Password placeholder="Password"/>
		      	</Item>
			      <Item>
			        <Button type="primary" htmlType="submit" className="login-btn">Sign in</Button>
			      </Item>
		    	</Form>
		    </div>
	    </div>
		);
	}
}
