import createACtionTypes from "../lib/createActionTypes";
import createRequestThunk from "../lib/createRequestThunk";
import * as api from "../api/posts";
import { createAction, handleActions } from "redux-actions";
    // *as api 대신 {readPost}도가능 

const [READ, READ_SUCCESS, READ_FAILURE] = createACtionTypes("post/READ");
const UNLOAD_POST = "post/UNLOAD_POST";


export const readPost = createRequestThunk(READ, api.readPost);
export const unloadPost = createAction(UNLOAD_POST);

const init = {
    post: "",
    error: null,
};

const post = handleActions({
                        //payload에는 response.data가 들어감.
    [READ_SUCCESS] : (state,{payload: post})=>({
        ...state,
        post,
    }),
    [READ_FAILURE]:(state, {payload: error})=>({
        ...state,
        error,
    }),
    [UNLOAD_POST]: ()=> init,
},
init
);

export default post;