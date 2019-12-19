import React from 'react';
import { connect } from 'react-redux';
import Header from '../../components/header'
import Footer from '../../components/footer'
import history from '../../history'
import {  FAMES_} from '../../path'
import { getfame } from '../../service'
import FameModel from '../../model/fame'
import { storeFames } from '../../actions/action';
import Fame from '../../components/fame'
import './index.css'


class FamesContainer extends React.Component {

    state = {
        fame: new FameModel(),
        loading: true,
        error: false,
    }

    componentDidMount() {
        const {id} = this.props.match.params
        this.getfame(id)
    }

    componentWillReceiveProps(nextProp) {
        const oldId = this.props.match.params.id
        const {id} = nextProp.match.params

        if (oldId!==id) {
            this.getfame(id)
        }
    }
    
    getfame(id) {
        this.setState({loading: true,error: false,})
            setTimeout(()=>
                getfame(id)
                .then(response=> {
                    this.setState({
                        fame: new FameModel(response.data),
                        loading: false,
                    })
                })
                .catch(error=>{
                    this.setState({loading: false,error: true,})
                })
        ,1000)
    }

    back() {
        if (this.props.reducer.fames.length!==0)
        {
            return history.push(FAMES_(this.props.reducer.page))
        }
        history.push(FAMES_(0))
    }

    renderError() {
        if (this.state.error)
            return <h1> Error please try again </h1>
    }

    renderfame() {
            return <Fame
                        fame={this.state.fame}
                        loading={this.state.loading}
            />
    }

    renderBackButton() {
        return <button onClick={()=>this.back()} > return </button>
    }

    render() {
        return (
            <div className="fame-page">
                <Header />
                {this.renderBackButton()}
                {this.renderfame()}
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

export default connect(mapStateToProps, mapDispatchToProps)(FamesContainer)