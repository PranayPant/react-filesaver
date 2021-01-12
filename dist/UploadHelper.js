import React, { useRef } from 'react';
import './index.scss';
export default function UploadHelper(props) {
  const {
    children,
    addFiles,
    accept
  } = props;
  const inputRef = useRef();

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileUpload = e => {
    addFiles(Array.from(e.target.files));
  };

  const handleDrag = e => e.preventDefault();

  const handleDrop = ev => {
    ev.preventDefault();

    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      for (let i = 0; i < ev.dataTransfer.items.length; i++) {
        // If dropped items aren't files, reject them
        if (ev.dataTransfer.items[i].kind === "file") {
          const file = ev.dataTransfer.items[i].getAsFile();
          addFiles([file]);
        }
      }
    } else {
      // Use DataTransfer interface to access the file(s)
      for (let i = 0; i < ev.dataTransfer.files.length; i++) {
        const file = ev.dataTransfer.files[i];
        addFiles([file]);
      }
    }
  };

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("input", {
    ref: inputRef,
    type: "file",
    multiple: true,
    accept: accept,
    style: {
      display: "none"
    },
    onChange: handleFileUpload
  }), /*#__PURE__*/React.createElement("div", {
    className: "dropzone-wrapper",
    onClick: handleClick,
    onDragOver: handleDrag,
    onDragEnter: handleDrag,
    onDrop: handleDrop
  }, React.Children.map(children, child => /*#__PURE__*/React.createElement("div", {
    className: "dzone-item"
  }, child))));
}