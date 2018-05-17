import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function getMoviesReducer(state = initialState.esSearch, action) {
    switch (action.type) {
        case types.ES_SEARCH_SUCCESS:
            return  action.esSearchHits;
        default:
            return state;
    }
}
