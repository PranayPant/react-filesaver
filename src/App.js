import React from "react";
import Dropzone from "./Dropzone";
import FileList from "./FileList";
import {selectValidFiles} from './utils'
import useUpload from './hooks'

export default function App() {

  const {UploadWrapper, files} = useUpload()

  return (
    <React.Fragment>
      <UploadWrapper>
        <Dropzone />
      </UploadWrapper>
      <FileList files={files} />
    </React.Fragment>
  );
}
