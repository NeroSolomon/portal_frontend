import React from 'react';

import PageTitle from 'component/page-title/index.jsx';
import CategorySelector from 'page/product/Category-selector.jsx'
// import FileUploader from 'component/file-uploader/index.jsx'

import MUtil from 'util/mm.js';
import Product from 'service/product-service.js';

const _mm = new MUtil();
const _product = new Product();

class ProductSave extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstCategoryId: 0,
      secondCategoryId: 0
    }
  }
  onChangeCategory(firstCategoryId, secondCategoryId) {
    console.log(firstCategoryId, secondCategoryId);
  }

  render() {
    return (
      <div id="page-wrapper">
        <PageTitle title="添加商品" />
        <form className="form-horizontal">
          <div className="form-group">
            <label className="col-sm-2 control-label">商品名称</label>
            <div className="col-sm-5">
              <input type="text" className="form-control" placeholder="商品名称" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">商品描述</label>
            <div className="col-sm-5">
              <input type="text" className="form-control" placeholder="商品描述" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">所属分类</label>
            <CategorySelector onChangeCategory={this.onChangeCategory.bind(this)}/>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">商品价格</label>
            <div className="col-sm-5">
              <input type="number" className="form-control" placeholder="商品价格" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">商品库存</label>
            <div className="col-sm-5">
              <input type="number" className="form-control" placeholder="商品库存" />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">商品图片</label>
            <div className="col-sm-10">
              {/* <FileUploader /> */}
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-2 control-label">商品详情</label>
            <div className="col-sm-10">
              xxx
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="submit" className="btn btn-primary">提交</button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default ProductSave;