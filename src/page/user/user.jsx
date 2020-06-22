import React, { Component } from 'react';
import { Table } from 'antd';
import MyService from '../../service/request.jsx';
import UserService from '../../service/user-service.jsx';
const ms = new MyService();
const us = new UserService();

export default class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
      list: [],
      count: 1,
      pageNum: 1
    };
	}
  componentDidMount() {
    this.loadUserList();
  }
  loadUserList() {
    us.getUserList(this.state.pageNum).then(res => {
      this.setState({
        count: res.count,
        list: res.rows
      });
    }, errMsg => {
      ms.errorTips(errMsg)
    })
  }
  onPageNumChange(pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadUserList();
    });
  }
	render() {
    const columns = [
      {
        title: 'Id',
        dataIndex: 'id',
        key: 'u_id'
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'u_name'
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'u_address'
      },
      {
        title: 'Phone',
        dataIndex: 'tel',
        key: 'u_tel'
      },
      {
        title: 'Created Time',
        dataIndex: 'createdAt',
        key: 'u_createdtime'
      }
    ];
		return (
			<Table
        columns={columns}
        dataSource={this.state.list}
        rowKey={(record, index)=>index}
        pagination={{
          pageSize: 10,
          position: ['bottomCenter'],
          showSizeChanger: false,
          total: this.state.count,
          onChange: (pageNum)=>this.onPageNumChange(pageNum)
        }}
      />
		);
	}
}