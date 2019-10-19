import React from 'react';
import { Helmet } from 'react-helmet';

class PageTitle extends React.Component {
  constructor (props) {
    super(props)
  }
  render() {
    return (
      <div className="row">
        <Helmet>
          <title>{this.props.title}</title>
        </Helmet>
        <div className="col-md-12">
          <h1 className="page-header">{this.props.title}</h1>
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default PageTitle;