import Mutil from 'util/mm.js';

const _mm = new Mutil();

class User {
  Login(loginInfo) {
    const { username, password } = loginInfo;
    return _mm.request({
      type: 'post',
      url: '/manage/user/login.do',
      data: {
        username,
        password
      }
    })
  }

  Logout() {
    return _mm.request({
      type: 'post',
      url: '/user/logout.do'
    })
  }

  getUserList(pageNum) {
    return _mm.request({
      type: 'post',
      url: '/manage/user/list.do',
      data: {
        pageNum
      }
    })
  }

  checkLoginInfo(info) {
    const username = $.trim(info.username);
    const password = $.trim(info.password);
    if (typeof username !== 'string' || username.length === 0) {
      return {
        status: false,
        msg: '用户名不能为空'
      }
    }
    if (typeof password !== 'string' || password.length === 0) {
      return {
        status: false,
        msg: '密码不能为空'
      }
    }
    return {
      status: true,
      msg: '成功'
    }
  }
}

export default User;