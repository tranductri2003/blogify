import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useParams } from 'react-router-dom';
// MaterialUI
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CommentIcon from '@material-ui/icons/Comment';
import VisibilityIcon from '@material-ui/icons/Visibility';
import TextField from '@material-ui/core/TextField'; // Import TextField from @material-ui/core
import Button from '@material-ui/core/Button'; // Import Button from @material-ui/core


const useStyles = makeStyles((theme) => ({
    heroContent: {
        padding: theme.spacing(8, 0, 6),
    },
    postImage: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    postTitle: {
        marginBottom: theme.spacing(2),
    },
    postExcerpt: {
        marginBottom: theme.spacing(2),
    },
    postContent: {
        textAlign: 'justify',
        whiteSpace: 'pre-wrap',
        marginBottom: theme.spacing(2),
        fontFamily: 'cursive',
    },
    authorInfo: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
    },
    authorAvatar: {
        marginRight: theme.spacing(2),
    },
    viewLikeComment: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: theme.spacing(2),
    },
    viewLikeCommentIcon: {
        marginRight: theme.spacing(1),
    },
    comment: {
        padding: theme.spacing(2),
        backgroundColor: '#f5f5f5',
        borderRadius: theme.spacing(1),
        marginBottom: theme.spacing(2),
        fontFamily: 'cursive',
    },
    commentSection: {
        marginTop: theme.spacing(4),
        padding: theme.spacing(2),
        backgroundColor: '#f0f0f0',
        borderRadius: theme.spacing(1),
    },
    commentForm: {
        marginTop: theme.spacing(2),
    },
    commentInput: {
        width: '100%',
    },
    commentButton: {
        marginLeft: theme.spacing(2),
    },
    commentAvatar: {
        marginRight: theme.spacing(2),
    },
    commentContent: {
        textAlign: 'left',
    },
    commentCreatedAt: {
        marginTop: theme.spacing(1),
        color: theme.palette.text.secondary,
    },
}));

const MEDIA_URL = "http://127.0.0.1:8000";
export default function Post() {
    const { slug } = useParams();
    const classes = useStyles();

    const [data, setData] = useState({
        post: [],
        newComment: "",
    });

    useEffect(() => {
        axiosInstance.get('post/' + slug + '/')
            .then((response) => {
                setData({
                    post: response.data,
                    newComment: "",
                });
            });
    }, [slug]);

    const handleCommentChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            newComment: e.target.value,
        }));
    };

    const handleAddComment = () => {
        // TODO: Gửi yêu cầu API để thêm comment vào bài viết
        // Sau khi thêm thành công, cập nhật state để hiển thị comment mới
        setData((prevData) => ({
            ...prevData,
            post: {
                ...prevData.post,
                comments: [
                    {
                        id: Date.now(),
                        author: { user_name: "User", avatar: "" }, // Thay bằng thông tin người dùng thực tế
                        content: prevData.newComment,
                        created_at: new Date().toISOString(),
                    },
                    ...prevData.post.comments,
                ],
            },
            newComment: "",
        }));
    };

    return (
        <Container component="main" maxWidth="xl">
            <CssBaseline />
            <div className={classes.heroContent}>
                <img
                    src={data.post.image}
                    alt={data.post.title}
                    className={classes.postImage}
                />
                <Typography
                    variant="h2"
                    align="center"
                    color="textPrimary"
                    gutterBottom
                    className={classes.postTitle}
                >
                    {data.post.title}
                </Typography>
                <Typography
                    variant="h5"
                    align="center"
                    color="textSecondary"
                    paragraph
                    className={classes.postExcerpt}
                >
                    {data.post.excerpt}
                </Typography>
                <Typography
                    variant="body1"
                    align="justify"
                    color="textSecondary"
                    paragraph
                    className={classes.postContent}
                >
                    {data.post.content}
                </Typography>

                <Grid container spacing={2} alignItems="center" justify="space-between">
                    {/* ... (your existing code) */}
                </Grid>
            </div>

            {/* Khu vực comment */}
            <div className={classes.commentSection}>
                <Typography variant="h5" gutterBottom>
                    Comments
                </Typography>
                {/* Form nhập comment */}
                <Grid container spacing={2} alignItems="center" className={classes.commentForm}>
                    <Grid item xs={12} sm={2}>
                        {data.post.author && (
                            <>
                                <Avatar
                                    alt={data.post.author.user_name}
                                    src={MEDIA_URL + data.post.author.avatar}
                                    className={classes.authorAvatar}
                                />
                                <Typography variant="body1">
                                    {data.post.author.user_name}
                                </Typography>
                            </>
                        )}
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <TextField
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={3}
                            value={data.newComment}
                            onChange={handleCommentChange}
                            placeholder="Write a comment..."
                            className={classes.commentInput} // Apply the custom class for comment input
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleAddComment}
                            className={classes.commentButton} // Apply the custom class for comment button
                        >
                            Add Comment
                        </Button>
                    </Grid>
                </Grid>

                {/* Các ô comment */}
                {data.post.comments &&
                    data.post.comments.map((comment) => (
                        <Paper className={classes.comment} key={comment.id}>
                            <Grid container wrap="nowrap" spacing={2} alignItems="center">
                                <Grid item>
                                    <Avatar
                                        alt={comment.author.user_name}
                                        src={MEDIA_URL + comment.author.avatar}
                                        className={classes.commentAvatar}
                                    />
                                </Grid>
                                <Grid item xs zeroMinWidth>
                                    <Typography variant="h6" className={classes.commentContent}>
                                        {comment.author.user_name}
                                    </Typography>
                                    <Typography variant="body1" className={classes.commentContent}>
                                        {comment.content}
                                    </Typography>
                                    <Typography variant="body2" className={classes.commentCreatedAt}>
                                        Created at {comment.created_at}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}
            </div>
        </Container>
    );
}