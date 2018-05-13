import moviesApi from '../api/moviesApi'
import * as types from './actionTypes'

export function list(page) {
    return function(dispatch) {
        dispatch(getMoviesPending());
        return moviesApi.list(page).then(movies => {
            dispatch(getMoviesSuccess(movies));
        }).catch(error => {
            throw(error);
        });
    };
}

export function get(id) {
    return function(dispatch) {
        return moviesApi.get(id).then(movie => {
            dispatch(getMovieByIdSuccess(movie));
        }).catch(error => {
            throw(error);
        });
    }
}

export function search(query) {
    return function(dispatch) {
        //dispatch(getSearchPending());
        return moviesApi.search(query).then(movies => {
            dispatch(getSearchSuccess(movies));
        }).catch(error => {
            throw(error);
        });
    }
}

export function getMoviesPending() {
    return {type: types.GET_MOVIE_INDEX_PENDING};
}
export function getMoviesSuccess(moviesIndex) {
    return {type: types.GET_MOVIE_INDEX_SUCCESS, moviesIndex};
}
export function getMovieByIdSuccess(movieById) {
    return {type: types.GET_MOVIE_BY_ID_SUCCESS, movieById};
}
export function getSearchSuccess(moviesSearch) {
    return {type: types.SEARCH_SUCCESS, moviesSearch};
}
export function getSearchPending() {
    return {type: types.SEARCH_PENDING};
}