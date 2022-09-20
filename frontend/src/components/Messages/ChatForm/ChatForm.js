import React, { useState, useRef } from 'react';
import classes from './ChatForm.module.css';

function ChatForm(props) {
  const newMesasge = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();
    if (newMesasge.current.value.trim().length === 0) {
      return;
    }

    props.addMessageHandler({
      time: new Date(),
      message: newMesasge.current.value
    });
    newMesasge.current.value = '';
  };

  return (
    <form onSubmit={submitFormHandler} className={classes.form}>
      <input
        ref={newMesasge}
        type='text'
        placeholder='Type Message ..'
        name='message'
      />
      <button type='submit'>
        send
        <i className='fa fa-paper-plane'></i>
      </button>
    </form>
  );
}
export default ChatForm;
