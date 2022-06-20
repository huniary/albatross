import React from 'react';
import ReplyModal from '../components/common/ReplyModal';

const AskReplyModal = ({ visible, onConfirm, onCancel, content, onChange }) => {
  const title = '수정할댓글';
  return (
    <ReplyModal
      visible={visible}
      title={title}
      content={content}
      onConfirm={onConfirm}
      onCancel={onCancel}
      onChange={onChange}
    />
  );
};

export default AskReplyModal;
