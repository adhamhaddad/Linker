import React, { useState, useEffect, useContext } from 'react';
import AuthenticateContext from '../utils/authentication';
import useHttp from '../hooks/use-http';
import SpinnerLoading from '../components/Loading/Spinner';
import Error from '../components/Error';
import Container from '../components/UI/Container';
import RequestCard from '../components/RequestCard';
import classes from '../css/Requests.module.css';

const Requests = ({ socket }) => {
  const [requests, setRequests] = useState([]);
  const { isLoading, isError, sendRequest } = useHttp();
  const authCtx = useContext(AuthenticateContext);

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
      prev.filter((request) => request.user_id !== data.user_id)
    );
  };

  // IGNORE REQUEST
  const ignoreRequest = (user) => {
    sendRequest(
      'ignore-request',
      'DELETE',
      { sender_id: user.user_id, receiver_id: authCtx.user.user_id },
      null
    );
  };
  const newRequestIgnored = (data) => {
    setRequests((prev) =>
      prev.filter((request) => request.user_id !== data.user_id)
    );
  };

  const requestsList =
    requests.length > 0 &&
    requests.map((request) => {
      return (
        <RequestCard
          key={request.user_id}
          request={request}
          acceptRequest={acceptRequest}
          ignoreRequest={ignoreRequest}
        />
      );
    });

  const getRequests = () => {
    sendRequest(
      `requests?user_id=${authCtx.user.user_id}`,
      'GET',
      {},
      setRequests
    );
  };
  useEffect(() => {
    getRequests();

    socket.on('friends', (data) => {
      if (data.action === 'FRIEND_REQUEST') {
        if (data.data.receiver_user.user_id === authCtx.user.user_id) {
          newFriendRequest(data.data.sender_user);
        }
      }
      if (data.action === 'ACCEPT_REQUEST') {
        if (data.data.receiver_user.user_id === authCtx.user.user_id) {
          newAcceptedRequest(data.data.sender_user);
        }
      }
      if (data.action === 'CANCEL_REQUEST') {
        if (data.data.receiver_user.user_id === authCtx.user.user_id) {
          newRequestIgnored(data.data.sender_user);
        }
      }
      if (data.action === 'IGNORE_REQUEST') {
        if (data.data.receiver_user.user_id === authCtx.user.user_id) {
          newRequestIgnored(data.data.sender_user);
        }
      }
    });

    return () => {
      setRequests([]);
    };
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
