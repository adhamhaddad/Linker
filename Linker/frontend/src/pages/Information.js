import React, { useEffect, useState, useContext, useReducer } from 'react';
import useHttp from '../hooks/use-http';
import AuthenticateContext from '../utils/authentication';
import BackButton from '../components/UI/BackButton';
import classes from '../css/Information.module.css';

const NameReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return {
      fname: action.val,
      lname: state.lname,
      isValid: state.fname.trim().length > 0 && state.lname.trim().length > 0
    };
  }
  if (action.type === 'BLUR') {
    return {
      fname: state.fname,
      lname: state.lname,
      isValid: state.fname.trim().length > 0 && state.lname.trim().length > 0
    };
  }
  return {
    fname: '',
    lname: ''
  };
};

const Information = ({ windowSize }) => {
  // const [informationData, setInformationData] = useState({});
  const [editName, setEditName] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [editStory, setEditStory] = useState(false);

  const [storyValue, setStoryValue] = useState('');
  const [nameValue, setNameValue] = useState({});
  const [locationValue, setLocationValue] = useState('');

  const authCtx = useContext(AuthenticateContext);
  const { isLoading, isError, sendRequest } = useHttp();

  const editNameToggle = () => {
    setEditName((prev) => !prev);
  };
  const editLocationToggle = () => {
    setEditLocation((prev) => !prev);
  };
  const editStoryToggle = () => {
    setEditStory((prev) => !prev);
  };
  const saveStory = (e) => {
    sendRequest(
      `user/information/story`,
      'PATCH',
      {
        story: e.target.value
      },
      null
    );
  };

  const onNameChange = (e) => {
    console.log(e);
  };

  const saveName = (e) => {
    sendRequest(
      `user/information/fname`,
      'PATCH',
      {
        fname: e.target.value
      },
      null
    );
    // condition
    sendRequest(
      `user/information/lname`,
      'PATCH',
      {
        lname: e.target.value
      },
      null
    );
  };
  const saveLocation = (e) => {
    sendRequest(
      `user/information`,
      'PATCH',
      {
        city: e.target.value,
        country: e.target.value
      },
      null
    );
  };

  const setInformationData = (e) => {
    setNameValue({
      fname: e.fname,
      lname: e.lname
    });
    setStoryValue(e.story);
    setLocationValue(e.lives);
  };

  const onNameChangeHandler = (e) => {
    setNameValue({
      fname: e.target.value,
      lname: e.target.value
    });
  };

  const onChangeStoryHandler = (e) => {
    setStoryValue(e.target.value);
  };

  useEffect(() => {
    sendRequest(
      `user/information?user_id=${authCtx.user.user_id}`,
      'GET',
      {},
      setInformationData
    );
  }, []);

  return (
    <form className={classes['information-form']}>
      {windowSize <= 600 && <BackButton path='/settings' />}
      <h3>information</h3>
      <div>
        <span>name</span>
        {editName && (
          <>
            <input value={nameValue.fname} onChange={onNameChangeHandler} />
            <input value={nameValue.lname} />
            <button type='button' onClick={saveName}>
              save
            </button>
          </>
        )}
        {!editName && (
          <>
            <p className={classes.username}>
              {nameValue.fname} {nameValue.lname}
            </p>
            <button type='button' onClick={editNameToggle}>
              edit
            </button>
          </>
        )}
      </div>

      <div>
        <span>location</span>
        {!editLocation && (
          <>
            <p className='location'>{locationValue}</p>
            <button onClick={editLocationToggle}>edit</button>
          </>
        )}
        {editLocation && (
          <>
            <input type='text' value={locationValue} placeholder='Location' />
            <button onClick={saveLocation}>save</button>
          </>
        )}
      </div>
      <div>
        <span>birthday</span>
        <p className='birthday'>{}</p>
        <button>edit</button>
      </div>

      <div>
        <span>story</span>
        {!editStory && (
          <>
            <p>{storyValue}</p>
            <button type='button' onClick={editStoryToggle}>
              edit
            </button>
          </>
        )}
        {editStory && (
          <>
            <textarea
              className={classes.story}
              value={storyValue}
              onChange={onChangeStoryHandler}
            ></textarea>
            <button type='button' onClick={saveStory}>
              save
            </button>
          </>
        )}
      </div>

      <h3>links</h3>
      <div>
        <span>linkedIn</span>
        <p className={classes['information-links']}>{}</p>
        <button type='button'>edit</button>
      </div>
      <div>
        <span>twitter</span>
        <p className={classes['information-links']}>{}</p>
        <button type='button'>edit</button>
      </div>

      <h3>education</h3>
      <div>
        <span>work</span>
        <p>{}</p>
        <button type='button'>edit</button>
      </div>
      <div>
        <span>education</span>
        <p>{}</p>
        <button>edit</button>
      </div>
    </form>
  );
};
export default Information;
