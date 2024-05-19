import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SearchBar from 'material-ui-search-bar';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import {
    DropdownMenu,
    DropdownItem,
    DropdownToggle,
    UncontrolledDropdown,
} from "reactstrap";
import NotificationsIcon from '@material-ui/icons/Notifications';
import axiosInstance from '../axios';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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

    searchInput: {
        backgroundColor: '#f5f5f5', // Màu nền cho ô tìm kiếm
    },
    avatar: {
        backgroundColor: '#3f51b5', // Màu nền cho avatar
        fontSize: '1.2rem', // Kích thước cho avatar
    },
    authButtons: {
        display: 'flex',
        alignItems: 'center',
        marginLeft: 'auto',
    },
    authButton: {
        fontFamily: 'cursive',
        fontWeight: 600,
        marginLeft: theme.spacing(2),
        textTransform: 'none',
    },
    registerButton: {
        backgroundColor: '#3f51b5',
        color: '#ffffff',
        '&:hover': {
            backgroundColor: '#0B3D5E',
        },
    },
    loginButton: {
        backgroundColor: '#3f51b5',
        color: '#ffffff',
        fontFamily: 'cursive',
        '&:hover': {
            backgroundColor: '#26698D',
        },
    },
    logoutButton: {
        backgroundColor: '#3f51b5',
        color: '#ffffff',
        fontFamily: 'cursive',
        '&:hover': {
            backgroundColor: '#8CC3F7',
        },
    },
}));

const MEDIA_URL = process.env.REACT_APP_MEDIA_URL;

function Header() {
    const classes = useStyles();
    const [data, setData] = useState({ search: '' });
    const [isLoggedIn, setIsLoggedIn] = useState(Boolean(localStorage.getItem('access_token')));
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const [notifications, setNotifications] = useState([]);

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


    const handleNotificationClick = (event) => {
        setAnchorEl(event.currentTarget);
        axiosInstance.get('notifications/unread/')
            .then(response => {
                console.log(response.data);
                setNotifications(response.data); // Lưu danh sách thông báo vào state
            })
            .catch(error => {
                console.error('Error fetching unread notifications:', error);
            });

        axiosInstance.patch('notifications/mark-all-as-read/')
            .then(response => {
            })
            .catch(error => {
                console.error('Error fetching unread notifications:', error);
            });
    };

    const handleClose = () => {
        setAnchorEl(null);
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
                        {/* <Avatar variant="rounded" className={classes.avatar} style={{ backgroundColor: '#9AC5F4', marginRight: '10px' }}>
                            <Icon className="fas fa-blog" />
                        </Avatar> */}
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
                        {/* <Avatar variant="rounded" className={classes.avatar} style={{ backgroundColor: '#99DBF5', marginRight: '10px' }}>
                            <Icon className="fas fa-blog" />
                        </Avatar> */}
                        <UncontrolledDropdown nav>
                            <DropdownToggle nav>
                                <Typography
                                    variant="h6"
                                    color="textPrimary"
                                    noWrap
                                    className={classes.logo}
                                >
                                    Category
                                </Typography>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem to="/?category=buoc-qua-mau-xanh-hi-vong&page=1" tag={Link}>
                                    Bước qua màu xanh hi vọng
                                </DropdownItem>
                                <DropdownItem to="/?category=nang-bach-khoa&page=1" tag={Link}>
                                    Nắng Bách khoa
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>



                    <div className={classes.toolbarTitle}>
                        {/* <Avatar variant="rounded" className={classes.avatar} style={{ backgroundColor: '#99DBF5', marginRight: '10px' }}>
                            <Icon className="fas fa-blog" />
                        </Avatar> */}
                        <UncontrolledDropdown nav>
                            <DropdownToggle nav>
                                <Typography
                                    variant="h6"
                                    color="textPrimary"
                                    noWrap
                                    className={classes.logo}
                                >
                                    Ranking
                                </Typography>
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem tag="a" href="/ranking/user">
                                    Writer Ranking
                                </DropdownItem>
                                <DropdownItem tag="a" href="/ranking/post">
                                    Post Ranking
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </div>


                    <div className={classes.toolbarTitle}>
                        {/* Thêm logo */}
                        {/* <Avatar variant="rounded" className={classes.avatar} style={{ backgroundColor: '#A7ECEE', marginRight: '10px' }}>
                            <Icon className="fas fa-blog" />
                        </Avatar> */}
                        <Typography
                            variant="h6"
                            color="textPrimary"
                            noWrap
                            className={classes.logo}
                            component={NavLink}
                            to="/hall"
                        >
                            Chat
                        </Typography>
                    </div>
                    {/* Ô tìm kiếm */}
                    <SearchBar
                        value={data.search}
                        onChange={(newValue) => setData({ search: newValue })}
                        onRequestSearch={() => goSearch(data.search)}
                        inputClassName={classes.searchInput}
                    />

                    {/* Biểu tượng thông báo */}
                    <IconButton color="inherit" onClick={handleNotificationClick}>
                        <NotificationsIcon />
                    </IconButton>

                    {/* Menu thông báo */}
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        {notifications.length === 0 ? (
                            <MenuItem onClick={handleClose}>No notifications</MenuItem>
                        ) : (
                            notifications.map((notification, index) => (
                                <MenuItem key={index} onClick={handleClose}>
                                    {notification.sender_username} has {notification.action} on your {notification.post_title}
                                </MenuItem>
                            ))
                        )}
                    </Menu>



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
