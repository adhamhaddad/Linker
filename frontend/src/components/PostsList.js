import React from 'react';
import classes from '../css/PostsList.module.css';

const PostsList = ({ posts, theme }) => {
  return (
    <div className={classes['posts']} style={{ backgroundColor: theme }}>
      {posts}
    </div>
  );
};
export default PostsList;
