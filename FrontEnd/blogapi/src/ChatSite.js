import React, { useEffect, useState } from 'react';
import './App.css';
import ChatApp from './components/chat/room';
import MessageLoadingComponent from './DataLoading';
import axiosInstance from './axios';
import { useParams } from 'react-router-dom';

function App() {
    const MessageLoading = MessageLoadingComponent(ChatApp);
    const [appState, setAppState] = useState({
        loading: true,
        messages: null,
        title: null,
    });
    const { slug } = useParams();

    useEffect(() => {
        axiosInstance.get("/chat/" + slug + "/").then((res) => {
            const allMessages = res.data.messages;
            console.log(res.data);
            console.log(allMessages);
            setAppState({ loading: false, messages: allMessages, title: res.data.room_name });
            console.log("RECEIVED MASSAGES FROM API!!!");
        });
    }, [setAppState, slug]);
    return (
        <div className="App">
            <MessageLoading isLoading={appState.loading} messages={appState.messages} room_slug={slug} room_title={appState.title} />
        </div>
    );
}
export default App;