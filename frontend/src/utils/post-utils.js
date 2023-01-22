// TRANSFORM POST
export const transformPost = (post, setState) => {
  const transformedData = {
    ...post,
    content: {
      caption: post.post_caption,
      img: post.post_img,
      video: post.post_video
    }
  };
  setState(transformedData);
};

// TRANSFORM POSTS
export const transformPosts = (data, setState) => {
  const transformedData = data.map((post) => {
    return {
      ...post,
      content: {
        caption: post.post_caption,
        img: post.post_img,
        video: post.post_video
      }
    };
  });
  setState((prev) => [...prev, ...transformedData]);
};

export const newPostAdded = (data, setState) => {
  setState((prev) => {
    return [
      ...prev,
      {
        ...data,
        content: {
          caption: data.post_caption,
          img: data.post_img,
          video: data.post_video
        }
      }
    ];
  });
};

// UPDATE POST
export const newPostUpdate = (data, setState) => {
  setState((prev) => [...prev, data]);
};

// DELETE POST
export const newPostDelete = (data, setState) => {
  setState((prev) => prev.filter((post) => post.post_id !== data.post_id));
};

// SOCKET FUNCTIONS
export const newLikeAdded = (data, setState) => {
  setState((prev) => [...prev, data]);
};
export const newLikeRemoved = (data, setState) => {
  setState((prev) => prev.filter((like) => like.user_id !== data.user_id));
};
