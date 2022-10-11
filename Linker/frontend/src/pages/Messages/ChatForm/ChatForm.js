import React, { useRef, useState } from 'react';
import classes from './ChatForm.module.css';
const validateMessage = (message) => {
  if (message.current.value.trim().length === 0) {
    return <p>please type something</p>;
  }
};
function ChatForm(props) {
  const newMesasge = useRef('');
  const [messageBox, setMessageBox] = useState('');
 
  const messageChangeHandler = (e) => {
    setMessageBox(e.target.value);
  };
  const submitFormHandler = (e) => {
    e.preventDefault();
    validateMessage(newMesasge);
    props.addNewMessageHandler(newMesasge);
    setMessageBox('');
  };

  return (
    <form
      autoComplete='off'
      accessKey='off'
      autoSave='off'
      onSubmit={submitFormHandler}
      className={classes.form}
    >
      <textarea
        ref={newMesasge}
        type='text'
        placeholder='Type a Message ..'
        name='message'
        accessKey='off'
        className={classes.input}
        value={messageBox}
        onChange={messageChangeHandler}
      />
      <button>
        send
        <i className='fa fa-paper-plane'></i>
      </button>
    </form>
  );
}
export default ChatForm;
