import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SearchBar from 'material-ui-search-bar';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: '#ffffff', // Thay đổi màu nền của AppBar
    },
    link: {
        margin: theme.spacing(1, 1.5),
        color: '#ffffff', // Thay đổi màu chữ cho các Link và Button
        fontFamily: 'cursive', // Thay đổi font chữ sang cursive
    },
    toolbarTitle: {
        // flexGrow: 1,
        display: 'flex',
        alignItems: 'center', // Hiển thị logo ở giữa theo chiều ngang
    },
    logo: {
        marginRight: theme.spacing(1), // Khoảng cách giữa logo và tiêu đề
        color: '#3f51b5', // Màu sắc cho tiêu đề "Blog"
        fontSize: '1.75rem', // Kích thước cho tiêu đề "Blog"
        fontWeight: 600, // Độ đậm cho tiêu đề "Blog"
        textDecoration: 'none', // Loại bỏ gạch chân cho tiêu đề "Blog"
        fontFamily: 'cursive', // Thay đổi font chữ sang cursive
    },
    registerButton: {
        marginRight: theme.spacing(1),
        backgroundColor: '#0F4C75', // Màu nền cho nút "Register"
        color: '#ffffff', // Màu chữ cho nút "Register"
        fontFamily: 'cursive', // Font chữ cursive cho nút "Login"

    },
    loginButton: {
        marginRight: theme.spacing(1),
        backgroundColor: '#3282B8', // Màu nền cho nút "Login"
        color: '#ffffff', // Màu chữ cho nút "Login"
        fontFamily: 'cursive', // Font chữ cursive cho nút "Login"
    },
    logoutButton: {
        backgroundColor: '#BBE1FA', // Màu nền cho nút "Logout"
        color: '#ffffff', // Màu chữ cho nút "Logout"
        fontFamily: 'cursive', // Font chữ cursive cho nút "Logout"
    },
    searchInput: {
        backgroundColor: '#f5f5f5', // Màu nền cho ô tìm kiếm
    },
    avatar: {
        backgroundColor: '#3f51b5', // Màu nền cho avatar
        fontSize: '1.2rem', // Kích thước cho avatar
    },
}));

const MEDIA_URL = "http://127.0.0.1:8000";

function Header() {
    const classes = useStyles();
    const [data, setData] = useState({ search: '' });
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('access_token')));
    const history = useHistory();

    useEffect(() => {
        // Lắng nghe sự kiện storage, khi có thay đổi trong localStorage, ta cập nhật lại trạng thái isLoggedIn
        const handleStorageChange = () => {
            setIsLoggedIn(Boolean(localStorage.getItem('access_token')));
        };
        window.addEventListener('storage', handleStorageChange);

        // Hủy lắng nghe sự kiện storage khi component unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const goSearch = (e) => {
        history.push({
            pathname: '/search/',
            search: '?search=' + data.search,
        });
        window.location.reload();
    };



    return (
        <React.Fragment>
            <CssBaseline />
            <AppBar
                position="static"
                color="default"
                elevation={0}
                className={classes.appBar}
            >

                <Toolbar className={classes.toolbar} style={{ justifyContent: 'space-between' }}>
                    <div className={classes.toolbarTitle}>
                        {/* Thêm logo */}
                        <Avatar variant="rounded" className={classes.avatar} style={{ backgroundColor: '#9AC5F4', marginRight: '10px' }}>
                            <Icon className="fas fa-blog" />
                        </Avatar>
                        <Typography
                            variant="h6"
                            color="textPrimary"
                            noWrap
                            className={classes.logo}
                            component={NavLink}
                            to="/"
                        >
                            Blog
                        </Typography>
                    </div>
                    <div className={classes.toolbarTitle}>
                        {/* Thêm logo */}
                        <Avatar variant="rounded" className={classes.avatar} style={{ backgroundColor: '#99DBF5', marginRight: '10px' }}>
                            <Icon className="fas fa-blog" />
                        </Avatar>
                        <Typography
                            variant="h6"
                            color="textPrimary"
                            noWrap
                            className={classes.logo}
                            component={NavLink}
                            to="/?category=buoc-qua-mau-xanh-hi-vong&page=1"
                        >
                            Lê Quý Đôn
                        </Typography>
                    </div>
                    <div className={classes.toolbarTitle}>
                        {/* Thêm logo */}
                        <Avatar variant="rounded" className={classes.avatar} style={{ backgroundColor: '#A7ECEE', marginRight: '10px' }}>
                            <Icon className="fas fa-blog" />
                        </Avatar>
                        <Typography
                            variant="h6"
                            color="textPrimary"
                            noWrap
                            className={classes.logo}
                            component={NavLink}
                            to="/?category=nang-bach-khoa&page=1"
                        >
                            Bách khoa
                        </Typography>
                    </div>
                    {/* Ô tìm kiếm */}
                    <SearchBar
                        value={data.search}
                        onChange={(newValue) => setData({ search: newValue })}
                        onRequestSearch={() => goSearch(data.search)}
                        inputClassName={classes.searchInput}
                    />
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {/* Avatar của người dùng */}
                        <NavLink to={`/profile/${localStorage.getItem('user_name')}`}>
                            <Avatar alt={localStorage.getItem('user_name')} src={`${MEDIA_URL}${localStorage.getItem('avatar')}`} />
                        </NavLink>

                        <div style={{ marginLeft: '10px' }}>
                            {/* Thêm thông tin tên người dùng nếu muốn */}
                            <Typography variant="subtitle1" style={{ fontFamily: 'cursive' }}>
                                {localStorage.getItem('user_name')}
                            </Typography>
                        </div>
                    </div>
                    <div>
                        {/* Nút "Register" */}
                        <Button
                            color="textPrimary"
                            variant="contained"
                            className={classes.registerButton}
                            component={NavLink}
                            to="/register"
                            style={{ marginRight: '5px' }}
                        >
                            Register
                        </Button>

                        {/* Nút "Login" */}
                        <Button
                            href="#"
                            variant="contained"
                            color="textPrimary"
                            className={classes.loginButton}
                            component={NavLink}
                            to="/login"
                            style={{ fontFamily: 'cursive', marginRight: '5px' }}
                        >
                            Login
                        </Button>

                        {/* Nút "Logout" */}
                        <Button
                            href="#"
                            variant="contained"
                            color="textPrimary"
                            className={classes.logoutButton}
                            component={NavLink}
                            to="/logout"
                            style={{ fontFamily: 'cursive' }}
                        >
                            Logout
                        </Button>
                        {/* Avatar của người dùng */}
                        {/* {userAvatar && (
                            <Avatar alt="User Avatar" src={userAvatar} className={classes.avatar} />
                        )} */}
                    </div>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}


export default Header;
