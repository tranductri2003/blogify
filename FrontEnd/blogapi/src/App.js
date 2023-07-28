import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/posts/posts';
import PostLoadingComponent from './components/posts/postLoading';
import axiosInstance from './axios';
import { useParams } from 'react-router-dom';
import queryString from 'query-string';


function App() {
  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({
    loading: true,
    posts: null,
  });
  // Lấy các tham số từ URL của FE
  const params = queryString.parse(window.location.search);

  const queryParams = {
    category__slug: params.category,
    author__user_name: params.author
  };
  const url = axiosInstance.getUri({
    url: "",
    params: queryParams,
  });
  console.log(url);
  useEffect(() => {
    axiosInstance.get(url).then((res) => {
      const allPosts = res.data;
      setAppState({ loading: false, posts: allPosts });
      console.log(res.data);
    });
  }, [setAppState, url]);

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
