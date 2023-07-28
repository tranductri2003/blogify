import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// import Paper from '@material-ui/core/Paper';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { Link } from 'react-router-dom'; // Chỉ import thẻ Link duy nhất từ react-router-dom

import Avatar from '@material-ui/core/Avatar';
import { format } from 'date-fns';
import { useParams } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    link: {
        margin: theme.spacing(1, 1.5),
    },
    cardHeader: {
        backgroundColor:
            theme.palette.type === 'light'
                ? theme.palette.grey[200]
                : theme.palette.grey[700],
    },
    postTitle: {
        fontSize: '16px',
        textAlign: 'left',
    },
    postText: {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'baseline',
        fontSize: '12px',
        textAlign: 'left',
        marginBottom: theme.spacing(2),
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
    newPostButton: {
        position: 'fixed',
        top: theme.spacing(20), // Cách header 20 spacing (có thể điều chỉnh tùy ý)
        right: theme.spacing(20), // Cách lề phải 2 spacing (có thể điều chỉnh tùy ý)
        borderRadius: '50%',
        zIndex: 999,
        width: '80px',
        height: '80px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main, // Màu nền chính là màu primary của theme
        color: theme.palette.common.white, // Màu chữ là trắng
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.2)',
        },
    },
}));
const MEDIA_URL = "http://127.0.0.1:8000";

const Posts = (props) => {
    const { userName } = useParams();
    const { posts } = props;
    const classes = useStyles();

    if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;

    const user_name = localStorage.getItem('user_name');
    const isAuthorPost = (post) => {
        return post.author.user_name === user_name;
    };
    const isAuthorProfile = () => {
        return userName === user_name;
    };
    if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;

    return (
        <React.Fragment>
            <Container maxWidth="lg" component="main">
                {isAuthorProfile() && (
                    <>
                        {/* Thêm nút "New Post" ở đây */}
                        <Button
                            className={classes.newPostButton}
                            href={`/profile/${localStorage.getItem('user_name')}/post/create`}
                            variant="contained"
                            color="primary"
                        >
                            +
                        </Button>
                    </>
                )}
                <Grid container spacing={5} alignItems="flex-end">
                    {posts.map((post) => {
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
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            {/* Avatar của tác giả */}
                                            <Link to={`/profile/${post.author.user_name}`}>
                                                <Avatar alt={post.author.user_name} src={`${MEDIA_URL}${post.author.avatar}`} />
                                            </Link>

                                            <div style={{ marginLeft: '10px' }}>
                                                <Typography variant="subtitle1" style={{ fontFamily: 'cursive' }}>
                                                    {post.author.user_name}
                                                </Typography>
                                            </div>
                                            {isAuthorPost(post) && (
                                                <>
                                                    <Link
                                                        color="textPrimary"
                                                        to={`/profile/${user_name}/post/edit/${post.id}`}
                                                        className={classes.link}
                                                    >
                                                        <EditIcon />
                                                    </Link>
                                                    <Link
                                                        color="textPrimary"
                                                        to={`/profile/${user_name}/post/delete/${post.id}`}
                                                        className={classes.link}
                                                    >
                                                        <DeleteForeverIcon />
                                                    </Link>
                                                </>
                                            )}
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

export default Posts;
