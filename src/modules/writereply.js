import createRequestThunk from '../lib/createRequestThunk';
import * as api from '../api/posts';
import { createAction, handleActions } from 'redux-actions';
import createActionTypes from '../lib/createActionTypes';

const REPLY_INITIALIZE = 'writereply/INIT';
const REPLY_CHANGE_FIELD = 'writereply/REPLY_CHANGE_FIELD';
const SET_ORIGINAL_REPLY = 'writereply/SET_ORIGINAL_REPLY';

const [REPLY, REPLY_SUCCESS, REPLY_FAILURE] = createActionTypes('/writereply');
const [RE_UPDATE, RE_UPDATE_SUCCESS, RE_UPDATE_FAILURE] = createActionTypes('/writereply/RE_UPDATE');

export const replyInitialize = createAction(REPLY_INITIALIZE);
export const replyChangeField = createAction(REPLY_CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const setOriginalReply = createAction(SET_ORIGINAL_REPLY, (reply) => reply);

export const writeReply = createRequestThunk(REPLY, api.writeReply);

export const updateReply = createRequestThunk(RE_UPDATE, api.updateReply);

const init = {
  content: '',
  postId: '',
  title: '',
  reply: null,
  replyError: null,
  originalReplyId: null,
};

const writereply = handleActions(
  {
    [REPLY_INITIALIZE]: (state) => init,
    [REPLY_CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [REPLY]: (state) => ({
      ...state,
      reply: null,
      replyError: null,
    }),
    [REPLY_SUCCESS]: (state, { payload: reply }) => ({
      ...state,
      reply,
    }),
    [REPLY_FAILURE]: (state, { payload: replyError }) => ({
      ...state,
      reply: null,
      replyError,
    }),
    [SET_ORIGINAL_REPLY]: (state, { payload: reply }) => ({
      ...state,
      content: reply.content,
      originalReplyId: reply._id,
    }),
    [RE_UPDATE_SUCCESS]: (state, { payload: reply }) => ({
      ...state,
      reply,
    }),
    [RE_UPDATE_FAILURE]: (state, { payload: replyError }) => ({
      ...state,
      reply: null,
      replyError,
    }),
  },
  init,
);

export default writereply;
