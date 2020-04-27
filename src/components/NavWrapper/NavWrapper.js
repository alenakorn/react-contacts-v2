import React from 'react'
import {NavLink} from 'react-router-dom'

import BookmarkIcon from '@material-ui/icons/Bookmark'
import PermContactCalendarIcon from '@material-ui/icons/PermContactCalendar'
import MenuIcon from '@material-ui/icons/Menu'
import {makeStyles, useTheme} from '@material-ui/core/styles'
import {
    CssBaseline, AppBar, Typography, Toolbar,
    ListItemIcon, ListItemText, Divider, Drawer,
    Hidden, IconButton, ListItem, List
} from '@material-ui/core'

import style from './NavWrapper.module.scss'
import CreateButton from '../UI/CreateButton/CreateButton'

const useStyles = makeStyles((theme) => ({
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
}));

function NavWrapper(props) {
    const {container} = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={[classes.toolbar, style.Toolbar].join(' ')}>
                <CreateButton/>
            </div>
            <Divider/>
            <List className={style.MenuList}>
                <NavLink to='/' exact activeClassName={style.activeLink}>
                    <ListItem button>
                        <ListItemIcon><PermContactCalendarIcon/></ListItemIcon>
                        <ListItemText>Contacts</ListItemText>
                    </ListItem>
                </NavLink>
                <NavLink to='/favorites' activeClassName={style.activeLink}>
                    <ListItem button>
                        <ListItemIcon><BookmarkIcon/></ListItemIcon>
                        <ListItemText>Favorites</ListItemText>
                    </ListItem>
                </NavLink>
            </List>
        </div>
    );

    return (
        <div className={style.Root}>
            <CssBaseline/>
            <AppBar position="fixed" className={style.AppBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={style.MenuButton}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Directory
                    </Typography>
                </Toolbar>
            </AppBar>
            <nav className={style.Drawer} aria-label="mailbox folders">
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{paper: style.DrawerPaper,}}
                        ModalProps={{keepMounted: true}}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer classes={{paper: style.DrawerPaper,}} variant="permanent" open>
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={style.DrawerContent}>
                <div className={classes.toolbar}/>
                {props.children}
            </main>
        </div>
    );
}

export default NavWrapper;
