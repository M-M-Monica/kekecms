import MService from './request.jsx';
const ms = new MService();

export default class OrderService {
  // 获取订单列表
  getOrderList(listParam) {
    let url = '',
        data = {};
    if(listParam.listType === 'list'){
      url = '/manage/order/list';
      data.pageNum = listParam.pageNum;
    }else if(listParam.listType === 'search'){
      url = '/manage/order/search';
      data.id = listParam.orderId;
    }
    return ms.request({
      method: 'post',
      url: url,
      data: data
    });
  }
  // 获取订单详情
  getOrderDetail(orderId) {
    return ms.request({
      method: 'post',
      url: '/manage/order/detail',
      data: {
        id: orderId
      }
    });
  }
  // 改变订单状态
  sendGoods(orderId) {
    return ms.request({
      method: 'post',
      url: '/manage/order/send',
      data: {
        id : orderId
      }
    });
  }
}