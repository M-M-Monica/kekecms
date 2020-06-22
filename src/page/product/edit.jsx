import React, { Component } from 'react';
import { Input, Table, Steps, Select, Upload, message, Button } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
const { Group, TextArea } = Input;
const { Step } = Steps;
const { Option } = Select;
import MyService from '../../service/request.jsx';
import ProductService from '../../service/product-service.jsx';
const ms = new MyService();
const ps = new ProductService();
import './edit.scss';

function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
}

export default class ProductDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productId: this.props.match.params.productId,
      loading: false,
      category: 'drinks',
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    this.loadProduct();
  }
  // 加载商品
  loadProduct() {
    if(this.state.productId) {
      ps.getProductDetail(this.state.productId).then(res => {
        this.setState({
          name: res.name,
          category: res.category,
          price: res.price,
          description: res.description,
          img: res.img
        });
      }, errMsg => {
        ms.errorTips(errMsg)
      })
    }
  }
  // 编辑商品
  onValueChange(e) {
    let name = e.target.name,
        value = e.target.value.trim();
    this.setState({
      [name]: value
    });
  }
  onSelectChange(e) {
    let value = e;
    this.setState({
      category: value
    });
  } 
  // 提交表单
  onSubmit(){
    let productInfo = {
      name: this.state.name,
      category: this.state.category,
      price: parseInt(this.state.price),
      description: this.state.description,
      img: this.state.img
    }
    let productCheckResult = ps.checkProduct(productInfo);
    if(this.state.productId) {
      productInfo.id = this.state.productId;
      if(productCheckResult.status) {
        ps.editProduct(productInfo).then((res) => {
          this.props.history.push('/product');
        })
      }
    }
    if(!this.state.productId) {
      if(productCheckResult.status) {
        ps.addProduct(productInfo).then((res) => {
          this.props.history.push('/product');
        })
      }
    }
  }
  handleChange(info){
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      this.setState({
        img: info.file.response.imgUrl,
        loading: false,
      })
    }
  };

  render() {
    const uploadButton = (
      <div>
        {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="center-input">
        <Group>
          <Input
            name="name"
            className="product-input"
            addonBefore="商品名称"
            value={this.state.name}
            onChange={(e) => this.onValueChange(e)}
          />
          <Select
            defaultValue="drinks"
            value={this.state.category}
            onChange={(e) => this.onSelectChange(e)}
          >
            <Option value="drinks">drinks</Option>
            <Option value="dessert">dessert</Option>
          </Select>
          <Input
            name="price"
            className="product-input"
            addonBefore="商品价格"
            addonAfter="RMB"
            value={this.state.price}
            onChange={(e) => this.onValueChange(e)}
          />
          <TextArea
            name="description"
            rows={4}
            value={this.state.description}
            onChange={(e) => this.onValueChange(e)}
          />
        </Group>
         <Upload
            name="avatar"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action="/manage/product/upload"
            beforeUpload={beforeUpload}
            onChange={this.handleChange}
          >
            {this.state.img ? <img src={`http://localhost:3000${this.state.img}`} /> : uploadButton}
          </Upload>
          <Button type="primary" className="submit-btn" onClick={this.onSubmit}>提交</Button> 
      </div>
    );
  }
}