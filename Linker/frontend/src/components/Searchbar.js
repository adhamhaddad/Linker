import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import AuthenticateContext from '../utils/authentication';
import SpinnerLoading from './Loading/Spinner';
import Error from './Error';
import classes from '../css/Searchbar.module.css';

const SearchBar = () => {
  const authCtx = useContext(AuthenticateContext);
  const { isError, isLoading, sendRequest } = useHttp();
  const [query, setQuery] = useState('');
  const [fetchedUsers, setFetchedUsers] = useState([]);

  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };
  const closeListHandler = () => {
    setQuery('');
  };

  const usersList =
    fetchedUsers.length > 0 &&
    fetchedUsers.map((user) => {
      return (
        <li key={user.user_id}>
          <Link to={`/profile/${user.username}`} onClick={closeListHandler}>
            <div
              style={{ backgroundImage: `url${user.profile}` }}
              title={user.username}
              className={classes.profilePic}
            ></div>
            <span>
              {user.first_name} {user.last_name}
            </span>
          </Link>
        </li>
      );
    });

  useEffect(() => {
    query.trim().length === 0 && setFetchedUsers([]);
    query.trim().length > 0 &&
      sendRequest(
        'search',
        'POST',
        {
          user_id: authCtx.user.user_id,
          query: query
        },
        setFetchedUsers
      );
  }, [query]);

  return (
    <div className={classes.searchbox}>
      <input
        type='search'
        placeholder='Type to Search ..'
        value={query}
        onChange={queryChangeHandler}
      />
      {usersList.length > 0 && (
        <ul className={classes.usersList}>
          {isError !== null && <Error />}
          {isLoading && <SpinnerLoading />}
          {usersList.length > 0 && usersList}
        </ul>
      )}
    </div>
  );
};
export default SearchBar;
