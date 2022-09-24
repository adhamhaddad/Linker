import React from 'react';
import Post from '../Post/Post';

function Home(props) {
  const posts = props.posts.length ? (
    props.posts.map((post) => {
      return (
        <Post
          fname={props.information.fname}
          lname={props.information.lname}
          profile={props.photos.profile}
          timedate={post.timedate}
          content={post.content}
          reactions={post.reactions}
          setReactions={props.setReactions}
          key={post.id}
        />
      );
    })
  ) : (
    <p style={{ 'text-align': 'center' }}>No posts found!</p>
  );
  return <div className='container'>{posts}</div>;
}
export default Home;
