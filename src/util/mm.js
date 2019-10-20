class MUtil {
  request(params) {
    return new Promise((resolve, reject) => {
      $.ajax({
        type: params.type || 'get',
        url: params.url || '',
        dataType: params.dataType || 'json',
        data: params.data || null,
        success: res => {
          if(0 === res.status) {
            typeof resolve == 'function' && resolve(res.data, res.msg);
          } else if (10 == res.status) {
            // 需要登陆
            this.doLogin();
          } else {
            typeof reject == 'function' && resolve(res.msg || res.data);
          }
        },
        error: err => {
          typeof reject == 'function' && resolve(res.statusText);
        }
      })
    })
  }

  doLogin() {
    window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
  }

  getUrlParam(name) {
    let queryString = window.location.search.split('?')[1] || '',
    reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
    result = queryString.match(reg)
    // expamle : param=123&param1=456
    // result: ['param=123', '', '123', '&'], 首先是匹配字符串，然后是匹配组
    return result ? decodeURIComponent(result[2]) : null;
  }

  errorTips(msg) {
    console.log(msg)
  }

  setStorage(name, data) {
    let dataType = typeof data;
    if (dataType === 'object') {
      window.localStorage.setItem(name, JSON.stringify(data));
    } else if (['number', 'string', 'boolean'].indexOf(dataType) > -1) {
      window.localStorage.setItem(name, data);
    } else {
      console.log('该乐境不能用于本地存储');
    }
  }

  getStorage(name) {
    let data = window.localStorage.getItem(name);
    if (data) {
      return  JSON.parse(data)
    } else {
      return '';
    }
  }

  removeStorage(name) {
    window.localStorage.removeItem(name);
  }
}

export default MUtil;