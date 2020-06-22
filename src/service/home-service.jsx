import MyService from './request.jsx';
const ms = new MyService();

export default class HomeService {
  // 首页数据统计
  getHomeCount(){
    return ms.request({
      url: '/manage/statistic'
    });
  }
}