import * as pdfjsLib from "pdfjs-dist/build/pdf";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import FILE_TYPES from "./fileTypes";

const readFileToArrayBuffer = fileData => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsArrayBuffer(fileData);

    reader.onload = () => {
      const result = reader.result; // Convert to array buffer

      const bytes = new Uint8Array(result);
      resolve(bytes);
    };
  });
};

const readFileToBinaryString = fileData => {
  return new Promise(resolve => {
    const reader = new FileReader();
    reader.readAsBinaryString(fileData);

    reader.onload = function (evt) {
      const content = evt.target.result;
      resolve(content);
    };
  });
};

const validatePDF = file => {
  return new Promise(async (resolve, reject) => {
    const bytes = await readFileToArrayBuffer(file);

    try {
      await pdfjsLib.getDocument(bytes).promise;
      resolve(file);
    } catch (err) {
      reject(err);
    }
  });
};

const validateDOCX = file => {
  return new Promise(async (resolve, reject) => {
    const content = await readFileToBinaryString(file);

    try {
      const zip = new PizZip(content);
      const doc = new Docxtemplater(zip);
      resolve(doc);
    } catch (err) {
      reject(err);
    }
  });
};

const validateTXT = file => {
  return new Promise(async (resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function (evt) {
      const content = evt.target.result;
      console.log(content);
      resolve(content);
    };
  });
};

const validateFile = async file => {
  const resolvers = {
    resolve: null,
    reject: null
  };
  const promise = new Promise((res, rej) => {
    resolvers.resolve = res;
    resolvers.reject = rej;
  });
  let result;

  if (file.type === FILE_TYPES.DOCX) {
    result = await validateDOCX(file);
  } else if (file.type === FILE_TYPES.PDF) {
    result = await validatePDF(file);
  } else if (file.type === FILE_TYPES.TXT) {
    result = await validateTXT(file);
  }

  resolvers.resolve(result);
  return promise;
};

const meetsMaxSize = (maxSize, file) => {
  return file.size <= maxSize;
};

const isAcceptedFileType = (mimeString, file) => {
  const mimeTypes = mimeString.split(",").map(t => t.trim());
  return mimeTypes.includes(file.type) || mimeTypes.includes(FILE_TYPES.ALL);
};

export const selectValidFiles = (files, maxSize, accept) => {
  return new Promise(async resolve => {
    const validFiles = [];
    const errors = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      try {
        const isAccepted = isAcceptedFileType(accept, file);
        const meetsSize = meetsMaxSize(maxSize, file);

        if (isAccepted && meetsSize) {
          await validateFile(file);
          validFiles.push(file);
        } else {
          if (!isAccepted) {
            errors.push({
              file: file.name,
              type: ERROR_TYPES.FILE_BAD_EXT,
              err: "File type is not accepted."
            });
          }

          if (!meetsSize) {
            errors.push({
              file: file.name,
              type: ERROR_TYPES.FILE_TOO_BIG,
              err: "File is too big."
            });
          }
        }
      } catch (err) {
        const error = {
          message: "Error reading file: Make sure file is not password protected",
          type: ERROR_TYPES.FILE_PROTECTED,
          ...err
        };
        errors.push(error);
      }
    }

    resolve({
      files: validFiles,
      errors
    });
  });
};
export const ERROR_TYPES = {
  FILE_TOO_BIG: "File is too big",
  FILE_PROTECTED: "File is encrypted",
  FILE_BAD_EXT: "File has a prohibited extension"
};