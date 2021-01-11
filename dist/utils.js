const readFileToArrayBuffer = async fileData => {
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

const validatePDF = file => {
  return new Promise(async (resolve, reject) => {
    const bytes = await readFileToArrayBuffer(file);

    try {
      await window.pdfjsLib.getDocument(bytes).promise;
      resolve(file);
    } catch (err) {
      reject(err);
    }
  });
};

export const selectValidFiles = files => {
  return new Promise(async resolve => {
    const validFiles = [];

    for (let i = 0; i < files.length; i++) {
      try {
        const file = await validatePDF(files[i]);
        validFiles.push(file);
      } catch (err) {
        console.log(err);
      }
    }

    resolve(validFiles);
  });
};