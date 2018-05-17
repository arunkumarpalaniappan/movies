import {combineReducers} from 'redux'
import moviesData from './moviesReducer'
import movieInfo from './movieByIdReducer';
import esAutoComplete from './esAutoCompleteReducers';
import esSearch from './esSearchReducer';
const rootReducer = combineReducers({
    moviesData,
    movieInfo,
    esAutoComplete,
    esSearch
});

export default rootReducer

