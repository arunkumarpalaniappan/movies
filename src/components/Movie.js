import React from 'react';
import {
    connect
} from 'react-redux'
import * as moviesActions from '../actions/moviesAction';
import {
    bindActionCreators
} from 'redux'
class Movie extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieData: {}
        }
    }
    componentDidMount() {
        this.props.actions.get(this.props.match.params.id);
    }
    componentWillReceiveProps(nextState) {
        this.setState({movieData: nextState.movieInfo[0]})
    }
    render() {
        return(
            <div>
                {(this.state.movieData.belongs_to_collection)?<img src={`http://image.tmdb.org/t/p/original${JSON.parse(this.state.movieData.belongs_to_collection.replace(/\'/g, '"')).backdrop_path}`} alt={"test"}/>:null}
                
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        movieInfo: state.movieInfo
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, moviesActions), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);