
import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Home from './Home'
import Error from './Error'
import Login from './Login'
import CustomerConsult from './CustomerConsult'
import CustomerMaintenance from './CustomerMaintenance'
import SingUp from './SingUp'
import { useNavigate, useLocation } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { useContext } from 'react';
import { makeStyles } from '@mui/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import GroupIcon from '@mui/icons-material/Group';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);
const useStyles = makeStyles(theme => ({
    marginLeft: {
        marginLeft: '10px !important'
    },
    marginBottom: {
        marginBottom: '14px !important'
    },
    logOutName: {
        '@media all and (max-width:600px)': {
            display: 'none !important'
        }

    },
    over: {
        '@media all and (max-width:600px)': {
            backgroundColor: 'rgba(0,0,0,0.6)',
            filter: 'blur(3px)'
        }


    }
}))
export default function NavBar({ componente }) {
    const classes = useStyles()
    const navigate = useNavigate()
    const { auth, handleAuth } = useContext(AuthContext)
    const { pathname } = useLocation()
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const exit = ()=>{
        
        handleAuth()
    }
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Button className={open ? classes.logOutName : ''} color="inherit" onClick={() => { navigate('/home') }}><Typography variant="h5"  >
                        INNOVASOFT
                    </Typography></Button>
                    <Typography variant="h4" color="inherit" component="div" sx={{ flexGrow: 1 }}>

                    </Typography>
                    {auth ? <>
                        <Typography className={classes.logOutName} variant="body1" >
                            {auth.username}
                        </Typography>
                        <IconButton onClick={() => exit()} className={classes.marginLeft} color="inherit" aria-label="menu" sx={{ mr: 2 }}>
                            <LogoutIcon />
                        </IconButton>

                    </>
                        : <>
                            {pathname !== '/login' ? <Button onClick={() => { navigate('/login') }} color="inherit"><Typography variant="body1" >
                                LOGIN
                            </Typography></Button> : ''}
                            {pathname !== '/registro' ? <Button className={classes.marginLeft} onClick={() => { navigate('/registro') }} color="inherit"><Typography variant="body1" >
                                REGISTRO
                            </Typography></Button> : ''}
                        </>}
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider className={classes.marginBottom} />
                <List className={classes.marginBottom}>
                   
                        <ListItem key={auth?auth.username:'Usuario'} disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                    color: '#606060'
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                        color: '#3f50b5'
                                    }}
                                >
                                    <AccountCircleIcon></AccountCircleIcon>
                                </ListItemIcon>
                                <ListItemText primary={auth?auth.username:'Usuario'} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                   
                </List>
                <Divider className={classes.marginBottom} />

                <List>

                    <ListItem className={classes.marginBottom} key={'Lista'} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={() => navigate('/consulta')}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                color: '#606060'
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: '#3f50b5'
                                }}
                            >
                                <GroupIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Lista'} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>
                    <ListItem className={classes.marginBottom} key={'Administación'} disablePadding sx={{ display: 'block' }}>
                        <ListItemButton
                            onClick={() => navigate('/mantenimiento')}
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                                color: '#606060'
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    color: '#3f50b5'
                                }}
                            >
                                <GroupAddIcon />
                            </ListItemIcon>
                            <ListItemText primary={'Administación'} sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem>

                </List>
            </Drawer>
            <Box component="main" className={open ? classes.over : ''} sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />

                {componente === 'home' ? <Home></Home> : ''}
                {componente === 'login' ? <Login></Login> : ''}
                {componente === 'error' ? <Error></Error> : ''}
                {componente === 'registro' ? <SingUp></SingUp> : ''}
                {componente === 'consulta' ? <CustomerConsult></CustomerConsult> : ''}
                {componente === 'mantenimiento' ? <CustomerMaintenance></CustomerMaintenance> : ''}
            </Box>
        </Box>
    );
}




