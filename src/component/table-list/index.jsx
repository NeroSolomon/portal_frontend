
import React from 'react';

class TableList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {
      tableHeader,
      children
    } = this.props;

    let listError = (
      <tr>
        <td colSpan={tableHeader.length} className="text-center">没有数据</td>
      </tr>
    )

    let tableBody = children.length > 0 ? children : listError;

    return (
      <div className="row">
        <div className="col-md-12">
          <table className="table table-striped table-border">
            <thead>
              <tr>
                {
                  tableHeader.map((item, index) => {
                    return (<th key={index} width={item.width}>{item.name}</th>)
                  })
                }
              </tr>
            </thead>
            <tbody>
              {tableBody}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default TableList;