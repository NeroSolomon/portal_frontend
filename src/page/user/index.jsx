import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'component/pagination/index.jsx';
import MUtil from 'util/mm.js';
import User from 'service/user-service.js';

const _mm = new MUtil();
const _user = new User();

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNum: 1
    };
  }

  componentDidMount() {
    this.loadUserList();
  }

  loadUserList() {
    const { pageNum } = this.state;
    // _user.getUserList(pageNum).then(res => {
    //   this.setState(res)
    // }, err => {
    //   this.setState({
    //     list: []
    //   })
    //   _mm.errorTips(err);
    // })
  }

  onPageNumChange(pageNum) {
    this.setState({
      pageNum
    }, () => {
      this.loadUserList();
    })
  }

  render () {
    const {
      list,
      pageNum,
      total
    } = this.state

    let listBody = list.map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.id}</td>
          <td>{item.username}</td>
          <td>{item.email}</td>
          <td>{item.phone}</td>
          <td>{new Date(item.createTime).toLocaleDateString()}</td>
        </tr>
      )
    })

    let listError = (
      <tr>
        <td colSpan="5" className="text-center">没有数据</td>
      </tr>
    )

    let tableBody = list.length > 0 ? listBody : listError;
    return (
      <div id="page-wrapper">
        <PageTitle title="用户列表" />
        <div className="row">
          <div className="col-md-12">
            <table className="table table-striped table-border">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>用户名</th>
                  <th>邮箱</th>
                  <th>电话</th>
                  <th>注册时间</th>
                </tr>
              </thead>
              <tbody>
                {tableBody}
              </tbody>
            </table>
          </div>
        </div>
        <Pagination current={pageNum} total={total} onChange={this.onPageNumChange.bind(this)}/>
      </div>
    );
  }
}

export default UserList;