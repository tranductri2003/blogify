import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/posts/posts';
import PostLoadingComponent from './components/posts/postLoading';
import axiosInstance from './axios';
import queryString from 'query-string';
import Button from '@material-ui/core/Button';


function App() {
  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({
    loading: true,
    posts: null,
    next: null,
    previous: null,
    currentPage: 1,
  });
  // Lấy các tham số từ URL của FE
  const params = queryString.parse(window.location.search);

  const queryParams = {
    category__slug: params.category,
    author__user_name: params.author,
    page: params.page,
  };
  const url = axiosInstance.getUri({
    url: "post/",
    params: queryParams,
  });

  useEffect(() => {
    axiosInstance.get(url).then((response) => {
      const allPosts = response.data.results;
      setAppState({ loading: false, posts: allPosts, next: response.data.next, previous: response.data.previous });
      console.log(response.data);
    });
  }, [setAppState, url]);



  // Thêm hàm xử lý khi nhấp nút Previous
  const handlePreviousPage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const currentPage = parseInt(urlParams.get('page')) || 1;
    urlParams.set('page', currentPage - 1);

    // Tạo URL mới với giá trị parameter "page" tăng lên 1
    const newUrl = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;

    // Chuyển hướng trang sang URL mới
    window.location.href = newUrl;
  };

  // Thêm hàm xử lý khi nhấp nút Next
  const handleNextPage = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const currentPage = parseInt(urlParams.get('page')) || 1;
    urlParams.set('page', currentPage + 1);

    // Tạo URL mới với giá trị parameter "page" tăng lên 1
    const newUrl = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;

    // Chuyển hướng trang sang URL mới
    window.location.href = newUrl;
  };


  return (
    <div className="App">
      <div style={{ fontFamily: 'cursive', fontSize: '32px', fontWeight: 'bold', marginTop: '30px', marginBottom: '30px' }}>
        <span role="img" aria-label="Latest Posts">📝</span> Latest Posts
      </div>
      <div>
        <PostLoading isLoading={appState.loading} posts={appState.posts} />
      </div>
      {/* Hiển thị nút Previous nếu không phải trang đầu tiên */}
      {appState.previous != null && (
        <Button variant="contained" color="primary" onClick={handlePreviousPage}>
          Previous
        </Button>
      )}
      {/* Hiển thị nút Next nếu không phải trang cuối cùng */}
      {appState.next != null && (
        <Button variant="contained" color="primary" onClick={handleNextPage}>
          Next
        </Button>
      )}
    </div>
  );
}

export default App;
