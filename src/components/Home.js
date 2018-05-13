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
import { Link } from 'react-router-dom';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Search from '@material-ui/icons/Search';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Autosuggest from 'react-autosuggest';
class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            moviesData: [],
            fetching: false,
            value: '',
            suggestions: [],
            requestSent: false,
            search: '',
            searchData : [],
            isSearched: false
        };
        this.handleOnScroll = this.handleOnScroll.bind(this);
        this.getSuggestions = this.getSuggestions.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.debouncedDataGet = this.debouncedDataGet.bind(this);
        this.searchMovies = this.searchMovies.bind(this);
        this.searchwithDebounce = this.searchwithDebounce.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const merge = (a, b, p) => a.filter(aa => !b.find(bb => aa[p] === bb[p])).concat(b);
        if(this.state.isSearched) {
            this.setState({searchData: nextProps.moviesData ,suggestions : this.getSuggestions()});
        } else if (!!!nextProps.moviesData.fetching) {
            this.setState({ moviesData: merge(this.state.moviesData, nextProps.moviesData, "_id"), fetching: false, requestSent: false })
        } else {
            this.setState({ fetching: nextProps.moviesData.fetching })
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleOnScroll);
        // [1,2,3,4,5].map(page => {
        //     this.props.actions.list(page);
        // })
        this.props.actions.list(1);
    }
    // Teach Autosuggest how to calculate suggestions for any given input value.
    getSuggestions = () => {
        return this.state.searchData
    };
    // When suggestion is clicked, Autosuggest needs to populate the input
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // input value for every given suggestion.
    getSuggestionValue = suggestion => {
        this.props.history.push(`/movies/${suggestion._id}`);
        return suggestion.original_title;
    }

    // Use your imagination to render suggestions.
    renderSuggestion = suggestion => (
        <div id={suggestion._id} className={"md-search-result__article md-search-result__article--document"}>
            <h4>
                {suggestion.original_title}
            </h4>
            <div>
                {(suggestion && suggestion.overview.length)?suggestion.overview.substring(0,100):''}...
            </div>
        </div>
    );
    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };
    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        if(value.length > 3) {
            this.setState({value: value, isSearched: true})
            //const searchFun = _.debounce(this.searchwithDebounce, 1000);
            this.props.actions.search(value)
        } else {
            this.setState({isSearched : false})
        }
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };
    debouncedDataGet() {
        if(!this.state.requestSent) {
            this.props.actions.list((this.state.moviesData.length/40)+1);
            this.setState({requestSent: true});
        }
    }
    handleOnScroll() {
        let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        let clientHeight = document.documentElement.clientHeight || window.innerHeight;
        let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= (scrollHeight - 1000);
        const fetchNextSet = _.debounce(this.debouncedDataGet, 1000)
        if (scrolledToBottom) {
            fetchNextSet()
        }
    }
    searchwithDebounce(query) {
        this.props.actions.search(query);
    }
    searchMovies(e) {
        if(e.target.value.length > 3) {
            this.setState({value: e.target.value, isSearched: true})
            const searchFun = _.debounce(this.searchwithDebounce, 1000);
            this.props.actions.search(e.target.value)
        } else {
            this.setState({isSearched : false})
        }
    }
    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: 'Search Movie Names/IMDB IDs/Descriptions/Genres',
            value,
            onChange: this.onChange
        };
        let moviesData = [];
        if(this.state.moviesData.length) {
            moviesData = this.state.moviesData;
            //moviesData = this.state.moviesData.filter((movie) => movie.original_title.toString().toLowerCase().trim().includes(this.state.search.toLowerCase().trim()));
        }
        // if(this.state.isSearched) {
        //     moviesData = this.state.searchData
        // }
        return (
            <div className={"movie-container"}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="title" color="inherit" className={classes.flex} style={{fontFamily:'Acme, sans-serif'}}>
                        Discover
                    </Typography>
                    <Grid container item xs={12} >
                            <Grid item xs={4}>
                            </Grid>
                            <Grid item xs={8}>
                                <Autosuggest
                                    className={"autoselect-input"}
                                    suggestions={suggestions}
                                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                                    getSuggestionValue={this.getSuggestionValue}
                                    renderSuggestion={this.renderSuggestion}
                                    inputProps={inputProps}
                                />
                            </Grid>
                        </Grid>  
                </Toolbar>
            </AppBar>
                <div className={"movie-info"}>
                    <div className={"movies-index"}>                                               
                        <div className={"movies-container"}>
                            <Grid container className={classes.root} spacing={16}>
                                <Grid container item xs={12} >
                                    <Grid item xs={2}>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <div className={"search-stat"}>{!!this.state.search.length ? (`${moviesData.length} results found`) : null} </div>
                                        <Grid container className={classes.demo} justify="center" spacing={Number(16)}>
                                            {moviesData.map(movie => (
                                                <Grid container key={movie._id} item className={"ele-5"} alignItems={'center'} justify={'center'}>
                                                    <div>
                                                        <Link to={`/movies/${movie._id}`} ><img id={movie._id} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.original_title} className={"movie-poster"} /> </Link>
                                                    </div>
                                                    <div className={"movie-title"}>{movie.original_title}</div>
                                                    <div className={"movie-lan"}>{movie.release_date.split("-")[0]}</div>
                                                </Grid>
                                            ))}
                                            <Fade
                                                in={!this.state.search.length}
                                                style={{
                                                    transitionDelay: !this.state.search.length ? '800ms' : '0ms',
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