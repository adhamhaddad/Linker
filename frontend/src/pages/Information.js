import React, { useEffect, useState, useContext } from 'react';
import useHttp from '../hooks/use-http';
import AuthenticateContext from '../utils/authentication';
import BackButton from '../components/UI/BackButton';
import FilePicker from '../components/FilePicker';
import apiUrlContext from '../utils/api-urls';
import classes from '../css/Information.module.css';

const Information = ({ windowSize }) => {
  const [informationData, setInformationData] = useState({
    story: '',
    relationship: '',
    location: '',
    birthday: '',
    job_title: '',
    education: ''
  });
  const [pickedImage, setPickedImage] = useState();
  const [editPicture, setEditPicture] = useState(false);
  const [editStory, setEditStory] = useState(false);
  const [editRelation, setEditRelation] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [editBirthday, setEditBirthday] = useState(false);
  const [editJobTitle, setEditJobTitle] = useState(false);
  const [editEducaiton, setEditEducation] = useState(false);
  const authCtx = useContext(AuthenticateContext);
  const apiCtx = useContext(apiUrlContext);
  const { isLoading, isError, sendRequest } = useHttp();

  const editPictureToggle = () => {
    setEditPicture((prev) => !prev);
  };
  const editStoryToggle = () => {
    setEditStory((prev) => !prev);
  };
  const editLocationToggle = () => {
    setEditLocation((prev) => !prev);
  };
  const editRelationToggle = () => {
    setEditRelation((prev) => !prev);
  };
  const editEducationToggle = () => {
    setEditEducation((prev) => !prev);
  };
  const editBirthdayToggle = () => {
    setEditBirthday((prev) => !prev);
  };
  const editJobTitleToggle = () => {
    setEditJobTitle((prev) => !prev);
  };

  const savePicture = () => {
    const formData = new FormData();
    formData.append('user_id', authCtx.user.user_id);
    formData.append('profile', pickedImage);
    fetch(`${apiCtx.url}/information`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${authCtx.accessToken}` },
      body: formData
    });
  };

  const saveStory = () => {
    sendRequest(
      'information',
      'PATCH',
      {
        user_id: authCtx.user.user_id,
        story: informationData.story
      },
      (data) => {
        setInformationData((prev) => ({ ...prev, story: data.story }));
        editStoryToggle();
      }
    );
  };
  const saveRelation = () => {
    sendRequest(
      'information',
      'PATCH',
      {
        user_id: authCtx.user.user_id,
        relationship: informationData.relationship
      },
      (data) => {
        setInformationData((prev) => ({
          ...prev,
          relationship: data.relationship
        }));
        editRelationToggle();
      }
    );
  };

  const saveLocation = () => {
    sendRequest(
      'information',
      'PATCH',
      {
        user_id: authCtx.user.user_id,
        location: informationData.location
        // country: e.target.value
      },
      (data) => {
        setInformationData((prev) => ({ ...prev, location: data.location }));
        editLocationToggle();
      }
    );
  };

  const saveBirthday = () => {
    sendRequest(
      'information',
      'PATCH',
      {
        user_id: authCtx.user.user_id,
        birthday: informationData.birthday
      },
      (data) => {
        setInformationData((prev) => ({ ...prev, birthday: data.birthday }));
        editBirthdayToggle();
      }
    );
  };

  const saveJobTitle = () => {
    sendRequest(
      'information',
      'PATCH',
      {
        user_id: authCtx.user.user_id,
        job_title: informationData.job_title
      },
      (data) => {
        setInformationData((prev) => ({ ...prev, job_title: data.job_title }));
        editJobTitleToggle();
      }
    );
  };

  const saveEducation = () => {
    sendRequest(
      'information',
      'PATCH',
      {
        user_id: authCtx.user.user_id,
        education: informationData.education
      },
      (data) => {
        setInformationData((prev) => ({ ...prev, education: data.education }));
        editEducationToggle();
      }
    );
  };

  const onPictureChange = (e) => {
    setPickedImage(e);
  };

  const onStoryChange = (e) => {
    setInformationData((prev) => ({ ...prev, story: e.target.value }));
  };

  const onRelationChange = (e) => {
    setInformationData((prev) => ({ ...prev, relationship: e.target.value }));
  };

  const onLocationChange = (e) => {
    setInformationData((prev) => ({ ...prev, location: e.target.value }));
  };

  const onBirthdayChange = (e) => {
    setInformationData((prev) => ({ ...prev, birthday: e.target.value }));
  };

  const onJobTitleChange = (e) => {
    setInformationData((prev) => ({ ...prev, job_title: e.target.value }));
  };

  const onEducationChange = (e) => {
    setInformationData((prev) => ({ ...prev, education: e.target.value }));
  };

  useEffect(() => {
    sendRequest(
      `information?username=${authCtx.user.username}`,
      'GET',
      {},
      (data) => setInformationData({ ...(data == null ? '' : data) })
    );
    return () => {
      setInformationData({});
    };
  }, []);

  return (
    <div className={classes['information']}>
      {windowSize <= 600 && <BackButton path='/settings' />}
      <h3>information</h3>

      <div>
        <span>Profile Picture</span>
        {!editPicture && (
          <>
            <div className={classes['profile-picture']}></div>
            <button onClick={editPictureToggle}>edit</button>
          </>
        )}
        {editPicture && (
          <>
            <FilePicker onPicture={onPictureChange} />
            <button onClick={editPictureToggle}>cancel</button>
            <button onClick={savePicture}>save</button>
          </>
        )}
      </div>

      <div>
        <span>story</span>
        {!editStory && (
          <>
            <p>{informationData.story}</p>
            <button onClick={editStoryToggle}>edit</button>
          </>
        )}
        {editStory && (
          <>
            <textarea
              className={classes.story}
              value={informationData.story}
              onChange={onStoryChange}
            ></textarea>
            <button onClick={editStoryToggle}>cancel</button>
            <button onClick={saveStory}>save</button>
          </>
        )}
      </div>

      <div>
        <span>relationship</span>
        {!editRelation && (
          <>
            <p>{informationData.relationship}</p>
            <button onClick={editRelationToggle}>edit</button>
          </>
        )}
        {editRelation && (
          <>
            <select
              defaultValue={
                informationData.relationship
                  ? informationData.relationship
                  : 'null'
              }
              onChange={onRelationChange}
            >
              <option value='null' disabled>
                Select relation status
              </option>
              <option value='single'>Single</option>
              <option value='engaged'>Engaged</option>
              <option value='married'>Married</option>
            </select>
            <button onClick={editRelationToggle}>cancel</button>
            <button onClick={saveRelation}>save</button>
          </>
        )}
      </div>

      <div>
        <span>location</span>
        {!editLocation && (
          <>
            <p className='location'>{informationData.location}</p>
            <button onClick={editLocationToggle}>edit</button>
          </>
        )}
        {editLocation && (
          <>
            <input
              type='text'
              value={informationData.location}
              placeholder='Location'
              onChange={onLocationChange}
            />
            <button onClick={editLocationToggle}>cancel</button>
            <button onClick={saveLocation}>save</button>
          </>
        )}
      </div>
      <div>
        <span>birthday</span>
        {!editBirthday && (
          <>
            <p className='birthday'>{informationData.birthday}</p>
            <button onClick={editBirthdayToggle}>edit</button>
          </>
        )}
        {editBirthday && (
          <>
            <input
              type='date'
              value={informationData.birthday}
              onChange={onBirthdayChange}
            />
            <button onClick={editBirthdayToggle}>cancel</button>
            <button onClick={saveBirthday}>save</button>
          </>
        )}
      </div>

      <h3>education</h3>
      <div>
        <span>Job Title</span>
        {!editJobTitle && (
          <>
            <p>{informationData.job_title}</p>
            <button onClick={editJobTitleToggle}>edit</button>
          </>
        )}
        {editJobTitle && (
          <>
            <input
              type='text'
              value={informationData.job_title}
              onChange={onJobTitleChange}
            />
            <button onClick={editJobTitleToggle}>cancel</button>
            <button onClick={saveJobTitle}>save</button>
          </>
        )}
      </div>
      <div>
        <span>education</span>
        {!editEducaiton && (
          <>
            <p>{informationData.education}</p>
            <button onClick={editEducationToggle}>edit</button>
          </>
        )}
        {editEducaiton && (
          <>
            <input
              type='text'
              value={informationData.education}
              onChange={onEducationChange}
            />
            <button onClick={editEducationToggle}>cancel</button>
            <button onClick={saveEducation}>save</button>
          </>
        )}
      </div>
    </div>
  );
};
export default Information;
