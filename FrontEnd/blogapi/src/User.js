import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/user/userProfile';
import PostLoadingComponent from './components/posts/postLoading';
import axiosInstance from './axios';
import { useParams } from 'react-router-dom';


function User() {
    const PostLoading = PostLoadingComponent(Posts);
    const [appState, setAppState] = useState({
        loading: true,
        posts: null,
    });
    const { userName } = useParams();

    const queryParams = {
        author__user_name: userName,
    };

    const url = axiosInstance.getUri({
        url: "",
        params: queryParams,
    });

    useEffect(() => {
        axiosInstance.get(url).then((res) => {
            const allPosts = res.data;
            setAppState({ loading: false, posts: allPosts });
            console.log(res.data);
        });
    }, [setAppState, url]);

    return (
        <div className="App">
            <h1>Latest Posts</h1>
            <PostLoading isLoading={appState.loading} posts={appState.posts} />
        </div>
    );
}
export default User;