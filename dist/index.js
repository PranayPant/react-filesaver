import { useState } from "react";
import { selectValidFiles } from './utils';
import UploadHelper from './UploadHelper';
export default function useUpload(props) {
  const [state, setState] = useState({
    files: [],
    errors: []
  });

  const addFiles = async _files => {
    const {
      files,
      errors
    } = await selectValidFiles(_files);
    setState(prev => ({ ...prev,
      errors: [...prev.errors, ...errors],
      files: [...prev.files, ...files]
    }));
  };

  const UploadWrapper = props => UploadHelper({ ...props,
    addFiles
  });

  return {
    UploadWrapper,
    files: state.files,
    errors: state.errors
  };
}