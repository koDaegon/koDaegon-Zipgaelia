import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
      <NavigationItem link= '/' exact > Burger Builder </NavigationItem>
      {props.isAuthificated ? 
        <NavigationItem link= '/orders' > Orders </NavigationItem>:
        null }
      {!props.isAuthificated ?  
      <NavigationItem link= '/auth' > Login </NavigationItem> :
      <NavigationItem link= '/logout' > Logout </NavigationItem> }
    </ul>

);

export default navigationItems;