import React from 'react';
import './category-selector.scss';
import MUtil from 'util/mm.js';
import Product from 'service/product-service.js';

const _mm = new MUtil();
const _product = new Product();

class categorySelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstCategoryList: [],
      firstCategoryId: 0,
      secondCategoryList: [],
      secondCategoryId: 0
    };
  }

  componentDidMount() {
    this.loadFirstCategory.call(this);
  }

  loadFirstCategory() {
    // _product.getCategoryList().then(res => {
    //   this.setState({
    //     firstCategoryList: res
    //   })
    // }, err => {
    //   _mm.errorTips(err);
    // })
  }

  onFirstChange(e) {
    const val = e.target.value || 0;
    this.setState({
      firstCategoryId: val,
      secondCategoryId: 0,
      secondCategoryList: []
    }, () => {
      this.onPropsCategoryChange.call(this);
      this.loadSecondCategory.call(this);
    })
  }

  loadSecondCategory() {
    // const { firstCategoryId } = this.state;
    // _product.getCategoryList(firstCategoryId).then(res => {
    //   this.setState({
    //     secondCategoryList: res
    //   })
    // }, err => {
    //   _mm.errorTips(err);
    // })
  }

  onPropsCategoryChange() {
    const { onChangeCategory } = this.props;
    const { secondCategoryId, firstCategoryId } = this.state;
    if (secondCategoryId) {
      onChangeCategory(secondCategoryId, firstCategoryId);
    } else {
      onChangeCategory(0, firstCategoryId);
    }
  }

  onSecondChange(e) {
    const val = e.target.value || 0;
    this.setState({
      secondCategoryId: val
    }, () => {
      this.onPropsCategoryChange.call(this);
    })
  }

  render() {
    const { firstCategoryList, secondCategoryList } = this.state;

    return (
      <div>
        <div className="col-sm-10">
          <select className="form-control cate-select" onChange={e => this.onFirstChange.call(this, e)}>
            <option value="">请选择一级分类</option>
            {
              firstCategoryList.map((item, index) => {
                return <option value={item.id} key={index}>{item.name}</option>
              })
            }
          </select>
          {secondCategoryList.length > 0 && (<select className="form-control cate-select" onChange={e => this.onSecondChange.call(this, e)}>
            <option value="">请选择二级分类</option>
            {
              secondCategoryList.map((item, index) => {
                return <option value={item.id} key={index}>{item.name}</option>
              })
            }
          </select>)}
        </div>
      </div>
    );
  }
}

export default categorySelector;