import React from 'react';
import { Link } from 'react-router-dom';

import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'component/pagination/index.jsx';
import TableList from 'component/table-list/index.jsx'

import MUtil from 'util/mm.js';
import Product from 'service/product-service.js';

import './index.scss';

const _mm = new MUtil();
const _product = new Product();

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      pageNum: 1
    };
  }

  componentDidMount() {
    this.loadProductList.call(this);
  }

  loadProductList() {
    const { pageNum } = this.state;
    _product.getProductList(pageNum).then(res => {
      this.setState(res)
    }, err => {
      this.setState({
        list: []
      })
      _mm.errorTips(err);
    })
  }

  onPageNumChange(pageNum) {
    this.setState({
      pageNum
    }, () => {
      this.loadUserList();
    })
  }

  onSetProductStatus(e, id, status) {
    console.log(id);
    let newStatus = status == 1 ? 2 : 1,
    tips = status == 1 ? '确定下架该商品' : '确认上架该商品？';
    if (window.confirm(tips)) {
      _product.setProductStatus({
        productId: id,
        status: newStatus
      }).then(res => {
        _mm.successTips(res);
        this.loadProductList();
      }, err => {
        _mm.errorTips(err);
      })
    }
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
          <td>
            <p>{item.name}</p>
            <p>{item.subtitle}</p>
          </td>
          <td>
            ${item.price}
          </td>
          <td>
            <span>{item.status == 1 ? '在售' : '已下架'}</span>
            <button className="btn btn-warning btn-xs" onClick={(e) => {this.onSetProductStatus.call(this, e, item.id, item.status)}}>{item.status == 1 ? '下架' : '上架'}</button>
          </td>
          <td>
            <Link className="opear" to={`/product/detail/${item.id}`}>查看详情</Link>
            <Link className="opear" to={`/product/edit/${item.id}`}>编辑</Link>
          </td>
        </tr>
      )
    })

    const tableHeader = [
      {
        name: '商品ID',
        width: '15%'
      },
      {
        name: '商品名称',
        width: '25%'
      },
      {
        name: '价格',
        width: '10%'
      },
      {
        name: '状态',
        width: '15%'
      },
      {
        name: '操作',
        width: '25%'
      }
    ]

    return (
      <div id="page-wrapper">
        <PageTitle title="商品列表" />
        <TableList tableHeader={tableHeader}>
          {listBody}
        </TableList>
        <Pagination current={pageNum} total={total} onChange={this.onPageNumChange.bind(this)}/>
      </div>
    );
  }
}

export default ProductList;