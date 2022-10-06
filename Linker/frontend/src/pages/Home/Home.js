import React, { useCallback, useEffect, useState, useContext } from 'react';
import Container from '../../components/UI/Container/Container';
import Authenticate from '../../Authentication/auth';
import Post from '../../components/Post/Post';

function Home(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const ctx = useContext(Authenticate);
  const [allPosts, setAllPosts] = useState([]);

  const getAllPosts = useCallback(async () => {
    setIsLoading(true);
    setIsError(null);

    try {
      const response = await fetch('http://192.168.1.6:3000/posts', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: ctx.user.id })
      });
      if (!response.ok) {
        throw new Error('Could not get the posts');
      }
      const data = await response.json();
      const transformPost = await data.data.map((post) => {
        return {
          id: post.post_id,
          timedate: post.timedate,
          content: {
            caption: post.caption,
            img: post.img,
            video: post.video
          },
          user_id: post.user_id
        };
      });
      setAllPosts(transformPost);
    } catch (error) {
      setIsError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllPosts();
  }, []);

  const posts = allPosts.length ? (
    allPosts
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
