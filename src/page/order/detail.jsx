import React, { Component } from 'react';
import { Input, Table, Steps } from 'antd';
const { Group } = Input;
const { Step } = Steps;
import MyService from '../../service/request.jsx';
import OrderService from '../../service/order-service.jsx';
const ms = new MyService();
const os = new OrderService();
import './detail.scss';

export default class OrderDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
      data: [],
      orderId: this.props.match.params.orderId,
      step: 1,
      total: 0,
      customer: {},
      product: [],
    }
	}
  componentDidMount(){
    this.loadOrderDetail();
  }
  // 加载商品详情
  loadOrderDetail(){
    os.getOrderDetail(this.state.orderId).then(res => {
      const products = res.Products
      products.forEach((item)=>{
        item.count = item.OrderList.count
      })
      this.setState({
        step: res.status,
        total: res.total,
        customer: res.Customer,
        product: products
      });
    }, errMsg => {
      ms.errorTips(errMsg)
    })
  }
	render() {
    const columns = [
      {
        title: 'Image',
        dataIndex: 'img',
        key: 'o_img',
        render: (imgUrl)=>{
          const local = 'http://localhost:3000' + imgUrl;
          return <img src={local}></img>
        }
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'o_name'
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'o_category'
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'o_price'
      },
      {
        title: 'Count',
        dataIndex: 'count',
        key: 'o_count'
      },
      {
        title: 'Total Price',
        dataIndex: 'price',
        key: 'ot_price',
        render: (price, record)=>{
          return <div>{price*record.count}</div>
        }
      }
    ];
		return (
			<div>
		    <Steps size="small" current={this.state.step}>
			    <Step title="未支付" />
			    <Step title="已支付" />
			    <Step title="已完成" />
		    </Steps>
        <Group>
  		    <Input addonBefore="OrderId" disabled value={this.state.orderId}/>
  		    <Input addonBefore="User" disabled value={this.state.customer.name}/>
  		    <Input addonBefore="Address" disabled value={this.state.customer.address}/>
  		    <Input addonBefore="Phone" disabled value={this.state.customer.tel}/>
  		  </Group>
        <div className="total">Total Price:￥{this.state.total}</div>
        <Table
          columns={columns}
          dataSource={this.state.product}
          rowKey={(record, index)=>index}
          pagination={{position: ['bottomCenter'], pageSize: 4}}
        />
			</div>
		);
	}
}