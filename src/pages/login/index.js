import React from 'react';
import { connect } from 'react-redux';
import Header from '../../components/header'
import Footer from '../../components/footer'
import history from '../../history'
import { getfames } from '../../service'
import FameModel from '../../model/fame'
import { storeFames } from '../../actions/action';

import {  FAMES_ } from '../../path'
import { login } from '../../service'
import './index.css'

class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "test",
            password: "test",
            loading: false,
            error: false,
        }
    }

    componentDidMount() {
        if (this.props.reducer.fames.length!==0) {
            return history.push(FAMES_(this.props.reducer.page))
        }
        this.getfames(0)

    }

    getfames(page) {
        this.setState({ loading: true }, ()=>
            getfames(page)
            .then(response=> {
                this.props.storeFames(
                        response.data.list.map( fame=> new FameModel(fame)),
                        page
                    )
                history.push(FAMES_(page))
                })
                .catch(error=>{
                    this.setState({ loading: false})
                })
        )
    }


    login() {
        this.setState({
            loading: true,
            error: false
        },()=>
            login(
                this.state.username,
                this.state.password,
            )
            .then( response => {
                this.setState({loading: false,})
                window.localStorage.setItem("authorization", response.headers.authorization);
                history.push(FAMES_(0))
            })
            .catch( error => {
                this.setState({loading: false, error: true})
                console.log(error)
            })
        )
    }
    
    renderError() {
        if (this.state.error)
            return <h1> Error please try again </h1>
    }

    renderForm() {
        return (
            <div>
                <h3>username</h3>
                <input
                    disabled={this.state.loading}
                    autoFocus
                    value={this.state.username}
                    onChange={e=>this.setState({username: e.target.value})}
                />
                <h3>Password</h3>
                <input
                    disabled={this.state.loading}
                    type="password"
                    value={this.state.password}
                    onChange={e=>this.setState({password: e.target.value})}
                />
                
                <button
                    disabled={this.state.loading}
                    onClick={()=>this.login()}
                >
                    Login
                </button>

                <h3>PIXEL</h3>

            </div>
        )
    }
    
    render() {
        return (
            <div className="login">
                <Header />
                {this.renderForm()}
                {this.renderError()}
                <Footer />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    reducer: state.reducer,
})

const mapDispatchToProps = dispatch => ({
    storeFames: (...args) => dispatch(storeFames(...args)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)