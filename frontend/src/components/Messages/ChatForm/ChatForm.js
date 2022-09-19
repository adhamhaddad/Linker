import React from 'react';
import classes from './ChatForm.module.css';

function ChatForm() {
  return (
    <form action='/sendMessage' method='POST' className={classes.form}>
      <input type='text' placeholder='Type Message ..' name='message' />
      <button type='submit'>
        send
        <i className='fa fa-paper-plane'></i>
      </button>
    </form>
  );
}
export default ChatForm;
