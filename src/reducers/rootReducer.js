import {combineReducers} from 'redux'
import moviesData from './moviesReducer'
import movieInfo from './movieByIdReducer';
const rootReducer = combineReducers({
    moviesData,
    movieInfo
});

export default rootReducer

