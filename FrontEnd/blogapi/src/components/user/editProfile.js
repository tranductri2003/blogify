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
    });
    const user_name = localStorage.getItem('user_name');
    const [formData, updateFormData] = useState(initialFormData);

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
        updateFormData({
            ...formData,
            // Trimming any whitespace
            [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);

        axiosInstance.put(`user/edit/` + user_name + '/', {
            first_name: formData.first_name,
            about: formData.about,
            country: formData.country,
            occupation: formData.occupation,
            age: formData.age,
        })
            .then(function () {
                history.push({
                    pathname: `/profile/${localStorage.getItem('user_name')}/`,
                });
                window.location.reload();
            });
    };

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