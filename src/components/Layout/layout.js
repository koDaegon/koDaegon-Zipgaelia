import React , {Component} from 'react';
import Aux from '../../hoc/Auxiliary'
import Toolbar from '../Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    };

    sideDrawerToggleClicked =() => {
        this.setState((prevState) => {
           return {showSideDrawer: !prevState.showSideDrawer};
        })
    };

    render () {
        return (
        <Aux>
            <Toolbar drawerToggleClicked= {this.sideDrawerToggleClicked}/>
            <SideDrawer 
            open= {this.state.showSideDrawer} 
            clicked= {this.sideDrawerClosedHandler}/>
            <main className = {classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        )
    }
}

export default Layout;