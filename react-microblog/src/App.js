import React, { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [posts, setPosts] = useState([]);

  // Add a new post
  function addPost() {
    if (text.trim() === "") {
      alert("Please enter something!");
      return;
    }

    const newPost = {
      id: Date.now(),
      text: text.trim(),
      likes: 0
    };

    setPosts([newPost, ...posts]);
    setText("");
  }

  // Like a post
  function likePost(id) {
    setPosts(
      posts.map(function (post) {
        if (post.id === id) {
          return {
            ...post,
            likes: post.likes + 1
          };
        }
        return post;
      })
    );
  }

  // Delete a post
  function deletePost(id) {
    setPosts(
      posts.filter(function (post) {
        return post.id !== id;
      })
    );
  }

  return (
    <div className="app">
      <header>
        <h1>MiniBlog</h1>
        <p>Share your thoughts with everyone</p>
      </header>

      <div className="create-post">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What's happening?"
        />
        <button type="button" onClick={addPost}>
          Post
        </button>
      </div>

      <div className="posts">
        {posts.length === 0 ? (
          <p className="empty">No posts yet. Create the first post!</p>
        ) : (
          posts.map(function (post) {
            return (
              <div className="post" key={post.id}>
                <div className="profile">
                  <div className="avatar">U</div>
                  <b>User</b>
                </div>
                <p className="post-text">{post.text}</p>
                <div className="actions">
                  <button type="button" onClick={() => likePost(post.id)}>
                    ❤️ {post.likes}
                  </button>
                  <button type="button" onClick={() => deletePost(post.id)}>
                    🗑️ Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default App;

