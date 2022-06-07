import createACtionTypes from "../lib/createActionTypes";
import createRequestThunk from "../lib/createRequestThunk";
import * as api from "../api/posts";
import { handleActions } from "redux-actions";


const [POST_LIST, POST_LIST_SUCCESS, POST_LIST_FAILURE] = 
createACtionTypes("postlist/POST_LIST");


export const fetchPostList = createRequestThunk(POST_LIST, api.postList);

const init = {
    posts : null,
    error : null,
    lastPage: 1, //마지막페이지 초기값 1
};

const postList = handleActions({
    [POST_LIST_SUCCESS]:(state,{payload: posts, meta: response})=> ({
        ...state,
        posts,              //Nしんほう [N進法] n진법 정해줘야함radix
        lastPage: parseInt(response.headers["last-page"],10),//스트링이니까 숫자로바꿈
    }),
    [POST_LIST_FAILURE]: (state,{payload:error})=>({
        ...state,
        error,
    })

},init);

export default postList;
