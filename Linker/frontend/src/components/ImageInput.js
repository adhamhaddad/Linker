import React, { useState } from 'react';

const readFileAsDataURL = (file) =>
  new Promise((resolve) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      resolve(event.target.result);
    };

    reader.readAsDataURL(file);
  });

/**
 * A custom <input> that dynamically reads and resizes image files before
 * submitting them to the server as data URLs. Also, shows a preview of the image.
 */

const ImageInput = ({ className, name, id }) => {
  const [value, setValue] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && file.type.match(/^image\//)) {
      readFileAsDataURL(file).then((originalURL) => {
        console.log(originalURL);
      });
    } else {
      setValue('');
    }
  };

  return (
    <div className={className}>
      <input type='hidden' name={name} value={value} />
      <input type='file' id={id} onChange={handleFileChange} />
    </div>
  );
};

export default ImageInput;
