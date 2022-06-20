import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import ReplyBlock from '../components/post/ReplyBlock';
import Button from '../components/common/Button_';
import { replyInitialize, writeReply } from '../modules/writereply';

const AllOfReplyBlock = styled.div``;

const AllOfReply = ({ reUser, _id, title, onChange }) => {
  const { replies, content, replyerror, originalReplyId } = useSelector(({ replylist, writereply }) => ({
    replies: replylist.reply,
    content: writereply.content,
    replyerror: writereply.replyError,
    originalReplyId: writereply.originalReplyId,
  }));
  const ReplyInput = styled.input``;
  const history = useNavigate();
  const dispatch = useDispatch();

  const replyChange = (e) => {
    onChange({ key: 'content', value: e.target.value });
  };

  const onPublish = () => {
    dispatch(writeReply({ _id, title, content }));
    dispatch(replyInitialize());
    if (!replyerror) history(0);
  };

  return (
    <>
      <AllOfReplyBlock>
        <h4>댓글</h4>
        {replies &&
          replies.map((reply) => (
            <ReplyBlock
              key={reply._id}
              reply={reply}
              id={_id}
              reUser={reUser}
              originalReplyId={originalReplyId}
              title={title}
              onChange={onChange}
            />
          ))}
      </AllOfReplyBlock>
      <ReplyInput onChange={replyChange} placeholder="댓글남기세요" value={content} />
      <Button onClick={onPublish}>댓글 작성</Button>
    </>
  );
};

export default AllOfReply;
