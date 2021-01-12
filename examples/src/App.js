import React from "react";
import Dropzone from "./Dropzone";
import FileList from "./FileList";
import useUpload from 'react-filesaver'
import './index.scss';

export default function App() {

  const params = {accept: 'application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document'}
  const {UploadWrapper, files, errors=[]} = useUpload(params)

  return (
    <React.Fragment>
      <UploadWrapper>
        <Dropzone />
      </UploadWrapper>
      <FileList files={files} />
      { errors.map((e, i) => <div key={i}>{JSON.stringify(e)}</div>)}
    </React.Fragment>
  );
}
