import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Input, Space, Tag } from 'antd';
const { Search } = Input;
import MyService from '../../service/request.jsx';
import OrderService from '../../service/order-service.jsx';
const ms = new MyService();
const os = new OrderService();
import './order.scss';

export default class Order extends Component {
	constructor(props) {
		super(props);
		this.state = {
      list: [],
      count: 1,
      pageNum: 1,
      listType: 'list'
    };
	}
  componentDidMount() {
    this.loadOrderList();
  }
  // 加载商品列表
  loadOrderList() {
    let listParam = {
      listType: this.state.listType,
      pageNum: this.state.pageNum
    };
    if(this.state.listType === 'search') {
      listParam.orderId = this.state.orderId;
    }
    os.getOrderList(listParam).then(res => {
      this.setState({
        count: res.count,
        list: res.rows
      });
    }, errMsg => {
      ms.errorTips(errMsg)
    });
  }
  // 搜索
  onSearch(orderId) {
    this.setState({
      listType: 'search',
      pageNum: 1,
      orderId: orderId
    },() => {
      this.loadOrderList();
    });
  }
  // 页数发生变化的时候
  onPageNumChange(pageNum) {
    this.setState({
      pageNum : pageNum
    }, () => {
      this.loadOrderList();
    });
  }
  onSendGoods(orderId){
    if(window.confirm('订单已发货？')){
      os.sendGoods(orderId).then((res) => {
        this.loadOrderList();
      });
    }
  }
	render() {
    const columns = [
      {
        title: 'Order Id',
        dataIndex: 'id',
        key: 'o_id'
      },
      {
        title: 'User Id',
        dataIndex: 'CustomerId',
        key: 'o_user'
      },
      {
        title: 'Order Status',
        dataIndex: 'status',
        key: 'o_status',
        render: (status) => {
          let color = '',
              text = ''
          if (status === 1) {
            color = 'volcano';
            text = '未支付'
          }else if (status === 2){
            color = 'geekblue';
            text = '已支付'
          }else if (status === 3){
            color = 'green';
            text = '已完成'
          }
          return (
            <Tag color={color} key={status}>
              {text}
            </Tag>
          )
        }
      },
      {
        title: 'Total Price',
        dataIndex: 'total',
        key: 'o_total'
      },
      {
        title: 'Created Time',
        dataIndex: 'createdAt',
        key: 'o_createdtime'
      },
      {
        title: 'Action',
        render: (record) => (
          <Space size="middle">
            <a onClick={()=>this.onSendGoods(record.id)}>Send</a>
            <Link to={`/order/detail/${record.id}`}>Detail</Link>
          </Space>
        )
      },
    ];
		return (
			<div>
		    <Search
          size="middle"
          addonBefore="按订单号查询"
          enterButton="Search"
          onSearch={(orderId)=>{this.onSearch(orderId)}}
        />
				<Table
          columns={columns}
          dataSource={this.state.list}
          rowKey={(record, index)=>index}
          pagination={{
            current: this.state.pageNum,
            pageSize: 10,
            position: ['bottomCenter'],
            total: this.state.count,
            onChange: (pageNum)=>this.onPageNumChange(pageNum)
          }}
        />
			</div>
		);
	}
}