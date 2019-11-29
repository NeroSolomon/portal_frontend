import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import { Link } from 'react-router-dom';
import Mutil from 'util/mm.js';
import Statistic from 'service/statistic-service.js';

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

  render () {
    const {
      userCount,
      productCount,
      orderCount
    } = this.state;

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
      </div>
    );
  }
}

export default Home;