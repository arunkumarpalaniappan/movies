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

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            moviesData: [],
            fetching: false
        };
        this.handleOnScroll = this.handleOnScroll.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const merge = (a, b, p) => a.filter( aa => ! b.find ( bb => aa[p] === bb[p]) ).concat(b);
        if(!!!nextProps.moviesData.fetching) 
            this.setState({moviesData:merge(this.state.moviesData,nextProps.moviesData,"_id"), fetching: false})
        else 
            this.setState({fetching: nextProps.moviesData.fetching})
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleOnScroll);
        this.props.actions.list(1);
    }

    handleOnScroll() {
        let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        let clientHeight = document.documentElement.clientHeight || window.innerHeight;
        let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= (scrollHeight - 300);
        const fetchNextSet  =  _.debounce(this.props.actions.list, 1000)
        if (scrolledToBottom) {
          fetchNextSet((this.state.moviesData.length/20)+1)
        }
      }

    render() {
        return (
            <div className={"movies-index"}>
                <Typography variant="headline" component="h2" className={"discover-header"}>
                    Discover
                </Typography>
                <div className={"movies-container"}>
                    <Grid container className={classes.root} spacing={16}>
                        <Grid container item xs={12} >
                        <Grid item xs={2}>
                        </Grid>
                        <Grid item xs={8}>
                            <Grid container className={classes.demo} justify="center" spacing={Number(16)}>
                                {this.state.moviesData.map(movie => (
                                <Grid container key={movie._id} item className={"ele-5"} alignItems={'center'} justify={'center'}>
                                    <div>
                                    <Link to={`/movies/${movie._id}`} ><img id={movie._id} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.original_title} className={"movie-poster"} /> </Link>
                                    </div>
                                        <div className={"movie-title"}>{movie.original_title}</div>
                                        <div className={"movie-lan"}>{movie.release_date.split("-")[0]}</div>
                                </Grid>
                                ))}
                                <Fade
                                    in={true}
                                    style={{
                                    transitionDelay: true ? '800ms' : '0ms',
                                    }}
                                    unmountOnExit
                                >
                                    <CircularProgress />
                                </Fade>
                            </Grid>
                        </Grid>
                        <Grid item xs={2}>
                        </Grid>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        moviesData: state.moviesData
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(Object.assign({}, moviesActions), dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);