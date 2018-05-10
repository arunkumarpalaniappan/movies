import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function getMoviesReducer(state = initialState.mmovieById, action) {
    switch (action.type) {
        case types.GET_MOVIE_BY_ID_SUCCESS:
            return action.movieById;
        default:
            return state;
    }
}


