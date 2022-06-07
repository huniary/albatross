import { createAction, handleActions } from "redux-actions";
import createACtionTypes from "../lib/createActionTypes";
import createRequestThunk from "../lib/createRequestThunk";
import * as api from "../api/posts";

const INITIALIZE = "write/INIT";
const CHANGE_FIELD = "write/CHANGE_FIELD";
const SET_ORIGINAL_POST = "write/SET_ORIGINAL_POST";

const [POST, POST_SUCCESS, POST_FAILURE] = createACtionTypes("/write");
const [UPDATE, UPDATE_SUCCESS, UPDATE_FAILURE]= createACtionTypes("write/UPDATE");


export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD,({key, value}) =>({
    key,
    value,
}));
export const setOriginalPost = createAction(SET_ORIGINAL_POST, (post)=>post);

export const writePost = createRequestThunk(POST, api.writePost); //받은결과가post임 

export const updatePost = createRequestThunk(UPDATE, api.updatePost);



const init ={
    title:"",
    body: "",
    tags: [],
    post: null,
    postError: null,
    originalPostId:null,
};

const write = handleActions({
    [INITIALIZE]: (state)=> init,
    [CHANGE_FIELD]: (state,{payload: {key,value}})=> ({
        ...state,
        [key]: value,
    }),
    [POST]: (state)=> ({...state, post: null, postError:null}),
                        // ctx.body  <<서버에서 요청한거 지금은post지만 뭐든설정가능
                        // res.data 내용이들어어옴 페이로드에 
    [POST_SUCCESS]: (state, {payload: post})=>({
        ...state,               //지금 data 안에는 응답한 post가 들어잇음
        post,             
    }),
    [POST_FAILURE]: (state, {payload: postError})=>({
        ...state,               //실패할땐 catch부분의 오류받아오기로함
        post: null,
        postError,             
    }),
    [SET_ORIGINAL_POST]: (state, {payload: post})=>({
        ...state,
        title: post.title,
        body: post.body,
        tags: post.tags,
        originalPostId: post._id,
    }),
    [UPDATE_SUCCESS]: (state, {payload: post})=>({
        ...state,
        post,
    }),
    [UPDATE_FAILURE]: (state, {payload: postError} )=> ({
        ...state,               //실패할땐 catch부분의 오류받아오기로함
        post: null,
        postError,             
    }),

}, init);

export default write;