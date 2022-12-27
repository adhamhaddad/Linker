export const pickedHandler = (
  e,
  isValid,
  setFileState,
  setValidState,
  setState
) => {
  let pickedFile;
  let fileIsValid = isValid;
  if (e.target.files && e.target.files.length === 1) {
    pickedFile = e.target.files[0];
    setFileState(pickedFile);
    setValidState(true);
    fileIsValid = true;
  } else {
    setValidState(false);
    fileIsValid = false;
  }
  setState(pickedFile);
};
