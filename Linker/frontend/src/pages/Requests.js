import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import SpinnerLoading from '../components/Loading/Spinner';
import Error from '../components/Error';
import Container from '../components/UI/Container';
import classes from '../css/Requests.module.css';

const Requests = ({ user_id }) => {
  const [requests, setRequests] = useState([]);
  const { isLoading, isError, sendRequest } = useHttp();

  const requestActions = (response) => {
    setRequests((prev) =>
      prev.filter((request) => request.friend_id !== response.friend_id)
    );
  };
  const acceptRequest = (user) => {
    sendRequest(
      'user/accept-request',
      'PATCH',
      { friend_id: user.friend_id },
      requestActions
    );
  };
  const ignoreRequest = (user) => {
    sendRequest(
      'user/ignore-request',
      'DELETE',
      { friend_id: user.friend_id },
      requestActions
    );
  };
  const requestsList =
    requests.length > 0 &&
    requests.map((request) => (
      <li key={request.sender_id}>
        <Link
          to={`/profile/${request.username}`}
          className={classes['request-profile']}
        ></Link>
        <Link
          to={`/profile/${request.username}`}
          className={classes['request-name']}
        >
          {request.first_name} {request.last_name}
        </Link>
        <button
          className={classes['request-accept']}
          onClick={() => acceptRequest(request)}
        >
          <i className='fa-solid fa-check'></i>
        </button>
        <button
          className={classes['request-ignore']}
          onClick={() => ignoreRequest(request)}
        >
          <i className='fa-solid fa-xmark'></i>
        </button>
      </li>
    ));
  useEffect(() => {
    sendRequest(`user/friend?user_id=${user_id}`, 'GET', {}, setRequests);
  }, []);
  return (
    <Container className='requests'>
      <div className={classes['requests-page']}>
        {isLoading && <SpinnerLoading color='dark' />}
        {!isLoading && isError !== null && <Error message={isError} />}
        {!isLoading && isError === null && (
          <>
            <h2>{requests.length} requests</h2>
            <ul className={classes['requests-list']}>{requestsList}</ul>
          </>
        )}
      </div>
    </Container>
  );
};
export default Requests;
