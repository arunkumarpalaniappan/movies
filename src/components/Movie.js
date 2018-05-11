import React from 'react';
import {
    connect
} from 'react-redux'
import * as moviesActions from '../actions/moviesAction';
import {
    bindActionCreators
} from 'redux'
import {
    withStyles as classes
} from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import _ from 'lodash';
import { CircularProgress } from 'material-ui/Progress';
import Fade from 'material-ui/transitions/Fade';
import {Link} from 'react-router-dom';
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
            <div className={"movie-container"}>
                {(this.state.movieData.belongs_to_collection)?(
                    <div className={"movie-info"} style={{background: `url(http://image.tmdb.org/t/p/original${JSON.parse(this.state.movieData.belongs_to_collection.replace(/'/g, '"')).backdrop_path}) no-repeat center center fixed`}}>
                    </div>
                ):
                <div className={"movie-info"}>
                    <Fade
                        in={true}
                        style={{
                        transitionDelay: true ? '800ms' : '0ms',
                        }}
                        unmountOnExit
                        >
                        <CircularProgress />
                    </Fade>
                </div>}
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