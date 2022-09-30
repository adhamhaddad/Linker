import React from 'react';
import Container from '../UI/Container/Container';
import Post from '../Post/Post';

function Home(props) {
  const posts = props.allPosts.length ? (
    props.allPosts
      .map((post) => {
        return (
          <Post
            fname={props.information.fname}
            lname={props.information.lname}
            profile={props.information.profile}
            timedate={post.timedate}
            content={post.content}
            reactions={props.reactions}
            setReactions={props.setReactions}
            key={new Date(post.timedate).getTime()}
          />
        );
      })
      .sort((a, b) => b.key - a.key)
  ) : (
    <p style={{ textAlign: 'center' }}>No posts found!</p>
  );
  return <Container>{posts}</Container>;
}
export default Home;
