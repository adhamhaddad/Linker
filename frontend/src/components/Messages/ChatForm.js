import React, { useRef, useState, useContext } from 'react';
import useHttp from '../../hooks/use-http';
import { useParams } from 'react-router-dom';
import AuthenticateContext from '../../utils/authentication';
import classes from '../../css/ChatForm.module.css';

const validateMessage = (message) => {
  if (message.current.value.trim().length === 0) {
    return <p>please type something</p>;
  }
};

const ChatForm = ({ isEditing, message }) => {
  const newMesasgeRef = useRef('');
  const [messageBox, setMessageBox] = useState(newMesasgeRef.current.value);
  const { sendRequest } = useHttp();
  const authCtx = useContext(AuthenticateContext);
  const params = useParams();

  // NEW MESSAGE
  const addMessage = (newMesasge) => {
    sendRequest(
      'messages',
      'POST',
      {
        sender_username: authCtx.user.username,
        receiver_username: params.username,
        content: newMesasge.current.value
      },
      null
    );
  };
  // UPDATE MESSAGE
  const updateMessage = (data) => {
    sendRequest(
      'messages',
      'PATCH',
      {
        sender_username: authCtx.user.username,
        receiver_username: params.username,
        message_id: data.message_id,
        content: data.content
      },
      null
    );
  };

  const onMessageChange = (e) => {
    setMessageBox(e.target.value);
  };

  const submitFormHandler = (e) => {
    e.preventDefault();
    if (newMesasgeRef.current.value.trim().length === 0) {
      return <p>please type something</p>;
    }
    addMessage(newMesasgeRef);
    setMessageBox('');
  };

  return (
    <form
      autoComplete='off'
      accessKey='off'
      autoSave='off'
      onSubmit={submitFormHandler}
      className={classes.form}
      id='form-input'
    >
      <textarea
        ref={newMesasgeRef}
        type='text'
        placeholder='Type a Message ..'
        name='message'
        accessKey='off'
        value={messageBox}
        onChange={onMessageChange}
      />
      <button className='fa-solid fa-paper-plane'></button>
    </form>
  );
};
export default ChatForm;
