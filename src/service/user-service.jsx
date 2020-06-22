import MService from './request.jsx';
const ms = new MService();

export default class UserService {
  getUserList(pageNum) {
    return ms.request({
      method: 'post',
      url: '/manage/user/list',
      data: {
        pageNum
      }
    });
  }
}