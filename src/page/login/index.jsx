import React from 'react';
import User from 'service/user-service.js';
import Mutil from 'util/mm.js';
import { Helmet } from 'react-helmet';

import './index.scss';

const _user = new User();
const _mm = new Mutil();

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirect: _mm.getUrlParam('redirect') || '/'
    }
  }

  onChange(obj) {
    this.setState(obj)
  }

  onKeyUp(e) {
    if (e.keyCode === 13) {
      this.onSubmit(e);
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    const checkResult = _user.checkLoginInfo({username, password});
    if (!checkResult.status) {
      _mm.errorTips(checkResult.msg);
      return;
    };
    _user.Login({
      username,
      password
    }).then((res) => {
      _mm.setStorage('userinfo', res)
      this.props.history.push(this.state.redirect);
    }, (err) => {
      _mm.errorTips(err)
    })
  }

  render() {
    return (
      <div className="col-md-4 col-md-offset-4">
        <Helmet>
          <title>登录</title>
        </Helmet>
        <div className="panel panel-default login-panel">
          <div className="panel-heading">欢迎登录</div>
          <div className="panel-body">
            <form>
              <div className="form-group">
                <input type="text" className="form-control" placeholder="请输入用户名" onKeyUp={e => this.onKeyUp.call(this, e)} onChange={e => this.onChange.call(this, {username: e.target.value})} />
              </div>
              <div className="form-group">
                <input type="password" className="form-control" placeholder="请输入密码" onKeyUp={e => this.onKeyUp.call(this, e)} onChange={e => this.onChange.call(this, {password: e.target.value})} />
              </div>
              <button type="submit" className="btn btn-lg btn-primary btn-block" onClick={e => {this.onSubmit.call(this, e)}}>登录</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;