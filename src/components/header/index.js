import React from 'react';
import history from '../../history'
import { LOGOUT_ } from '../../path'
import './index.css'

class Header extends React.Component {

    logout() {
        history.push(LOGOUT_())
    }

    render() {
        return (
            <div className="header">
                Erfan Seidipoor (Pixel)
                <button onClick={()=>this.logout()}>logout</button>
            </div>
        )
    }
}

export default Header