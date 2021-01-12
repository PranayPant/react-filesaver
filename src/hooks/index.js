import { useState } from "react";
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

    const UploadWrapper = (props) => UploadHelper({...props, addFiles, accept})
    
    return {UploadWrapper, files: state.files, errors: state.errors}
}