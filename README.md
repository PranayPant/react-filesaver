# Purpose

To abstract upload file functionality via React Hooks

# Features

### Dropzone Wrapper Component

Use this to wrap your custom upload UI component

### Handle password protection (for .PDF and .DOCX only at the moment)

Captures errors when uploading password protected files, and prevents file from being uploaded

# Installation

To add `react-filesaver` into existing project, do

`yarn add react-filesaver`
or
`npm i react-filesaver`

## Example

To run the example, do the following steps:

```
git clone https://github.com/PranayPant/react-filesaver.git
cd react-filesaver/examples
yarn install
yarn start
```

See how to use in existing project below:

```
import React from "react";
import Dropzone from "./Dropzone"; // custom file upload component
import FileList from "./FileList"; // custom component to display the list of uploaded file e.g. html Table
import useUpload from 'react-filesaver'

export default function App() {

  // Get the Upload Wrapper ocmpoenent to handle the upload for you
  // Get a refernec to the uploaded files and any errors
  const {UploadWrapper, files, errors=[]} = useUpload()

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
```

