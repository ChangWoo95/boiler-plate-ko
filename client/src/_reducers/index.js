import { combineReducers } from 'redux';
import user from './user_reducer';
//import comment from './comment_reducer';

// combinereducer로 여러 reducer를 통합시킴
const rootReducer = combineReducers({
    user
    // comment,
})

export default rootReducer;