import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthenticateContext from '../utils/authentication';
import useHttp from '../hooks/use-http';
import SpinnerLoading from '../components/Loading/Spinner';
import Error from '../components/Error';
import Container from '../components/UI/Container';
import classes from '../css/Requests.module.css';
import apiUrlContext from '../utils/api-urls';

const Requests = ({ socket }) => {
  const [requests, setRequests] = useState([]);
  const { isLoading, isError, sendRequest } = useHttp();
  const authCtx = useContext(AuthenticateContext);
  const apiCtx = useContext(apiUrlContext)
  // NEW REQUEST
  const newFriendRequest = (data) => {
    setRequests((prev) => [...prev, data]);
  };

  // ACCEPT REQUEST
  const acceptRequest = (user) => {
    sendRequest(
      'accept-request',
      'PATCH',
      { sender_id: user.user_id, receiver_id: authCtx.user.user_id },
      null
    );
  };
  const newAcceptedRequest = (data) => {
    setRequests((prev) =>
      prev.filter((request) => request.user_id !== data.sender_user.user_id)
    );
  };

  // IGNORE REQUEST
  const ignoreRequest = (user) => {
    sendRequest(
      'ignore-request',
      'DELETE',
      { sender_id: user.sender_id, receiver_id: authCtx.user.user_id },
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
          >
            {request.profile_picture !== null && (
              <img
                crossOrigin='anonymous'
                src={`${apiCtx.url}/${request.profile_picture}`}
                alt={request.username}
              />
            )}
          </Link>
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
    sendRequest(
      `requests?user_id=${authCtx.user.user_id}`,
      'GET',
      {},
      setRequests
    );
    socket.on('friends', (data) => {
      if (data.action === 'FRIEND_REQUEST') {
        // console.log(data.data)
        if (data.data.receiver_id === authCtx.user.user_id) {
          newFriendRequest(data.data);
        }
      }
      if (data.action === 'ACCEPT_REQUEST') {
        if (data.data.result.receiver_id === authCtx.user.user_id) {
          newAcceptedRequest(data.data);
        }
      }
      if (data.action === 'CANCEL_REQUEST') {
        if (data.data.receiver_id === authCtx.user.user_id) {
          newRequestIgnored(data.data);
        }
      }
      if (data.action === 'IGNORE_REQUEST') {
        if (data.data.receiver_id === authCtx.user.user_id) {
          newRequestIgnored(data.data);
        }
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
            <h2>requests ({requests.length})</h2>
            <ul className={classes['requests-list']}>{requestsList}</ul>
          </>
        )}
      </div>
    </Container>
  );
};
export default Requests;
