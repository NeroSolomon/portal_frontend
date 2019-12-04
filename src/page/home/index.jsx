import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import Mutil from 'util/mm.js';
import PageTitle from 'component/page-title/index.jsx';
import Statistic from 'service/statistic-service.js';
import { requestLogin } from 'actions/auth.js';
import { storeTest } from 'actions/test-store.js';

import './index.scss';

const _mm = new Mutil();
const _statistic = new Statistic();

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      usercount: '-',
      productcount: '-',
      ordercount: '-'
    }
  }

  componentDidMount() {
    this.loadCount();
  }

  loadCount() {
    // _statistic.getHomeCount().then(res => {
    //   this.setState(res);
    // }, err => {
    //   _mm.errorTips(err);
    // })
  }

  onChangeState() {
    const { dispatch } = this.props;
    dispatch(requestLogin());
    dispatch(storeTest());
  }

  render () {
    const {
      userCount,
      productCount,
      orderCount
    } = this.state;
    const { auth, testStore } = this.props;
    console.log(auth);
    console.log(testStore);

    return (
      <div id="page-wrapper">
        <PageTitle title="首页"/>
        <div className="row">
          <div className="col-md-4">
            <Link to="/newuser" className="color-box brown">
              <p className="count">{userCount}</p>
              <p className="desc">
                <i className="fa fa-user-o"></i>
                <span>用户总数</span>
              </p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/product" className="color-box green">
              <p className="count">{productCount}</p>
              <p className="desc">
                <i className="fa fa-list"></i>
                <span>商品总数</span>
              </p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/order" className="color-box blue">
              <p className="count">{orderCount}</p>
              <p className="desc">
                <i className="fa fa-check-square-o"></i>
                <span>订单总数</span>
              </p>
            </Link>
          </div>
        </div>
        <div>
          <button onClick={this.onChangeState.bind(this)}>change auth state</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { auth, testStore } = state;
  return {auth, testStore}
}


export default connect(mapStateToProps)(Home);