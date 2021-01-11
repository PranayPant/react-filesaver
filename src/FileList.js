import React, { useEffect, useState } from "react";

export default function FileList(props) {
  const [state, setState] = useState({ files: [] });
  useEffect(() => {
    setState((prev) => {
      const files = [...props.files];
      files
        .filter((f) => !f.uploadedAt)
        .forEach((f) => {
          f.uploadedAt = new Date();
        });
      const newState = {
        ...prev,
        files
      };
      return newState;
    });
  }, [props.files]);

  return (
    <div className="file-list">
      <table>
        <thead>
          <th>File</th>
          <th>Last Modified</th>
          <th>Uploaded At</th>
        </thead>
        <tbody>
          {state.files.map((f, i) => (
            <tr key={i}>
              <th>{f.name}</th>
              <th>{new Date(f.lastModified).toLocaleTimeString()}</th>
              <th>{new Date(f.uploadedAt).toLocaleTimeString()}</th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
