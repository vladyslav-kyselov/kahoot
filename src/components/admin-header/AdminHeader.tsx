import * as React from 'react';
import {useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Link, useNavigate} from "react-router-dom";

import './index.scss';


const drawerWidth = 240;
const navItems = [{
    title: 'Game',
    link: '/game',
    disabled: false
}, {
    title: 'Quizzes',
    link: '/quizzes',
    disabled: false
}, {
    title: 'Rating',
    link: '/rating',
    disabled: false
}];

export default function DrawerAppBar({children}: { children: React.ReactNode }) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const isAuth = sessionStorage.getItem('isAuth');
        if (!isAuth) {
            navigate('/');
        }


    }, [])

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = () => {
        return (
            <Box onClick={handleDrawerToggle} sx={{textAlign: 'center'}}>
                <Typography variant="h6" sx={{my: 2}} className="header__title">
                    TALNE CHURCH KAHOOT
                </Typography>
                <Divider/>
                <List>
                    {navItems.map((item) => (
                        <ListItem key={item.title} disablePadding>
                            <ListItemButton sx={{textAlign: 'center'}} disabled={item.disabled}>
                                <Link to={item.link} className={`header__link ${item.disabled? 'header__disabled': ''}`}>
                                    <ListItemText primary={item.title}/>
                                </Link>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        );
    }

    return (
        <Box>
            <CssBaseline/>
            <AppBar component="nav">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{mr: 2, display: {sm: 'none'}}}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                        className="header__title"
                    >
                        TALNE CHURCH KAHOOT
                    </Typography>
                    <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                        {navItems.map((item) => (
                            <Button key={item.title} sx={{color: '#fff'}} disabled={item.disabled}>
                                <Link to={item.link} className={`header__link ${item.disabled? 'header__disabled': ''}`}>
                                    {item.title}
                                </Link>
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <nav>
                <Drawer
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer()}
                </Drawer>
            </nav>
            <Box component="main">
                <Toolbar/>
                {children}
            </Box>
        </Box>
    );
}
