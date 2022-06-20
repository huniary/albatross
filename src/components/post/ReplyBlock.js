import React from 'react';
import styled from 'styled-components';

import { deleteReply } from '../../api/posts';

import { replyInitialize, setOriginalReply, updateReply } from '../../modules/writereply';
import { useDispatch, useSelector } from 'react-redux';
import ReplyButton from './ReplyButton';
import { fetchReplyList } from '../../modules/replylist';

const ReplyBlockBlock = styled.div``;

function ReplyBlock({ id, reply, reUser, originalReplyId, title, onChange }) {
  const { _id } = reply;
  const { newContent } = useSelector(({ writereply }) => ({ newContent: writereply.content }));

  const dispatch = useDispatch();
  const ownReply = (reUser && reUser._id) === (reply && reply.user._id);

  const onReDelete = async () => {
    try {
      console.log(`${_id}온리딜리트리플아이디`);
      await deleteReply(_id);
      fetchReplyList(); //모듈바뀌면 리렌더될까해봣지만...
      // history(0);
    } catch (error) {
      console.log(error);
    }
  };
  const onEdit = () => {
    dispatch(setOriginalReply(_id)); // 셋이후 오리지널 리플라이아이디안받아와짐
    console.log(_id, '오리지널리플라이아이디 리플라이블럭');
    // history(0);
    if (_id) {
      console.log(newContent, '뉴컨텐트입니다 리플라이블럭');
      dispatch(updateReply({ id: _id, content: newContent, title }));
      dispatch(replyInitialize());
      // history(0);
    }
  };

  return (
    <ReplyBlockBlock>
      {reply.postId === id && (
        <>
          <p>{reply.user.username}</p>
          <p>{reply.content}</p>

          {ownReply && (
            <ReplyButton onEdit={onEdit} onReDelete={onReDelete} content={reply.content} onChange={onChange} />
          )}
        </>
      )}
    </ReplyBlockBlock>
  );
}

export default ReplyBlock;
