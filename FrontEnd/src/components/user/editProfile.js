import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useHistory, useParams } from 'react-router-dom';
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { notification } from 'antd';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Create() {
    const history = useHistory();
    const initialFormData = Object.freeze({
        first_name: '',
        about: '',
        country: '',
        occupation: '',
        age: '',
        new_password: '', // Thêm trường mới
    });
    const user_name = localStorage.getItem('user_name');
    const [formData, updateFormData] = useState(initialFormData);
    const [postimage, setPostImage] = useState(null);

    useEffect(() => {
        axiosInstance.get('user/' + user_name + '/').then((res) => {
            updateFormData({
                ...formData,
                ['first_name']: res.data.first_name,
                ['about']: res.data.about,
                ['country']: res.data.country,
                ['occupation']: res.data.occupation,
                ['age']: res.data.age,
            });
            console.log(res.data);
        });
    }, [updateFormData]);

    const handleChange = (e) => {
        if ([e.target.name] == 'image') {
            setPostImage({
                image: e.target.files,
            });
        } else {
            updateFormData({
                ...formData,
                // Trimming any whitespace
                [e.target.name]: e.target.value.trim(),
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: localStorage.getItem('access_token')
                    ? 'JWT ' + localStorage.getItem('access_token')
                    : null,
            }
        };

        const URL = process.env.REACT_APP_API_URL + `user/edit/` + user_name + '/';
        let formDataToSend = new FormData(); // Đổi tên biến ở đây
        formDataToSend.append('first_name', formData.first_name);
        formDataToSend.append('about', formData.about);
        formDataToSend.append('country', formData.country);
        formDataToSend.append('occupation', formData.occupation);
        formDataToSend.append('age', formData.age);
        formDataToSend.append('password', formData.new_password); // Thêm dòng này

        if (postimage && postimage.image[0]) {
            formDataToSend.append('avatar', postimage.image[0]);
        }
        // In ra nội dung của formData để kiểm tra
        for (var pair of formDataToSend.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        } axiosInstance
            .put(URL, formDataToSend, config)
            .then((res) => {
                console.log(res.data);
                notification.success({
                    message: 'Update profile successfully',
                    description: 'Update profile successfully',
                    placement: 'topRight'
                });

                // Tiến hành chuyển hướng sau khi hiển thị thông báo thành công
                history.push({
                    pathname: `/profile/${localStorage.getItem('user_name')}/`,
                });
                //window.location.reload(); // Không cần reload trang ở đây
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
    };



    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(formData);

    //     axiosInstance.put(`user/edit/` + user_name + '/', {
    //         first_name: formData.first_name,
    //         about: formData.about,
    //         country: formData.country,
    //         occupation: formData.occupation,
    //         age: formData.age,
    //     })
    //         .then(function () {
    //             notification.success({
    //                 message: 'Edit profile successfully',
    //                 description: 'Edit profile successfully',
    //                 placement: 'topRight'
    //             });
    //             history.push({
    //                 pathname: `/profile/${localStorage.getItem('user_name')}/`,
    //             });
    //             // window.location.reload();
    //         }).catch((error) => {
    //             if (error.response) {
    //                 // Xử lý lỗi từ phản hồi của server (status code không thành công)
    //                 console.error('An error occurred while fetching data:', error.response.data);
    //                 console.error('Status code:', error.response.status);

    //                 if (error.response.status === 400) {
    //                     notification.error({
    //                         message: 'Bad Request',
    //                         description: 'The request sent to the server is invalid.',
    //                         placement: 'topRight'
    //                     });
    //                 } else if (error.response.status === 401) {
    //                     notification.warning({
    //                         message: 'Unauthorized',
    //                         description: 'You are not authorized to perform this action.',
    //                         placement: 'topRight'
    //                     });
    //                 } else if (error.response.status === 403) {
    //                     notification.warning({
    //                         message: 'Forbidden',
    //                         description: 'You do not have permission to access this resource.',
    //                         placement: 'topRight'
    //                     });
    //                 } else if (error.response.status === 404) {
    //                     notification.error({
    //                         message: 'Not Found',
    //                         description: 'The requested resource was not found on the server.',
    //                         placement: 'topRight'
    //                     });
    //                 } else if (error.response.status === 405) {
    //                     notification.error({
    //                         message: 'Method Not Allowed',
    //                         description: 'The requested HTTP method is not allowed for this resource.',
    //                         placement: 'topRight'
    //                     });
    //                 } else {
    //                     notification.error({
    //                         message: 'Error',
    //                         description: 'An error occurred while fetching data from the server.',
    //                         placement: 'topRight'
    //                     });
    //                 }
    //             } else if (error.request) {
    //                 // Xử lý lỗi không có phản hồi từ server
    //                 console.error('No response received from the server:', error.request);
    //                 notification.error({
    //                     message: 'No Response',
    //                     description: 'No response received from the server.',
    //                     placement: 'topRight'
    //                 });
    //             } else {
    //                 // Xử lý lỗi khác
    //                 console.error('An error occurred:', error.message);
    //                 notification.error({
    //                     message: 'Error',
    //                     description: 'An error occurred while processing the request.',
    //                     placement: 'topRight'
    //                 });
    //             }
    //         });
    // };
    const classes = useStyles();
    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Edit Profile
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="firstname"
                                label="First Name"
                                name="first_name"
                                autoComplete="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                        </Grid>
                        Avatar
                        <input
                            accept="image/*"
                            className={classes.input}
                            id="post-image"
                            onChange={handleChange}
                            name="image"
                            type="file"
                        />
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="About"
                                label="About"
                                name="about"
                                autoComplete="about"
                                value={formData.about}
                                onChange={handleChange}
                                multiline
                                rows={8}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="country"
                                label="country"
                                name="country"
                                autoComplete="country"
                                value={formData.country}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="occupation"
                                label="occupation"
                                name="occupation"
                                autoComplete="occupation"
                                value={formData.occupation}
                                onChange={handleChange}
                                multiline
                                rows={8}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="age"
                                label="age"
                                name="age"
                                autoComplete="age"
                                value={formData.age}
                                onChange={handleChange}
                                multiline
                                rows={8}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                id="new-password"
                                label="New Password"
                                name="new_password"
                                type="password"
                                autoComplete="new-password"
                                value={formData.new_password}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={handleSubmit}
                    >
                        Update Profile
                    </Button>
                </form>
            </div>
        </Container>
    );
}