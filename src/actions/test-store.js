import { STORE_TEST } from './../constants/action-type.js';

export function storeTest() {
  return {
    type: STORE_TEST,
    msg: 'test store'
  };
}
