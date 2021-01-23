import { useState, useEffect } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

import {selectValidFiles} from './utils'
import UploadHelper from './UploadHelper'

export default function useUpload(props){

    const {maxSize=26214400, accept="*"} = props

    const [state, setState] = useState({files: [], errors: []})

    const addFiles = async (_files) => {
        const {files, errors} = await selectValidFiles(_files, maxSize, accept)
        setState( prev => ({
            ...prev, 
            errors: [...prev.errors, ...errors], 
            files: [...prev.files, ...files]
        }))
    }

    useEffect(() => {
        pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker
    }, [])

    const UploadWrapper = (props) => UploadHelper({...props, addFiles, accept})
    
    return {UploadWrapper, files: state.files, errors: state.errors}
}