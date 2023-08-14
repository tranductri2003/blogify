import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/posts/posts';
import PostLoadingComponent from './DataLoading';
import axiosInstance from './axios';
import queryString from 'query-string';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paginationContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing(2),
  },
  pageButton: {
    margin: theme.spacing(1),
  },
}));



function App() {
  const classes = useStyles(); // Add this line to get the classes object

  const PostLoading = PostLoadingComponent(Posts);
  const [appState, setAppState] = useState({
    loading: true,
    posts: null,
    next: null,
    previous: null,
    currentPage: 1,
    maxPage: 1,
    perPage: 1,
  });
  // Lấy các tham số từ URL của FE
  const params = queryString.parse(window.location.search);
  const urlParams = new URLSearchParams(window.location.search);
  const currentPage = parseInt(urlParams.get('page')) || 1;
  appState.currentPage = currentPage;


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
      setAppState({ loading: false, posts: allPosts, next: response.data.next, previous: response.data.previous, maxPage: response.data.count, perPage: response.data.page_size });
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
  const handlePageNumber = (pageNumber) => {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('page', pageNumber);

    // Tạo URL mới với giá trị parameter "page" tương ứng với số trang được nhấp
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
      {/* Container chứa cả dãy số trang và nút Previous và Next */}
      <div className={classes.paginationContainer}>
        {/* Hiển thị nút Previous nếu không phải trang đầu tiên */}
        {appState.previous != null && (
          <Button variant="contained" color="primary" onClick={handlePreviousPage} className={classes.pageButton}>
            Previous
          </Button>
        )}
        {/* Hiển thị dãy số trang */}
        {Array.from({ length: Math.ceil(appState.maxPage / appState.perPage) }, (_, index) => index + 1).map((page) => (
          <Button
            key={page}
            variant={page === appState.currentPage ? "contained" : "outlined"}
            color="primary"
            onClick={() => handlePageNumber(page)}
            className={classes.pageButton}
          >
            {page}
          </Button>
        ))}

        {/* Hiển thị nút Next nếu không phải trang cuối cùng */}
        {appState.next != null && (
          <Button variant="contained" color="primary" onClick={handleNextPage} className={classes.pageButton}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

export default App;
