import React, { useEffect, useState } from 'react';
import './App.css';
import PostRanking from './components/ranking/postRanking';
import UserRanking from './components/ranking/userRanking';
import DataLoadingComponent from './DataLoading';
import axiosInstance from './axios';
import { useParams } from 'react-router-dom';



function App() {
    const { object } = useParams();
    const [appState, setAppState] = useState({
        loading: true,
        data: null,
    });
    const DataLoading = object === 'user' ? DataLoadingComponent(UserRanking) : DataLoadingComponent(PostRanking);
    const apiUrl = object === 'user' ? '/user/ranking/?ordering=-num_post,-num_view,-num_like,-num_comment,user_name' : '/post/ranking/?ordering=-num_view,-num_like,-num_comment,slug';
    useEffect(() => {
        axiosInstance.get(apiUrl).then((response) => {
            setAppState({ loading: false, data: response.data });
            console.log(response.data);
        });
    }, [setAppState, apiUrl]);
    return (
        <div className="App">
            <div style={{ fontFamily: 'cursive', fontSize: '32px', fontWeight: 'bold', marginTop: '30px', marginBottom: '30px' }}>
                <span role="img" aria-label="Ranking">📝</span> {object === 'user' ? 'Writer Ranking' : 'Post Ranking'}
            </div>
            <DataLoading isLoading={appState.loading} data={appState.data} />
        </div>
    );
}
export default App;