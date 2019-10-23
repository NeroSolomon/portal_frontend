import React from 'react';
import { Link } from 'react-router-dom';
import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'component/pagination/index.jsx';
import MUtil from 'util/mm.js';
import User from 'service/user-service.js';

const _mm = new MUtil();
const _user = new User();

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    return (
      <div id="page-wrapper">
        <PageTitle title="用户列表" />
      </div>
    );
  }
}

export default Category;