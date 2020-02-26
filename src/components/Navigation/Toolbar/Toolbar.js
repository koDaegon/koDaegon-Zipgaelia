import React from 'react';
import {NavLink} from 'react-router-dom';
import Logo from '../../Logo/Logo';
import classes from './Toolbar.module.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar= (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className={classes.Logo}>
            <NavLink to ='/'>
                 <Logo/>
            </NavLink>
        </div>
        <nav className={classes.DesktopOnly}>
        
            <NavigationItems isAuthenticated = {props.isAuthenticated}/>     
        </nav>
    </header>
);

export default toolbar;