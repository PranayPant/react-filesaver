
import React, {useRef} from 'react'
import './index.scss'

export default function UploadHelper(props){

    const {children, addFiles} = props

    const inputRef = useRef()

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
        } 
        else {
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
                multiple
                accept="application/pdf"
                style={{ display: "none" }}
                onChange={handleFileUpload}
            />
            <div className='dropzone-wrapper'
                onClick={handleClick}
                onDragOver={handleDrag}
                onDragEnter={handleDrag}
                onDrop={handleDrop}
            >
                {React.Children.map(children, (child) => <div className='dzone-item'>{child}</div>)}
            </div>
        </React.Fragment>
    )
}