import React, { useRef } from 'react';
import classes from './ChatForm.module.css';

function ChatForm(props) {
  const newMesasge = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();
    if (newMesasge.current.value.trim().length === 0) {
      return;
    }

    props.addNewMessageHandler({
      time: new Date(),
      message: newMesasge.current.value
    });
    newMesasge.current.value = '';
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
      />
      <button>
        send
        <i className='fa fa-paper-plane'></i>
      </button>
    </form>
  );
}
export default ChatForm;
