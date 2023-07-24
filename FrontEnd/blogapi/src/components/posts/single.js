import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useParams } from 'react-router-dom';
//MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'cursive', // Thay đổi font chữ sang cursive
    },
    comment: {
        marginTop: theme.spacing(2),
        padding: theme.spacing(2),
        backgroundColor: '#f5f5f5',
        borderRadius: theme.spacing(1),
        fontFamily: 'cursive', // Thay đổi font chữ sang cursive
    },
    postContent: {
        textAlign: 'justify', // Căn đều hai lề
        whiteSpace: 'pre-wrap', // Xuống dòng giống như trong trang admin
        marginBottom: theme.spacing(2), // Khoảng cách dưới nội dung
        fontFamily: 'cursive', // Thay đổi font chữ sang cursive
    },
}));

const imgLink =
    "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260";

export default function Post() {
    const { slug } = useParams();
    const classes = useStyles();

    const [data, setData] = useState({
        posts: [],
    });

    useEffect(() => {
        axiosInstance.get('post/' + slug + '/').then((res) => {
            setData({
                posts: res.data,
            });
            console.log(res.data);
        });
    }, [setData]);

    return (
        <Container component="main" maxWidth="xl">
            <CssBaseline />
            <div className={classes.paper}>
                <div className={classes.heroContent}>
                    <Container maxWidth="xl">
                        {/* Thêm hình ảnh vào đầu bài viết */}
                        <img src={data.posts.image} alt={data.posts.title} style={{ width: '100%', marginBottom: 10 }} />

                        <Typography
                            component="h1"
                            variant="h2"
                            align="center"
                            color="textPrimary"
                            gutterBottom
                        >
                            {data.posts.title}
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="textSecondary"
                            paragraph
                        >
                            {data.posts.excerpt}
                        </Typography>
                        <Typography
                            variant="h5"
                            align="center"
                            color="textSecondary"
                            paragraph
                            className={classes.postContent} // Thêm lớp CSS tùy chỉnh vào đây
                        >
                            {data.posts.content}
                        </Typography>
                    </Container>
                </div>
                {data.posts.comments && data.posts.comments.length > 0 && (
                    <div>
                        <Typography variant="h5" gutterBottom>
                            Comments
                        </Typography>
                        {data.posts.comments.map((comment) => (
                            <Paper className={classes.comment} key={comment.id}>
                                <Grid container wrap="nowrap" spacing={2}>
                                    <Grid item>
                                        <Avatar alt="Remy Sharp" src={imgLink} />
                                    </Grid>
                                    <Grid justifyContent="left" item xs zeroMinWidth>
                                        <Typography variant="h6" style={{ margin: 0, textAlign: "left" }}>
                                            {comment.author}
                                        </Typography>
                                        <Typography variant="body1" style={{ textAlign: "left" }}>
                                            {comment.content}
                                        </Typography>
                                        <Typography variant="body2" style={{ textAlign: "left", color: "gray" }}>
                                            created at {(comment.created_at)}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Paper>
                        ))}
                    </div>
                )}
            </div>
        </Container>
    );
}
