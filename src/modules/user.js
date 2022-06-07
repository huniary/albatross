import { createAction, handleActions } from "redux-actions";
import createACtionTypes from "../lib/createActionTypes";
import createRequestThunk from "../lib/createRequestThunk";
import * as api from "../api/auth";

const TEMP_SET_USER= "user/TEMP_SET_USER";
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE]= createACtionTypes("user/CHECK");
const LOGOUT ="user/LOGOUT";

export const tempSetUser = createAction(TEMP_SET_USER, (user)=>user);
export const check = createRequestThunk(CHECK, api.check);
export const logout = createRequestThunk(LOGOUT,api.logout);

// function* logoutTunk(){
//     try{         안함 
//         yield api.logout();
//         localStorage.removeItem("user");   
//     }catch(error){

//     }
// }

// function* 사가에서쓰는법 썽크에서는 쓰지못함 제네레이트?라고부른듯..


const init= {
    user: null,
    checkError: null,
};

export default handleActions({
    [TEMP_SET_USER]:(state,{payload:user})=>({...state, user}),
    [CHECK_SUCCESS]:(state,{payload:user})=>({
        ...state,
         user, 
         checkError:null
    }),
    [CHECK_FAILURE]:(state,{payload:checkError})=>({
        ...state,
         user:null, 
         checkError
    }),
    [LOGOUT]: state=>({...state, user: null}),
},init);