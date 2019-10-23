import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import { Link } from 'react-router-dom';

class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div id="page-wrapper">
        <PageTitle title="出错了" />
        <div className="row">
          <div className="col-md-12">
            找不到该路径，
            <Link to="/">点我返回首页</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Error;