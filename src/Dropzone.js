import React, { useRef } from "react";

export default function Dropzone(props) {
  const inputRef = useRef();
  const { addFiles } = props;

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileUpload = (e) => {
    addFiles(Array.from(e.target.files));
  };

  const handleDrag = (e) => e.preventDefault();

  const handleDrop = (ev) => {
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

  return (
    <React.Fragment>
      <input
        ref={inputRef}
        type="file"
        id="fileElem"
        multiple
        accept="application/pdf"
        style={{ display: "none" }}
        onChange={handleFileUpload}
      />
      <div
        id="fileSelect"
        className="dropzone"
        onClick={handleClick}
        onDragOver={handleDrag}
        onDragEnter={handleDrag}
        onDrop={handleDrop}
      >
        Dropzone
      </div>
    </React.Fragment>
  );
}
