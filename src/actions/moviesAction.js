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

export function getMoviesPending() {
    return {type: types.GET_MOVIE_INDEX_PENDING};
}
export function getMoviesSuccess(moviesIndex) {
    return {type: types.GET_MOVIE_INDEX_SUCCESS, moviesIndex};
}
export function getMovieByIdSuccess(movieById) {
    return {type: types.GET_MOVIE_BY_ID_SUCCESS, movieById};
}