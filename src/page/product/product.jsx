import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Table, Input, Space, Button } from 'antd';
const { Search } = Input;
import MyService from '../../service/request.jsx';
import ProductService from '../../service/product-service.jsx';
const ms = new MyService();
const ps = new ProductService();
import './product.scss';

export default class Product extends Component {
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
    this.loadProductList();
  }
  // 加载商品列表
  loadProductList() {
    let listParam = {
      listType: this.state.listType,
      pageNum: this.state.pageNum
    };
    if(this.state.listType === 'search') {
      listParam.name = this.state.name;
    }
    ps.getProductList(listParam).then(res => {
      this.setState({
        count: res.count,
        list: res.rows
      });
    }, errMsg => {
      ms.errorTips(errMsg)
    });
  }
  // 搜索
  onSearch(name) {
    this.setState({
      listType: 'search',
      pageNum: 1,
      name: name
    },() => {
      this.loadProductList();
    });
  }
  onPageNumChange(pageNum) {
    this.setState({
      pageNum: pageNum
    }, () => {
      this.loadProductList();
    });
  }  
  // 删除商品
  onDelete(productId) {
    if(window.confirm('确定删除该商品？')) {
      ps.deleteProduct(productId).then(res => {
        this.loadProductList();
      });
    }
  }
	render() {
    const columns = [
      {
        title: 'Product Id',
        dataIndex: 'id',
        key: 'p_id'
      },
      {
        title: 'Image',
        dataIndex: 'img',
        key: 'p_img',
        render: (imgUrl)=>{
          const local = 'http://localhost:3000' + imgUrl;
          return <img src={local}></img>
        }
      },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'p_name'
      },
      {
        title: 'Category',
        dataIndex: 'category',
        key: 'p_category'
      },
      {
        title: 'Price',
        dataIndex: 'price',
        key: 'p_price'
      },
      {
        title: 'Action',
        render: (record) => (
          <Space size="middle">
            <Link to={`/product/edit/${record.id}`}>Edit</Link>
            <a onClick={()=>this.onDelete(record.id)}>Delete</a>
          </Space>
        )
      }
    ];
		return (
			<div>
		    <Search
          size="middle"
          addonBefore="按商品名称查询"
          enterButton="Search"
          onSearch={(name)=>{this.onSearch(name)}}
        />
        <Link to="/product/edit">
          <Button type="primary" className="btn">添加商品</Button>
        </Link>
				<Table
          columns={columns}
          dataSource={this.state.list}
          rowKey={(record, index)=>index}
          pagination={{
            current: this.state.pageNum,
            pageSize: 8,
            position: ['bottomCenter'],
            total: this.state.count,
            onChange: (pageNum)=>this.onPageNumChange(pageNum)
          }}
        />
			</div>
		);
	}
}