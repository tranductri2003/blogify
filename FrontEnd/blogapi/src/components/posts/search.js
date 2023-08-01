import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import { NavLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import { format } from 'date-fns';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import CommentIcon from '@material-ui/icons/Comment';

const useStyles = makeStyles((theme) => ({
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    link: {
        margin: theme.spacing(1, 1.5),
        fontFamily: 'cursive', // Thay đổi font chữ sang cursive
    },
    cardHeader: {
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
    },
    postTitle: {
        fontSize: '16px',
        textAlign: 'left',
        fontFamily: 'cursive', // Thay đổi font chữ sang cursive
    },
    postText: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'baseline',
        fontSize: '12px',
        textAlign: 'left',
        marginBottom: theme.spacing(2),
        fontFamily: 'cursive', // Thay đổi font chữ sang cursive
    },
    card: {
        borderRadius: theme.spacing(2), // Góc bo tròn cho CardView
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', // Hiệu ứng shadow làm mềm mại CardView
        overflow: 'hidden', // Đảm bảo nội dung không tràn ra ngoài CardView
        transition: 'transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease', // Hiệu ứng smooth
        '&:hover': {
            transform: 'scale(1.05)', // Hiệu ứng zoom in khi hover
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)', // Hiệu ứng shadow mạnh hơn khi hover
            backgroundColor: theme.palette.grey[200], // Màu nền thay đổi khi hover
        },
    },

    editedText: {
        fontSize: '12px',
        color: theme.palette.text.secondary,
        textAlign: 'right', // Canh lề phải
    },
    statsContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        opacity: 0.7, // Điều chỉnh mức độ mờ, giá trị từ 0 đến 1
    },
    statsItem: {
        display: 'flex',
        alignItems: 'center',
        marginRight: theme.spacing(2),
        transition: 'opacity 0.3s ease', // Hiệu ứng mờ khi hover
        opacity: 0.7, // Mức độ mờ ban đầu
        '&:hover': {
            opacity: 1, // Hiển thị thông tin rõ hơn khi hover
        },
        color: theme.palette.primary.main, // Đổi màu chữ cho các thông tin này
        fontSize: '14px', // Đổi kích thước chữ cho các thông tin này
    },
}));
const MEDIA_URL = "http://127.0.0.1:8000";
const Search = () => {
    const classes = useStyles();
    const search = 'search';
    const [appState, setAppState] = useState({
        search: '',
        posts: [],
    });

    useEffect(() => {
        axiosInstance.get(search + '/' + window.location.search).then((res) => {
            const allPosts = res.data;
            setAppState({ posts: allPosts });
            console.log(res.data);
        });
    }, [setAppState]);

    return (
        <React.Fragment>
            <Container maxWidth="lg" component="main">
                <Grid container spacing={5} alignItems="flex-end">
                    {appState.posts.map((post) => {
                        return (
                            <Grid item key={post.id} xs={12} md={4}>
                                <Card className={classes.card}>
                                    {/* Sử dụng thẻ Link để điều hướng */}
                                    <Link to={`/post/${post.slug}`} className={classes.link}>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image={post.image}
                                            title="Image title"
                                        />
                                    </Link>
                                    <CardContent className={classes.cardContent}>

                                        <Typography gutterBottom variant="h6" component="h2" className={classes.postTitle}>
                                            {post.title.substr(0, 50)}...
                                        </Typography>
                                        <div className={classes.postText}>
                                            <Typography color="textSecondary">
                                                {post.excerpt.substr(0, 40)}...
                                            </Typography>
                                        </div>
                                        {/* Hiển thị dòng chữ "edited at" và thời điểm đã chỉnh sửa */}
                                        <div className={classes.postText}>
                                            <Typography className={classes.editedText}>
                                                edited at{' '}
                                                {format(new Date(post.edited), 'dd-MM-yyyy HH:mm (xxx)')}
                                                ...
                                            </Typography>
                                        </div>
                                        {/* Hiển thị số lượng views, likes và comments */}
                                        <div className={classes.statsContainer}>
                                            <div className={classes.statsItem}>
                                                <VisibilityIcon />
                                                <Typography color="textSecondary">
                                                    {post.num_view}
                                                </Typography>
                                            </div>
                                            <div className={classes.statsItem}>
                                                <ThumbUpIcon />
                                                <Typography color="textSecondary">
                                                    {post.num_like}
                                                </Typography>
                                            </div>
                                            <div className={classes.statsItem}>
                                                <CommentIcon />
                                                <Typography color="textSecondary">
                                                    {post.num_comment}
                                                </Typography>
                                            </div>
                                        </div>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            {/* Avatar của tác giả */}
                                            <NavLink to={`/profile/${post.author.user_name}`}>
                                                <Avatar alt={post.author.user_name} src={`${MEDIA_URL}${post.author.avatar}`} />
                                            </NavLink>

                                            <div style={{ marginLeft: '10px' }}>
                                                <Typography variant="subtitle1" style={{ fontFamily: 'cursive' }}>
                                                    {post.author.user_name}
                                                </Typography>
                                            </div>
                                        </div>

                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            </Container>
        </React.Fragment>
    );
};
export default Search;