import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { Container, Paper, Typography, TextField, Button, makeStyles } from '@material-ui/core';
import { notification } from 'antd';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
    },
    paper: {
        padding: theme.spacing(3),
        maxWidth: 400,
        width: '100%',
        textAlign: 'center',
        fontFamily: 'cursive', // Đặt font chữ là cursive
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    textField: {
        marginBottom: theme.spacing(2),
    },
}));

function ForgotPassword() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Data being sent:', { email }); // Log dữ liệu gửi đi

        axiosInstance.post('/user/send-reset-password/', { email })
            .then((response) => {
                setMessage(response.data.message);
                notification.success({
                    message: 'Check your email',
                    description: 'Please check your mail to reset your password!',
                    placement: 'topRight'
                });
            })
            .catch((error) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        // Xử lý thông tin đăng nhập sai
                        notification.warning({
                            message: 'Error',
                            description: 'An error occurred while processing your request',
                            placement: 'topRight',
                        });
                    } else {
                        // Xử lý lỗi khác
                        notification.error({
                            message: 'Error',
                            description: 'Error. Please try again.',
                            placement: 'topRight',
                        });
                    }
                } else {
                    console.error('An error occurred:', error.message);
                }
            });
    };

    return (
        <div className={classes.container}>
            <Paper className={classes.paper} elevation={3}>
                <Typography variant="h5">Forgot Password</Typography>
                {/* Chú thích hướng dẫn */}
                <Typography variant="body2" color="textSecondary" gutterBottom>
                    Please enter your email below to reset your password.
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        variant="outlined"
                        className={classes.textField}
                        fullWidth
                        required
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Reset Password
                    </Button>
                </form>
                {message && <Typography variant="body1">{message}</Typography>}
            </Paper>
        </div>
    );
}

export default ForgotPassword;
