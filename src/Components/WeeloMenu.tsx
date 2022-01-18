import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { useEffect, useState } from 'react';
import SignalRNotifier from './SignalRNotifier';
import { SnackbarProvider } from 'notistack';

// SEARCH BAR STYLE
const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

// SEARCH ICON STYLE
const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

//STYLES INPUT BASE
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function WeeloMenu(props) {
  // GETS THE USER DATA
  const [userName, setUserName] = useState<string>("");
  const [signalrMessages, setSignalrMessages] = useState([]);
  let user = JSON.parse(sessionStorage.getItem('user'));

  // VALIDATE USER LOGGED
  if (user == null) {
    window.history.pushState(null, null, '/login');
  }

  // USE EFFECTS
  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem('user'));
    setUserName(user.firstName);
  }, []);

  // USE STATES
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [anchorMainEl, setAnchorMainEl] = React.useState<null | HTMLElement>(null);
  const [anchorNotificationEl, setAnchorNotificationEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  // VALIDATION MENUs
  const isMenuOpen = Boolean(anchorEl);
  const isMainMenuOpen = Boolean(anchorMainEl);
  const isNotificationMenuOpen = Boolean(anchorNotificationEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  // HANDLES FOR MENUs
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMainMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorMainEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorNotificationEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMenuProfile = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    window.history.pushState(null, null, '/profile');
  };

  const handleMenuLogout = () => {
    setAnchorEl(null);
    handleMobileMenuClose();

    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    window.history.pushState(null, null, '/login');
  };

  const handleMainMenuClose = () => {
    setAnchorMainEl(null);
    handleMobileMenuClose();
  };

  const handleMainMenuProperties = () => {
    setAnchorMainEl(null);
    handleMobileMenuClose();
    window.history.pushState(null, null, '/properties');
  };

  const handleNotificationMenuProperties = () => {
    setAnchorNotificationEl(null);
  };

  const handleMainMenuUsers = () => {
    setAnchorMainEl(null);
    handleMobileMenuClose();
    window.history.pushState(null, null, '/profile');
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  // Get the signalr message and show in notifications menu
  const notifyEvent = (message) => {
    signalrMessages.push(message)
    setSignalrMessages([...signalrMessages])
  };

  // RENDER MENU
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuProfile}>Profile</MenuItem>
      <MenuItem onClick={handleMenuLogout}>Logout</MenuItem>
    </Menu>
  );

  // RENDER MENU MAIN
  const renderMainMenu = (
    <Menu
      anchorEl={anchorMainEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMainMenuOpen}
      onClose={handleMainMenuClose}
    >
      <MenuItem onClick={handleMainMenuProperties}>Properties</MenuItem>
      <MenuItem onClick={handleMainMenuUsers}>Profile</MenuItem>
    </Menu>
  );

  // RENDER NOTIFICATION MAIN
  const renderNotificationMenu = (
    <Menu
      anchorEl={anchorNotificationEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isNotificationMenuOpen}
      onClose={handleNotificationMenuProperties}
    >
      {signalrMessages.map(el =>
        <MenuItem onClick={handleNotificationMenuProperties}>{el}</MenuItem>)}
    </Menu>
  );

  // RENDER MOBILE MENU
  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 1 new notifications"
          color="inherit"
        >
          <Badge badgeContent={3} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  // RETURN COMPONENT
  return (
    <Box sx={{ flexGrow: 1 }}>
      {renderMainMenu}
      <AppBar position="static">
        <Toolbar>
          <IconButton onClick={handleMainMenuOpen}
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            WEELO | Technical Test Mauricio Zapata
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Typography
              noWrap
              component="div"
              sx={{ display: { xs: 'none', sm: 'block' } }}
            >
              Welcome: {userName}
            </Typography>
            <IconButton onClick={handleNotificationMenuOpen}
              size="large"
              color="inherit" >
              <Badge badgeContent={signalrMessages.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderNotificationMenu}
      <SnackbarProvider maxSnack={10}>
        <SignalRNotifier notifyEvent={notifyEvent}></SignalRNotifier>
      </SnackbarProvider>
    </Box>
  );
}

