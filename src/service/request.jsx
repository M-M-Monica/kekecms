import axios from 'axios';

export default class MyService {
  request(param) {
    return new Promise((resolve, reject) => {
      axios({
        method: param.method || 'get',
        url: param.url || '',
        dataType: param.dataType || 'json',
        data: param.data || null,
      }).then(res => {
        if(res.status === 200){
          resolve(res.data);
        }else if(res.status === 403){
          this.doLogin();
        }else{
          reject(res.msg);
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
  // 跳转登录
  doLogin() {
    window.location.href = '/login';
  }
  // 错误提示
  errorTips(errMsg){
    alert(errMsg || '出错啦！');
  }
  // 本地存储
  setStorage(name, data) {
    let dataType = typeof data;
    // json对象
    if(dataType === 'object') {
      window.sessionStorage.setItem(name, JSON.stringify(data));
    }else if(['number','string','boolean'].indexOf(dataType) >= 0) {
      window.sessionStorage.setItem(name, data);
    }else {// 其他类型
      alert('该类型不能用于本地存储');
    }
  }
  // 取出本地存储内容
  getStorage(name) {
    let data = window.sessionStorage.getItem(name);
    if(data) {
      return JSON.parse(data);
    }else {
      return '';
    }
  }
  // 删除本地存储
  removeStorage(name) {
    window.sessionStorage.removeItem(name);
  }
}