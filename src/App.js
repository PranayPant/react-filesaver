import React, { useState } from "react";
import Dropzone from "./Dropzone";
import FileList from "./FileList";
import {selectValidFiles} from './utils'

export default function App() {

  const [files, setFiles] = useState([]);

  const addFiles = async (files) => {
    const validFiles = await selectValidFiles(files)
    setFiles( prev => [...prev, ...validFiles])
  }

  return (
    <React.Fragment>
      <Dropzone addFiles={addFiles} />
      <FileList files={files} />
    </React.Fragment>
  );
}
