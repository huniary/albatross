//Action  //여긴 회원인증하는부분? 정보들어가는거는 user.js
import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import createRequestThunk from '../lib/createRequestThunk';
import * as api from '../api/auth';
import createACtionTypes from '../lib/createActionTypes';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

//이거 리턴은 ㄹ배열
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createACtionTypes('auth/LOGIN');
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createACtionTypes('auth/REGISTER');

//client만 움직이는것 createAction
//req/res 떵크를 이용한다
//redux-saga 같은기능이잇음
export const changeField = createAction(CHANGE_FIELD, ({ form, key, value }) => ({
  form, //레지스터일까 로그인일까
  key, // id, password , passconfirm , 여기에 추가된것들이 다들어와잇음
  value, // real value
}));

export const initForm = createAction(INITIALIZE_FORM, (form) => form);

// export const login = createAction(LOGIN,({username, password})=>({
//     username,
//     password}));

// export const register = createAction(REGISTER,({username, password})=>({
//     username,
//     password}));

//type,request 임 api에 그이름으로 전달
export const login = createRequestThunk(LOGIN, api.login); //res.data
export const register = createRequestThunk(REGISTER, api.register);

//State
const init = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
    email: '',
    phone: '',
    address: '',
  },
  login: {
    username: '',
    password: '',
  },
  auth: null, //null에서 리스폰스받은 유저네임가져와서 입력됨 그래서 state 바뀌고 리랜더됨
  authError: null,
};

//Reducer
//immer 바라바라 나열되는거를 쉽게해주는거
const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      // [레지스터][유저네임]=밸류 넣겟다
      //[여기안에변수를넣으면]스트링으로 해주세요 라는말
      //      전의값, 바뀐후의값
      //produce(state,(draft)=>{})
      produce(state, (draft) => {
        draft[form][key] = value;
      }),

    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: init[form],
      authError: null,
    }),
    //페이로드엔 리스폰스.데이타가있음 유저네임
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
      authError: null,
    }),
    [REGISTER_FAILURE]: (state, { payload: authError }) => ({
      ...state,
      auth: null,
      authError,
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      auth,
      authError: null,
    }),
    [LOGIN_FAILURE]: (state, { payload: authError }) => ({
      ...state,
      auth: null,
      authError,
    }),
  },
  init,
);

export default auth;
