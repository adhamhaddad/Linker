import React, { useState, useEffect, useContext } from 'react';
import Logo from '../Logo';
import SearchBar from '../Searchbar';
import NavigationBar from './NavigationBar';
import MiniNavigationBar from './MiniNavigationBar';
import useHttp from '../../hooks/use-http';
import Container from '../UI/Container';
import AuthenticateContext from '../../utils/authentication';
import classes from '../../css/Header.module.css';

const Header = ({ socket, translation }) => {
  const [requests, setRequests] = useState([]);
  const [messages, setMessages] = useState([]);
  const [posts, setPosts] = useState([]);
  const authCtx = useContext(AuthenticateContext);

  const { sendRequest } = useHttp();

  const getMessages = () => {
    sendRequest('messages', 'GET', {}, null);
  };
  const getRequests = () => {
    sendRequest(
      `requests?user_id=${authCtx.user.user_id}`,
      'GET',
      {},
      setRequests
    );
  };

  // NEW REQUEST
  const newFriendRequest = (data) => {
    setRequests((prev) => [...prev, data]);
  };

  // ACCEPT REQUEST
  const newAcceptedRequest = (data) => {
    setRequests((prev) =>
      prev.filter((request) => request.user_id !== data.user_id)
    );
  };

  // IGNORE REQUEST
  const newRequestIgnored = (data) => {
    setRequests((prev) =>
      prev.filter((request) => request.user_id !== data.user_id)
    );
  };

  const getHomeNewPosts = () => {};

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
      setMessages([]);
      setRequests([]);
      setPosts([]);
    };
  }, []);

  return (
    <nav className={classes['navbar']}>
      <Container className='header'>
        <MiniNavigationBar style='hide' />
        <NavigationBar
          requests={requests}
          messages={messages}
          posts={posts}
          translation={translation}
        />
      </Container>
    </nav>
  );
};
export default Header;
