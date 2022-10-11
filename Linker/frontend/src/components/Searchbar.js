import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useHttp from '../hooks/use-http';
import SpinnerLoading from './Loading/Spinner';
import Error from './Error';
import classes from '../css/Searchbar.module.css';

const SearchBar = () => {
  const { isError, isLoading, sendRequest } = useHttp();
  const [query, setQuery] = useState('');
  const [fetchedUsers, setFetchedUsers] = useState([]);

  const usersList =
    fetchedUsers.length > 0 &&
    fetchedUsers.map((user) => {
      return (
        <li key={user.user_id}>
          <Link to={`/${user.username}`}>
            <div
              style={{ backgroundImage: `url${user.profile}` }}
              title={user.username}
              className={classes.profilePic}
            ></div>
            <span>
              {user.fname} {user.lname}
            </span>
          </Link>
        </li>
      );
    });

  const queryChangeHandler = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    query.trim().length === 0 && setFetchedUsers([]);
    query.trim().length > 0 &&
      sendRequest('search', 'POST', { query: query }, setFetchedUsers);
  }, [query]);

  return (
    <div className={classes.searchbox}>
      <div className={classes['search-bar']}>
        <input
          type='search'
          placeholder='Type to Search ..'
          value={query}
          onChange={queryChangeHandler}
        />
      </div>
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
