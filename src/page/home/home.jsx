import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Statistic, Card, Row, Col, Typography } from 'antd';
import { UserOutlined, UnorderedListOutlined, SnippetsOutlined } from '@ant-design/icons';
const { Title } = Typography;
import MyService from '../../service/request.jsx';
import HomeService from '../../service/home-service.jsx';
const ms = new MyService();
const hs = new HomeService();
import './home.scss';

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
      customer: '',
      product: '',
      order: ''
    }
	}
	componentDidMount() {
    this.loadCount();
  }
  loadCount() {
    hs.getHomeCount().then(res => {
      this.setState({
      	customer: res[0].customer,
      	product: res[0].product,
      	order: res[0].order
      });
    }, errMsg => {
    	ms.errorTips(errMsg)
    })
  }
	render() {
		return (
			<div className="site-statistic-demo-card">
		    <Row gutter={[8, 16]} justify="center">
		      <Col span={14}>
			      <Link to="/user">
			        <Card>
			        	<Title level={3}>用户数量</Title>
			          <Statistic
			            value={this.state.customer}
			            valueStyle={{color: '#4cb3d2'}}
			            prefix={<UserOutlined />}
			          />
			        </Card>
			       </Link>
		      </Col>
		      <Col span={14}>
			      <Link to="/product">
			        <Card>
			        	<Title level={3}>商品数量</Title>
			          <Statistic
			            value={this.state.product}
			            valueStyle={{color: '#efa51e'}}
			            prefix={<UnorderedListOutlined />}
			          />
			        </Card>
		        </Link>
		      </Col>
		      <Col span={14}>
		      	<Link to="/order">
			        <Card>
			        	<Title level={3}>订单数量</Title>
			          <Statistic
			            value={this.state.order}
			            valueStyle={{color: '#ff843d'}}
			            prefix={<SnippetsOutlined />}
			          />
			        </Card>
			       </Link>
		      </Col>
		    </Row>
		  </div>
		);
	}
}
