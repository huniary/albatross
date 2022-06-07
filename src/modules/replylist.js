import createACtionTypes from "../lib/createActionTypes";
import createRequestThunk from "../lib/createRequestThunk";
import * as api from "../api/posts";
import { handleActions } from "redux-actions";


const [REPLY_LIST,REPLY_LIST_SUCCESS,REPLY_LIST_FAILURE] =
createACtionTypes("replylist/REPLY_LIST");

export const fetchReplyList = createRequestThunk(REPLY_LIST, api.replyList)

const init ={
    reply: null,
    error: null,
}

const replyList = handleActions({
    [REPLY_LIST_SUCCESS]:(state,{payload: reply}) =>({
        ...state,
        reply,
    }),
    [REPLY_LIST_FAILURE]:(state,{payload:error}) => ({
        ...state,
        error,
    }) 
},init);


export default replyList;