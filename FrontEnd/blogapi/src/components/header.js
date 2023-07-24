// Thêm import cho Icon, Avatar, và makeStyles
import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import SearchBar from 'material-ui-search-bar';
import { useHistory } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    appBar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        backgroundColor: '#ffffff', // Thay đổi màu nền của AppBar
    },
    link: {
        margin: theme.spacing(1, 1.5),
        color: '#ffffff', // Thay đổi màu chữ cho các Link và Button
    },
    toolbarTitle: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center', // Hiển thị logo ở giữa theo chiều ngang
    },
    logo: {
        marginRight: theme.spacing(1), // Khoảng cách giữa logo và tiêu đề
        color: '#3f51b5', // Màu sắc cho tiêu đề "Blog"
        fontSize: '1.75rem', // Kích thước cho tiêu đề "Blog"
        fontWeight: 600, // Độ đậm cho tiêu đề "Blog"
        textDecoration: 'none', // Loại bỏ gạch chân cho tiêu đề "Blog"
    },
    registerButton: {
        marginRight: theme.spacing(1), // Khoảng cách giữa các nút
        backgroundColor: '#f44336', // Màu nền cho nút "Register"
        color: '#ffffff', // Màu chữ cho nút "Register"
    },
    loginButton: {
        marginRight: theme.spacing(1), // Khoảng cách giữa các nút
        backgroundColor: '#3f51b5', // Màu nền cho nút "Login"
        color: '#ffffff', // Màu chữ cho nút "Login"
    },
    logoutButton: {
        backgroundColor: '#3f51b5', // Màu nền cho nút "Logout"
        color: '#ffffff', // Màu chữ cho nút "Logout"
    },
    searchInput: {
        backgroundColor: '#f5f5f5', // Màu nền cho ô tìm kiếm
    },
    avatar: {
        backgroundColor: '#3f51b5', // Màu nền cho avatar
        fontSize: '1.2rem', // Kích thước cho avatar
    },
}));

function Header() {
    const classes = useStyles();
    let history = useHistory();
    const [data, setData] = useState({ search: '' });

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
                <Toolbar className={classes.toolbar}>
                    <div className={classes.toolbarTitle}>
                        {/* Thêm logo */}
                        <Avatar variant="rounded" className={classes.avatar} style={{ backgroundColor: '#9AC5F4' }}>
                            <Icon className="fas fa-blog" />
                        </Avatar>
                        <Typography
                            variant="h6"
                            color="textPrimary" // Sử dụng màu chữ mặc định của Material-UI
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
                        <Avatar variant="rounded" className={classes.avatar} style={{ backgroundColor: '#99DBF5' }}>
                            <Icon className="fas fa-blog" />
                        </Avatar>
                        <Typography
                            variant="h6"
                            color="textPrimary" // Sử dụng màu chữ mặc định của Material-UI
                            noWrap
                            className={classes.logo}
                            component={NavLink}
                            to="/category/lequydon"
                        >
                            Lê Quý Đôn
                        </Typography>
                    </div>
                    <div className={classes.toolbarTitle}>
                        {/* Thêm logo */}
                        <Avatar variant="rounded" className={classes.avatar} style={{ backgroundColor: '#A7ECEE' }}>
                            <Icon className="fas fa-blog" />
                        </Avatar>
                        <Typography
                            variant="h6"
                            color="textPrimary" // Sử dụng màu chữ mặc định của Material-UI
                            noWrap
                            className={classes.logo}
                            component={NavLink}
                            to="/category/bachkhoa"
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

                    <nav>
                        {/* Nút "Register" */}
                        <Link
                            color="textPrimary"
                            href="#"
                            className={classes.link}
                            component={NavLink}
                            to="/register"
                        >
                            Register
                        </Link>
                    </nav>

                    {/* Nút "Login" */}
                    <Button
                        href="#"
                        variant="contained"
                        className={classes.loginButton}
                        component={NavLink}
                        to="/login"
                    >
                        Login
                    </Button>

                    {/* Nút "Logout" */}
                    <Button
                        href="#"
                        variant="contained"
                        className={classes.logoutButton}
                        component={NavLink}
                        to="/logout"
                    >
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
}

export default Header;