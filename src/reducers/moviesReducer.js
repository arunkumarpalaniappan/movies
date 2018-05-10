import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function getMoviesReducer(state = initialState.moviesIndex, action) {
    switch (action.type) {
        case types.GET_MOVIE_INDEX_PENDING:
            return {fetching: true};
        case types.GET_MOVIE_INDEX_SUCCESS:
            return action.moviesIndex;
        default:
            return state;
    }
}


