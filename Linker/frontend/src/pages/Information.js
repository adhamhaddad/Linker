import React, { useEffect, useState, useContext } from 'react';
import useHttp from '../hooks/use-http';
import Footer from '../components/Footer';
import AuthenticateContext from '../utils/authentication';
import BackButton from '../components/UI/BackButton';
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

  const [editStory, setEditStory] = useState(false);
  const [editRelation, setEditRelation] = useState(false);
  const [editLocation, setEditLocation] = useState(false);
  const [editBirthday, setEditBirthday] = useState(false);
  const [editJobTitle, setEditJobTitle] = useState(false);
  const [editEducaiton, setEditEducation] = useState(false);
  const authCtx = useContext(AuthenticateContext);
  const { isLoading, isError, sendRequest } = useHttp();

  const editLocationToggle = () => {
    setEditLocation((prev) => !prev);
  };

  const editStoryToggle = () => {
    setEditStory((prev) => !prev);
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

  const saveStory = () => {
    sendRequest(
      'user/information/story',
      'PATCH',
      {
        user_id: authCtx.user.user_id,
        story: informationData.story
      },
      (data) => {
        setInformationData((prev) => ({ ...prev, story: data.story }));
        setEditStory();
      }
    );
  };
  const saveRelation = () => {
    sendRequest(
      'user/information/relationship',
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
        setEditRelation();
      }
    );
  };

  const saveLocation = () => {
    sendRequest(
      'user/information/location',
      'PATCH',
      {
        user_id: authCtx.user.user_id,
        location: informationData.location
        // country: e.target.value
      },
      (data) => {
        setInformationData((prev) => ({ ...prev, location: data.location }));
        setEditLocation();
      }
    );
  };

  const saveBirthday = () => {
    sendRequest(
      'user/information/birthday',
      'PATCH',
      {
        user_id: authCtx.user.user_id,
        birthday: informationData.birthday
      },
      (data) => {
        setInformationData((prev) => ({ ...prev, birthday: data.birthday }));
        setEditBirthday();
      }
    );
  };

  const saveJobTitle = () => {
    sendRequest(
      'user/information/job-title',
      'PATCH',
      {
        user_id: authCtx.user.user_id,
        job_title: informationData.job_title
      },
      (data) => {
        setInformationData((prev) => ({ ...prev, job_title: data.job_title }));
        setEditJobTitle();
      }
    );
  };

  const saveEducation = () => {
    sendRequest(
      'user/information/education',
      'PATCH',
      {
        user_id: authCtx.user.user_id,
        education: informationData.education
      },
      (data) => {
        setInformationData((prev) => ({ ...prev, education: data.education }));
        setEditEducation();
      }
    );
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
      `user/information/${authCtx.user.username}`,
      'GET',
      {},
      (data) => setInformationData({ ...data == null ? '' : data })
    );
  }, []);

  return (
    <div className={classes['information']}>
      {windowSize <= 600 && <BackButton path='/settings' />}
      <h3>information</h3>
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
            <input
              type='text'
              value={informationData.relationship}
              onChange={onRelationChange}
            />
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
            <button onClick={saveEducation}>save</button>
          </>
        )}
      </div>
      {windowSize > 600 && <Footer />}
    </div>
  );
};
export default Information;
