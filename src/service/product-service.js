import Mutil from 'util/mm.js';

const _mm = new Mutil();

class Product {
  getProductList(params) {
    const { listType, pageNum, searchType, searchKeyword } = params;
    let url = '', data = {pageNum};
    if (listType === 'list') {
      url = '/manage/product/list.do';
    } else if (listType === 'search') {
      url = '/manage/product/search.do';
      data[searchType] = searchKeyword;
    }
    return _mm.request({
      type: 'post',
      url,
      data
    })
  }

  setProductStatus({ productId, status }) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/set_sale_status.do',
      data: {
        productId,
        status
      }
    })
  }

  getCategoryList(id) {
    return _mm.request({
      type: 'post',
      url: '/manage/category/get_category.do',
      data: {
        categoryId: id || 0
      }
    })
  }
}

export default Product;