import React, { useEffect, useState } from 'react';
import { Card, CardContent, Grid, Typography, makeStyles } from '@material-ui/core';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
import { notification } from 'antd';

const useStyles = makeStyles((theme) => ({
    hall: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '50px',
        fontFamily: 'cursive', // Áp dụng font chữ cursive cho toàn bộ component
    },
    welcomeText: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: theme.palette.primary.main,
        marginBottom: '20px',
        fontFamily: 'cursive', // Áp dụng font chữ cursive cho toàn bộ component

    },
    gridContainer: {
        justifyContent: 'center',
    },
    roomCard: {
        border: '1px solid #ccc',
        borderRadius: '10px',
        padding: '15px',
        margin: '10px',
        width: '250px',
        cursor: 'pointer',
        transition: 'background-color 0.3s, transform 0.2s',
        '&:hover': {
            backgroundColor: '#f5f5f5',
            transform: 'scale(1.02)',
        },
    },
    roomName: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '5px',
        color: theme.palette.primary.main,
    },
    roomDescription: {
        fontSize: '14px',
        color: '#666',
        marginBottom: '10px',
    },
    roomId: {
        fontSize: '14px',
        color: '#999',
    },
}));

function ChatHall() {
    const classes = useStyles();
    const [rooms, setRooms] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axiosInstance.get('chat/')
            .then(response => {
                const data = response.data;
                setRooms(data.rooms);
            })
            .catch((error) => {
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
            });
    }, []);

    const handleCardClick = (slug) => {
        history.push(`/hall/${slug}`);
    };

    return (
        <div className={classes.hall}>
            <Typography className={classes.welcomeText}>
                Welcome to the Chat Hall
            </Typography>
            <Grid container spacing={3} className={classes.gridContainer}>
                {rooms.map(room => (
                    <Grid item key={room.id} xs={12} sm={6} md={4}>
                        <Card className={classes.roomCard} onClick={() => handleCardClick(room.slug)}>
                            <CardContent>
                                <Typography className={classes.roomName}>{room.name}</Typography>
                                <Typography className={classes.roomDescription}>{room.description}</Typography>
                                <Typography className={classes.roomId}>Room ID: {room.id}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
}

export default ChatHall;
