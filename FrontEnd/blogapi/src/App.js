import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/posts/posts';
import PostLoadingComponent from './components/posts/postLoading';
import axiosInstance from './axios';
import { useParams } from 'react-router-dom';
function App() {
  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({
    loading: true,
    posts: null,
  });
  const { slug } = useParams();
  console.log(slug);
  useEffect(() => {
    if (slug) {
      axiosInstance.get(`/category/${slug}/`).then((res) => {
        const allPosts = res.data;
        console.log(res.data);
        setAppState({ loading: false, posts: allPosts });
        console.log(res.data);
      });
    } else {
      axiosInstance.get().then((res) => {
        const allPosts = res.data;
        console.log(res.data);
        setAppState({ loading: false, posts: allPosts });
        console.log(res.data);
      });
    }
  }, [setAppState, slug]);

  return (
    <div className="App">
      <div style={{ fontFamily: 'cursive', fontSize: '32px', fontWeight: 'bold', marginTop: '30px', marginBottom: '30px' }}>
        <span role="img" aria-label="Latest Posts">📝</span> Latest Posts
      </div>
      <div>
        <PostLoading isLoading={appState.loading} posts={appState.posts} />
      </div>
    </div>
  );
}

export default App;
