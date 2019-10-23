import Mutil from 'util/mm.js';

const _mm = new Mutil();

class Product {
  getProductList(pageNum) {
    return _mm.request({
      type: 'post',
      url: '/manage/product/list.do',
      data: {
        pageNum
      }
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
}

export default Product;