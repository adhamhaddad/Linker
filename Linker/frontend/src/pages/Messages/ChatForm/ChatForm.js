import React, { useRef, useState } from 'react';
import classes from './ChatForm.module.css';

const validateMessage = (message) => {
  if (message.current.value.trim().length === 0) {
    return <p>please type something</p>;
  }
};

function ChatForm({ onAddNewMessage }) {
  const newMesasgeRef = useRef();
  const [messageBox, setMessageBox] = useState('');

  const onMessageChange = (e) => {
    setMessageBox(e.target.value);
  };
  const submitFormHandler = (e) => {
    e.preventDefault();
    validateMessage(newMesasgeRef);
    onAddNewMessage(newMesasgeRef);
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
        ref={newMesasgeRef}
        type='text'
        placeholder='Type a Message ..'
        name='message'
        accessKey='off'
        className={classes.input}
        value={messageBox}
        onChange={onMessageChange}
      />
      <button>
        send
      </button>
    </form>
  );
}
export default ChatForm;
