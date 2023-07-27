import React, { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/admin/posts';
import PostLoadingComponent from './components/posts/postLoading';
import axiosInstance from './axios';

function Admin() {
    const PostLoading = PostLoadingComponent(Posts);
    const [appState, setAppState] = useState({
        loading: true,
        posts: null,
    });

    const queryParams = {
        author__user_name: localStorage.getItem("user_name")
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
export default Admin;