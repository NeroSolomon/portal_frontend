import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, history } from 'react-router-dom';
import { syncHistoryWithStore } from 'react-router-redux';

import configStore from './store/store-config.js';

// 页面
import Home from 'page/home/index.jsx';
import Login from 'page/login/index.jsx';
import UserList from 'page/user/index.jsx';
import ProductList from 'page/product/index.jsx';
import ProductSave from 'page/product/save.jsx';
// 组件
import Layout from 'component/layout/index.jsx';

const store = configStore();
const history = syncHistoryWithStore(history, store);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" render={props => {
              return (<Layout>
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/product" exact component={ProductList} />
                  <Route path="/product/save" exact component={ProductSave} />
                  <Route path="/product/category" exact component={Home} />
                  <Route path="/order" exact component={Home} />
                  <Route path="/newuser" exact component={UserList} />
                </Switch>
              </Layout>)
            }} />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));