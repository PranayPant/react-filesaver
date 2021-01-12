import React from "react";
import Dropzone from "./Dropzone";
import FileList from "./FileList";
import useUpload from 'react-filesaver'
//import useUpload from '../hooks'
import FILE_TYPES from '../hooks/fileTypes'
import './index.scss';

export default function App() {

  const params = {accept: `${FILE_TYPES.PDF}, ${FILE_TYPES.DOCX}`}
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
