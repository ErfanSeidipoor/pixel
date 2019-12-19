import React from 'react';
import { connect } from 'react-redux';
import history from '../../history'
import {  LOGIN_, FAMES_ } from '../../path'
import { logout } from '../../service'
import { storeFames } from '../../actions/action';

class Logout extends React.Component{

    clearDate() {
        this.props.storeFames([], 0)
        localStorage.clear();
        history.push(LOGIN_())
    }

    logout() {
        logout()
            .then( () => { this.clearDate(); })
            .catch( () => { this.clearDate();} )
    }

    cancel() {
        history.push(FAMES_(0))
    }

    render(){
        return (
            <>
                <h1>Are you Sure ?</h1>
                <button onClick={()=>this.cancel()}> Cancel </button>
                <button onClick={()=>this.logout()}> Ok </button>
            </>
        )
    }
}


const mapDispatchToProps = dispatch => ({
    storeFames: (...args) => dispatch(storeFames(...args)),
})

export default connect(null, mapDispatchToProps)(Logout)