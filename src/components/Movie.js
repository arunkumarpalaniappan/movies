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
import StarRatingComponent from 'react-star-rating-component';
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
                        <div className={"movie-info-modal"}>
                            <div className={"movie-modal-container"}>
                            <Typography variant="headline" component="h1" className={"font-white font-34em"}>
                                {this.state.movieData.title}
                            </Typography>
                            <div>
                                <div style={{fontSize: 22}}>
                                    <span style={{fontSize: 16}}>
                                    {this.state.movieData.vote_average}
                                    </span>
                                    <span>
                                    /10 <div style={{fontSize: 26}}>
                                    <StarRatingComponent 
                                        name="rate1" 
                                        starCount={5}
                                        value={(this.state.movieData.vote_average)/2}
                                        editing={false}
                                        starColor="#fe1b1b"
                                        />

                                </div>
                                    </span>
                                </div>
                                <div style={{fontSize: 16}}>
                                    <span>
                                    {JSON.parse(this.state.movieData.genres.replace(/'/g, '"')).map(g => g.name.replace(/\ /g,'-')+' ')}
                                    </span>
                                </div>
                                <div className={"movies-desc"}>
                                    {this.state.movieData.overview}
                                    <div className={"movies-links"}>
                                        <Link to="/" className={"movies-href-back"}>Go Back</Link> 
                                        <a href={`https://www.imdb.com/title/${this.state.movieData.imdb_id}/`} target={"_blank"} className={"movies-href-imdb"}>IMDB Website</a>
                                    </div>
                                </div>
                            </div>
                            <div>
                            </div>
                            </div>
                        </div>
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