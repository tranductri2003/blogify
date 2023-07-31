import React, { useEffect, useState } from 'react';
import './App.css';
import UserSite from './components/user/userSite';
import PostLoadingComponent from './components/posts/postLoading';
import axiosInstance from './axios';
import { useParams } from 'react-router-dom';

function User() {
    const PostLoading = PostLoadingComponent(UserSite);
    const [userData, setUserData] = useState({
        loading: true,
        user: null,
        posts: null,
    });

    const { userName } = useParams();

    // Gọi API để lấy thông tin người dùng
    useEffect(() => {
        axiosInstance.get(`user/${userName}/`)
            .then((res) => {
                const user = res.data;
                setUserData((prevState) => ({ ...prevState, user }));
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
                setUserData((prevState) => ({ ...prevState, loading: false }));
            });
    }, [userName]);

    // Gọi API để lấy danh sách các bài đăng của người dùng
    useEffect(() => {
        const queryParams = {
            author__user_name: userName,
        };
        axiosInstance.get('post/', { params: queryParams })
            .then((res) => {
                const posts = res.data;
                setUserData((prevState) => ({ ...prevState, loading: false, posts }));
            })
            .catch((error) => {
                console.error('Error fetching user posts:', error);
                setUserData((prevState) => ({ ...prevState, loading: false }));
            });
    }, [userName]);

    // Kiểm tra xem cả hai API request đã thành công và có dữ liệu trả về
    if (userData.loading) {
        return (
            <div className="App">
                <div>
                    <PostLoading isLoading={true} />
                </div>
            </div>
        );
    }

    // Khi cả hai request thành công và có dữ liệu trả về, hiển thị component UserSite
    return (
        <div className="App">
            <UserSite user={userData.user} posts={userData.posts} />
        </div>
    );
}

export default User;
