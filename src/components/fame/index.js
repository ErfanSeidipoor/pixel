import React from 'react';
import './index.css'

class Fame extends React.Component {
    renderData() {
        return (
            <>
                <div className="fame-id">id: {this.props.fame.getId()}</div>
                <div className="fame-name">name: {this.props.fame.getName()}</div>
                <div className="fame-dob">Dob: {this.props.fame.getDob()}</div>
                <img className="fame-image" alt={this.props.fame.getName()} src={this.props.fame.getImage()} />
                {
                    this.props.onMoreClick ? <button onClick={()=>this.props.onMoreClick()} >{"More"}</button> : ""
                }                
            </>
        )
    }

    renderLoading() {
        return (
            <div className="fame-loading">
                loading...
            </div>
        )
    }

    render() {
        return (
            <div className="fame">
                {
                    this.props.loading ?
                    this.renderLoading() : 
                    this.renderData()
                }

            </div>
        )
    }
}
export default Fame 