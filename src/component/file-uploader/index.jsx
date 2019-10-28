import React from 'react';
import FileUpload from './file-uploader.jsx';

class FileUploader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const options={
      baseUrl:'/manage/product/upload.do',
      fileFieldName: 'upload_file',
      dataType: 'json',
      uploadSuccess: (res) => {

      },
      uploadError: (err) => {

      }
    }
    /*Use FileUpload with options*/
    /*Set two dom with ref*/
    return (
      <FileUpload options={options}>
        <button ref="chooseBtn">choose</button>
        <button ref="uploadBtn">upload</button>
      </FileUpload>
    )
  }
}

export default FileUploader;