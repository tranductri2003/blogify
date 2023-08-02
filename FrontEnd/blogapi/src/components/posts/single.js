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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Row, Col } from "reactstrap";



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
        fontWeight: 'bold',
        fontFamily: 'cursive', // Cursive font for the title
        color: theme.palette.primary.dark, // Dark primary color for the title
    },
    postExcerpt: {
        marginBottom: theme.spacing(2),
        fontStyle: 'italic',
        fontFamily: 'cursive', // Cursive font for the excerpt
        color: theme.palette.secondary.dark, // Dark secondary color for the excerpt
    },
    postContent: {
        textAlign: 'justify',
        whiteSpace: 'pre-wrap',
        marginBottom: theme.spacing(2),
        fontFamily: 'cursive',
        color: theme.palette.text.primary, // Primary text color for the content
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
    postEdited: {
        textAlign: 'right', // Align the content to the right
        fontFamily: 'cursive',
        // ... (other styles for postContent)
    },
    profileStatsContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginBottom: theme.spacing(2),
    },
    profileStatItem: {
        textAlign: 'center',
        marginRight: theme.spacing(4),
    },
    profileStatHeading: {
        fontWeight: 'bold',
        fontFamily: 'cursive',
        color: theme.palette.primary.dark,
        fontSize: '1.5rem',
    },
    profileStatDescription: {
        fontFamily: 'cursive',
        color: theme.palette.secondary.dark,
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
                console.log(response);
            });
    }, [slug]);


    const handleCommentChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            newComment: e.target.value,
        }));
    };

    const handleAddComment = () => {
        // Yêu cầu API để thêm comment vào bài viết
        const apiUrl = `post/comment/create/${slug}`;

        const commentData = {
            content: data.newComment,
            // Thông tin người dùng đăng nhập đã lưu trong localStorage
        };

        axiosInstance.post(apiUrl, commentData)
            .then((response) => {
                // Khi thành công, cập nhật state để hiển thị comment mới
                setData((prevData) => ({
                    ...prevData,
                    post: {
                        ...prevData.post,
                        comments: [
                            {
                                id: response.data.id,
                                author: response.data.author,
                                content: response.data.content,
                                created_at: response.data.created_at,
                            },
                            ...prevData.post.comments,
                        ],
                    },
                    newComment: "",
                }));
            })
            .catch((error) => {
                console.error('Error adding comment:', error);
            });
    };

    const handleLikePost = () => {
        // Gửi yêu cầu API để thích bài viết
        const apiUrl = `post/like/create/${slug}`;

        axiosInstance.post(apiUrl)
            .then((response) => {
                // Khi thành công, cập nhật số lượng thích trong state
                setData((prevData) => ({
                    ...prevData,
                    post: {
                        ...prevData.post,
                        num_like: response.data.num_like,
                    },
                }));
            })
            .catch((error) => {
                console.error('Error liking post:', error);
            });
    };

    return (
        <Container component="main" maxWidth="xl">
            <CssBaseline />
            <Grid container spacing={4}>
                {/* Bên trái (2/3) */}
                <Grid item xs={12} sm={8}>
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
                        <Typography
                            variant="body1"
                            align="justify"
                            color="textSecondary"
                            paragraph
                            className={classes.postEdited}
                        >
                            Edited at {data.post.edited}
                        </Typography>
                        <div className={classes.viewLikeComment}>
                            <IconButton color="default" aria-label="view">
                                <VisibilityIcon className={classes.viewLikeCommentIcon} />
                            </IconButton>
                            <Typography variant="body1">
                                {data.post.num_view} Views
                            </Typography>
                            <IconButton color="primary" aria-label="like" onClick={handleLikePost}>
                                <FavoriteIcon className={classes.viewLikeCommentIcon} />
                            </IconButton>
                            <Typography variant="body1">
                                {data.post.num_like} Likes
                            </Typography>
                            <IconButton color="secondary" aria-label="comment">
                                <CommentIcon className={classes.viewLikeCommentIcon} />
                            </IconButton>
                            <Typography variant="body1">
                                {data.post.comments ? data.post.comments.length : 0} Comments
                            </Typography>
                        </div>
                    </div>
                </Grid>

                {/* Phía bên phải (1/3) */}
                <Grid item xs={12} sm={4}>
                    <div className="card-profile-image">
                        {data.post.author && (
                            <Grid container alignItems="center" spacing={2}>
                                {/* Hiển thị Avatar */}
                                <Grid item>
                                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                        <img
                                            alt="..."
                                            className="profile-avatar rounded-circle"
                                            src={MEDIA_URL + data.post.author.avatar}
                                        />
                                    </a>
                                </Grid>
                                {/* Hiển thị About */}
                                <Grid item>
                                    <div>
                                        <Typography variant="h6" className={classes.postContent}>
                                            {data.post.author.user_name}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant="h6" className={classes.postExcerpt}>
                                            {data.post.author.about}
                                        </Typography>
                                    </div>
                                </Grid>
                            </Grid>
                        )}
                        {data.post.author && (
                            <div className={classes.profileStatsContainer}>
                                <div className={classes.profileStatItem}>
                                    <Typography variant="h4" className={classes.profileStatHeading}>
                                        {data.post.author.num_post}
                                    </Typography>
                                    <Typography variant="body1" className={classes.profileStatDescription}>
                                        Posts
                                    </Typography>
                                </div>
                                <div className={classes.profileStatItem}>
                                    <Typography variant="h4" className={classes.profileStatHeading}>
                                        {data.post.author.num_view}
                                    </Typography>
                                    <Typography variant="body1" className={classes.profileStatDescription}>
                                        Views
                                    </Typography>
                                </div>
                                <div className={classes.profileStatItem}>
                                    <Typography variant="h4" className={classes.profileStatHeading}>
                                        {data.post.author.num_like}
                                    </Typography>
                                    <Typography variant="body1" className={classes.profileStatDescription}>
                                        Likes
                                    </Typography>
                                </div>
                                <div className={classes.profileStatItem}>
                                    <Typography variant="h4" className={classes.profileStatHeading}>
                                        {data.post.author.num_comment}
                                    </Typography>
                                    <Typography variant="body1" className={classes.profileStatDescription}>
                                        Comments
                                    </Typography>
                                </div>

                            </div>
                        )}
                    </div>
                    <div className={classes.commentSection}>
                        <Typography variant="h5" gutterBottom>
                            Comments
                        </Typography>
                        {/* Form nhập comment */}
                        <Grid container spacing={2} alignItems="center" className={classes.commentForm}>
                            <Grid item xs={12} sm={12}>
                                {data.post.author && (
                                    <>
                                        <Avatar
                                            alt={localStorage.getItem('user_name')}
                                            src={MEDIA_URL + localStorage.getItem('avatar')}
                                            className={classes.commentAvatar}
                                        />
                                        <Typography variant="body1">
                                            {localStorage.getItem('user_name')}
                                        </Typography>
                                    </>
                                )}
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    value={data.newComment}
                                    onChange={handleCommentChange}
                                    placeholder="Write a comment..."
                                    className={classes.commentInput}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    onClick={handleAddComment}
                                    className={classes.commentButton}
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
                                        {comment.author && (
                                            <>
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
                                            </>
                                        )}
                                    </Grid>
                                </Paper>
                            ))}
                    </div>
                </Grid>
            </Grid>
        </Container>
    );
}