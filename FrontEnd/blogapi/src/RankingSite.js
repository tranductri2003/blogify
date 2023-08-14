import React, { useEffect, useState } from 'react';
import './App.css';
import PostRanking from './components/ranking/postRanking';
import UserRanking from './components/ranking/userRanking';
import DataLoadingComponent from './DataLoading';
import axiosInstance from './axios';
import queryString from 'query-string';

function App() {
    const params = queryString.parse(window.location.search);
    const [appState, setAppState] = useState({
        loading: true,
        data: null,
    });
    const DataLoading = params.object === 'user' ? DataLoadingComponent(UserRanking) : DataLoadingComponent(PostRanking);
    const apiUrl = params.object === 'user' ? '/api/user/ranking/' : '/api/post/ranking/';

    useEffect(() => {
        axiosInstance.get(apiUrl).then((response) => {
            setAppState({ loading: false, data: response.data });
            console.log(useState.data);
        });
    }, [setAppState, apiUrl]);
    return (
        <div className="App">
            <DataLoading isLoading={appState.loading} posts={appState.posts} />
        </div>
    );
}
export default App;