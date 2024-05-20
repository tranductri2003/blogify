import React, { useEffect, useState } from 'react';
import './App.css';
import PostRanking from './components/ranking/postRanking';
import UserRanking from './components/ranking/userRanking';
import DataLoadingComponent from './DataLoading';
import axiosInstance from './axios';
import { useParams } from 'react-router-dom';
import { notification } from 'antd'


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
        }).catch((error) => {
            if (error.response) {
                // Xử lý lỗi từ phản hồi của server (status code không thành công)
                console.error('An error occurred while fetching data:', error.response.data);
                console.error('Status code:', error.response.status);

                if (error.response.status === 400) {
                    notification.error({
                        message: 'Bad Request',
                        description: 'The request sent to the server is invalid.',
                        placement: 'topRight'
                    });
                } else if (error.response.status === 401) {
                    notification.warning({
                        message: 'Unauthorized',
                        description: 'You are not authorized to perform this action.',
                        placement: 'topRight'
                    });
                } else if (error.response.status === 403) {
                    notification.warning({
                        message: 'Forbidden',
                        description: 'You do not have permission to access this resource.',
                        placement: 'topRight'
                    });
                } else if (error.response.status === 404) {
                    notification.error({
                        message: 'Not Found',
                        description: 'The requested resource was not found on the server.',
                        placement: 'topRight'
                    });
                } else if (error.response.status === 405) {
                    notification.error({
                        message: 'Method Not Allowed',
                        description: 'The requested HTTP method is not allowed for this resource.',
                        placement: 'topRight'
                    });
                } else {
                    notification.error({
                        message: 'Error',
                        description: 'An error occurred while fetching data from the server.',
                        placement: 'topRight'
                    });
                }
            } else if (error.request) {
                // Xử lý lỗi không có phản hồi từ server
                console.error('No response received from the server:', error.request);
                notification.error({
                    message: 'No Response',
                    description: 'No response received from the server.',
                    placement: 'topRight'
                });
            } else {
                // Xử lý lỗi khác
                console.error('An error occurred:', error.message);
                notification.error({
                    message: 'Error',
                    description: 'An error occurred while processing the request.',
                    placement: 'topRight'
                });
            }
        });;
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