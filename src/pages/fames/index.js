import React from 'react';
import { connect } from 'react-redux';
import Header from '../../components/header'
import Footer from '../../components/footer'
import history from '../../history'
import {  FAMES_, FAME_ } from '../../path'
import { getfames } from '../../service'
import FameModel from '../../model/fame'
import { storeFames } from '../../actions/action';
import Fame from '../../components/fame'
import './index.css'

class FamesContainer extends React.Component {

    state = {
        loading: false,
        error: false,
    }

    componentDidMount() {
        const {page} = this.props.match.params
        if (
            this.props.reducer.fames.length===0 ||
            page !== this.props.reducer.page
            ) {
            this.getfames(page)
        }
    }

    componentWillReceiveProps(nextProp) {
        const oldPage = this.props.match.params.page
        const {page} = nextProp.match.params

        if (oldPage!==page) {
            this.getfames(page)
        }
    }
    
    getfames(page) {
        this.setState({ loading: true, error: false }, ()=>
        setTimeout(()=>
            getfames(page)
            .then(response=> {
                this.props.storeFames(
                        response.data.list.map( fame=> new FameModel(fame)),
                        page
                    )
                this.setState({ loading: false})
                })
                .catch(error=>{
                    this.setState({ loading: false, error: true})
                })
        ,3000)
        )
    }

    renderfamesList() {
        if (!this.state.loading)
            return this.props.reducer.fames.map(fame => 
                <Fame
                    fame={fame}
                    key={fame.getId()}
                    onMoreClick={()=>history.push(FAME_(fame.getId()))}
                />
            )
    }

    renderLoading() {
        if(this.state.loading) {
            return (
                <>
                    <Fame loading/>
                    <Fame loading/>
                    <Fame loading/>
                    <Fame loading/>
                    <Fame loading/>
                </>
            )
        }
    }

    renderPagination() {
        return (
            <div className="fames-pagination">
                <button onClick={()=>history.push(FAMES_(0))}>page1</button>
                <button onClick={()=>history.push(FAMES_(1))}>page2</button>
            </div>
        )
    }
    
    renderError() {
        if (this.state.error)
            return <h1> Error please try again </h1>
    }

    render() {
        return (
            <div className="fames">
                <Header />
                {this.renderfamesList()}
                {this.renderPagination()}
                {this.renderError()}
                {this.renderLoading()}
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

export default connect(mapStateToProps, mapDispatchToProps)(FamesContainer)