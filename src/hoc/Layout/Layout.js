import React , {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../Auxiliary/Auxiliary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.module.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

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
            <Toolbar 
                drawerToggleClicked= {this.sideDrawerToggleClicked}
                isAuthenticated= {this.props.isAuth}
                />
            <SideDrawer 
                open= {this.state.showSideDrawer} 
                clicked= {this.sideDrawerClosedHandler}
                isAuthenticated= {this.props.isAuth}
            />
            <main className = {classes.Content}>
                {this.props.children}
            </main>
        </Aux>
        )
    }
}


const mapStatetoProps = (state) => {
    return {
        isAuth: state.auth.token !== null
    }
}

export default connect(mapStatetoProps)(Layout);