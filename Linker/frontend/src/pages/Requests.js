import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import SpinnerLoading from '../components/Loading/Spinner';
import Error from '../components/Error';
import Container from '../components/UI/Container';
import classes from '../css/Requests.module.css';

const Requests = ({ user_id, socket }) => {
  const [requests, setRequests] = useState([]);
  const { isLoading, isError, sendRequest } = useHttp();

  // NEW REQUEST
  const newFriendRequest = (data) => {
    setRequests((prev) => [...prev, data]);
  };

  // ACCEPT REQUEST
  const acceptRequest = (user) => {
    sendRequest(
      'user/accept-request',
      'PATCH',
      { sender_id: user.user_id },
      null
    );
  };
  const newAcceptedRequest = (data) => {
    setRequests((prev) =>
      prev.filter((request) => request.user_id !== data.user_id)
    );
  };

  // IGNORE REQUEST
  const ignoreRequest = (user) => {
    sendRequest(
      'user/ignore-request',
      'DELETE',
      { sender_id: user.sender_id, receiver_id: user_id },
      null
    );
  };
  const newRequestIgnored = (data) => {
    setRequests((prev) =>
      prev.filter((request) => request.friend_id !== data.friend_id)
    );
  };

  const requestsList =
    requests.length > 0 &&
    requests.map((request) => {
      return (
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
            className={`${classes['request-accept']} ${classes['actions']}`}
            onClick={() => acceptRequest(request)}
          >
            <i className='fa-solid fa-check'></i>
          </button>
          <button
            className={`${classes['request-ignore']} ${classes['actions']}`}
            onClick={() => ignoreRequest(request)}
          >
            <i className='fa-solid fa-xmark'></i>
          </button>
        </li>
      );
    });

  useEffect(() => {
    sendRequest(`user/requests?user_id=${user_id}`, 'GET', {}, setRequests);
    socket.on('friends', (data) => {
      if (data.action === 'FRIEND_REQUEST') {
        newFriendRequest(data.data);
      }
      if (data.action === 'ACCEPT_REQUEST') {
        newAcceptedRequest(data.data);
      }
      if (data.action === 'CANCEL_REQUEST') {
        newRequestIgnored(data.data);
      }
      if (data.action === 'IGNORE_REQUEST') {
        newRequestIgnored(data.data);
      }
    });
  }, []);

  return (
    <Container className='requests'>
      <div className={classes['requests-page']}>
        {isLoading && <SpinnerLoading color='dark' />}
        {!isLoading && isError !== null && <Error message={isError} />}
        {!isLoading && isError === null && (
          <>
            <div className={classes['request-news']}>
              <span>You and {} are now friends</span>
              <button className={classes['hide-notifi']}>
                <i className='fa-solid fa-xmark'></i>
              </button>
            </div>
            <h2>{requests.length} requests</h2>
            <ul className={classes['requests-list']}>{requestsList}</ul>
          </>
        )}
      </div>
    </Container>
  );
};
export default Requests;
