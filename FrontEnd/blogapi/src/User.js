import React, { useEffect, useState } from 'react';
import './App.css';
import UserSite from './components/user/userSite';
import PostLoadingComponent from './dataLoading';
import axiosInstance from './axios';
import { useParams } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import queryString from 'query-string';



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


function User() {
    const classes = useStyles(); // Add this line to get the classes object

    const PostLoading = PostLoadingComponent(UserSite);
    const [UserState, setUserState] = useState({
        loading: true,
        user: null,
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
    UserState.currentPage = currentPage;



    const { userName } = useParams();

    // Gọi API để lấy thông tin người dùng
    useEffect(() => {
        axiosInstance.get(`user/${userName}/`)
            .then((res) => {
                const user = res.data;
                setUserState((prevState) => ({ ...prevState, user }));
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
                setUserState((prevState) => ({ ...prevState, loading: false }));
            });
    }, [userName]);




    // Gọi API để lấy danh sách các bài đăng của người dùng
    useEffect(() => {
        const queryParams = {
            category__slug: params.category,
            page: params.page,
            author__user_name: userName,
        };
        const url = axiosInstance.getUri({
            url: "post/",
            params: queryParams,
        });
        axiosInstance.get(url)
            .then((response) => {
                const allPosts = response.data.results;
                setUserState((prevState) => ({ ...prevState, loading: false, posts: allPosts, next: response.data.next, previous: response.data.previous, maxPage: response.data.count, perPage: response.data.page_size }));
            })
            .catch((error) => {
                console.error('Error fetching user posts:', error);
                setUserState((prevState) => ({ ...prevState, loading: false }));
            });
    }, [params.category, params.page, userName]);

    // Kiểm tra xem cả hai API request đã thành công và có dữ liệu trả về
    if (UserState.loading) {
        return (
            <div className="App">
                <div>
                    <PostLoading isLoading={true} />
                </div>
            </div>
        );
    }
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

    // Khi cả hai request thành công và có dữ liệu trả về, hiển thị component UserSite
    return (
        <div className="App">
            <div>
                <PostLoading isLoading={UserState.loading} user={UserState.user} posts={UserState.posts} />
            </div>
            {/* Container chứa cả dãy số trang và nút Previous và Next */}
            <div className={classes.paginationContainer}>
                {/* Hiển thị nút Previous nếu không phải trang đầu tiên */}
                {UserState.previous != null && (
                    <Button variant="contained" color="primary" onClick={handlePreviousPage} className={classes.pageButton}>
                        Previous
                    </Button>
                )}
                {/* Hiển thị dãy số trang */}
                {Array.from({ length: Math.ceil(UserState.maxPage / UserState.perPage) }, (_, index) => index + 1).map((page) => (
                    <Button
                        key={page}
                        variant={page === UserState.currentPage ? "contained" : "outlined"}
                        color="primary"
                        onClick={() => handlePageNumber(page)}
                        className={classes.pageButton}
                    >
                        {page}
                    </Button>
                ))}

                {/* Hiển thị nút Next nếu không phải trang cuối cùng */}
                {UserState.next != null && (
                    <Button variant="contained" color="primary" onClick={handleNextPage} className={classes.pageButton}>
                        Next
                    </Button>
                )}
            </div>
        </div>
    );
}

export default User;
