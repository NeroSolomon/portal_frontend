import React from 'react';
import User from 'service/user-service.js';
import Mutil from 'util/mm.js';
import { Link } from 'react-router-dom';

const _user = new User();
const _mm = new Mutil();

class TopNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: _mm.getStorage('userinfo').username || ''
    }
  }

  onLogout() {
    // _user.Logout().then(res => {
    //   _mm.removeStorage('userinfo');
    //   window.location.href = '/login';
    // }, errMsg => {
    //   _mm.errorTips(errMsg);
    // })
  }

  render() {
    const {username} = this.state;
    return (
      <div className="navbar navbar-default top-navbar">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/"><b>HAPPY</b>Nero</Link>
        </div>

        <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown">
            <a className="dropdown-toggle" href="javascript:;">
              <i className="fa fa-user fa-fw"></i>
              <span>欢迎{username}</span>
              <i className="fa fa-caret-down"></i>
            </a>
            <ul className="dropdown-menu dropdown-user">
              <li><a href="javascript:;" onClick={() => this.onLogout.call(this)}><i className="fa fa-sign-out fa-fw"></i> Logout</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
}

export default TopNav;