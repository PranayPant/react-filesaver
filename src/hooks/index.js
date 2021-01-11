import React, { useState } from "react";
import {selectValidFiles} from './utils'
import UploadHelper from './UploadHelper'

export default function useUpload(props){

    const [state, setState] = useState({files: []})

    const addFiles = async (files) => {
        const validFiles = await selectValidFiles(files)
        setState( prev => ({...prev, files: [...prev.files, ...validFiles]}))
    }

    const UploadWrapper = (props) => UploadHelper({...props, addFiles})

    return {UploadWrapper, files: state.files}
}