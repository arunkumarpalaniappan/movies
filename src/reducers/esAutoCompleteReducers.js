import * as types from '../actions/actionTypes'
import initialState from './initialState'

export default function getMoviesReducer(state = initialState.esAutoComplete, action) {
    switch (action.type) {
        case types.ES_AUTOCOMPLETE_SUCCESS:
            return action.esAutoCompleteHits;
        default:
            return state;
    }
}


