import MService from './request.jsx';
const ms = new MService();

export default class ProductService {
  // 获取商品列表
  getProductList(listParam) {
    let url = '',
        data = {};
    if(listParam.listType === 'list'){
      url = '/manage/product/list';
      data.pageNum = listParam.pageNum;
    }else if(listParam.listType === 'search'){
      url = '/manage/product/search';
      data.name = listParam.name;
    }
    return ms.request({
      method: 'post',
      url: url,
      data: data
    });
  }
  // 获取商品详情
  getProductDetail(productId) {
    return ms.request({
      method: 'post',
      url: '/manage/product/detail',
      data: {
        id : productId
      }
    });
  }
  // 检查更新和添加商品的表单数据
  checkProduct(product) {
    let result = {
      status: true,
      msg: '验证通过'
    };
    if(typeof product.name !== 'string' || product.name.length ===0) {
      return {
        status: false,
        msg: '商品名称不能为空！'
      }
    }
    // 判断描述不能为空
    if(typeof product.description !== 'string' || product.description.length ===0) {
      return {
        status: false,
        msg: '商品描述不能为空！'
      }
    }
    // 判断商品价格为数字，且大于0
    if(typeof product.price !== 'number' || !(product.price >= 0)) {
      return {
        status: false,
        msg: '请输入正确的商品价格！'
      }
    }
    return result;
  }
  // 更新商品
  editProduct(productInfo) {
    return ms.request({
      method: 'post',
      url: '/manage/product/edit',
      data: productInfo
    });
  }
  // 删除商品
  deleteProduct(productId) {
    return ms.request({
      method: 'post',
      url: '/manage/product/delete',
      data: {
        id: productId
      }
    });
  }
  // 添加商品
  addProduct(productInfo) {
    return ms.request({
      method: 'post',
      url: '/manage/product/add',
      data: productInfo
    });
  }
}