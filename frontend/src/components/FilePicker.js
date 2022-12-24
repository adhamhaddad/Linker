import React, { useState, useEffect } from 'react';
import { pickedHandler } from '../utils/files-util';
import classes from '../css/FilePicker.module.css';

const reader = new FileReader();

const FilePicker = ({ onPicture }) => {
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);

  
  const pickedHandler = (e) => {
    let pickedFile;
    let fileIsValid = isValid;
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0];
      setFile(pickedFile);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    onPicture(pickedFile);
  };


  useEffect(() => {
    if (!file) {
      return;
    }

    reader.onload = () => {
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  }, [file]);

  return (
    <div className={classes['file-picker']}>
      <label htmlFor='image'>
        <i className='fa-solid fa-camera'></i>
      </label>
      <input
        type='file'
        id='image'
        accept='.jpeg,.png,.jpg'
        onChange={pickedHandler}
      />
      <div className={classes['image-upload__preview']}>
        {previewUrl && <img src={previewUrl} alt='Preview' />}
      </div>
    </div>
  );
};
export default FilePicker;
