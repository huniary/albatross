import {combineReducers} from "redux";
import auth from "../modules/auth";
import loading from "../modules/loading";
import user from "./user";
import write from "./write";
import post from "./post";
import postList from "./postlist";
// 유저추가해야하는데 놓침
const rootReducer =combineReducers({
    auth, 
    loading, 
    user, 
    write, 
    post, 
    postList
});

export default rootReducer;