import React, { useState } from 'react';
import styled from 'styled-components';
import { MdDelete, MdEdit } from 'react-icons/md';
import AskReplyModal from '../../pages/AskReplyModal';

const ReplyButtonBlock = styled.div``;

const ReplyButton = ({ onEdit, onReDelete, content, onChange }) => {
  const [modal, setModal] = useState(false);

  const onEditClick = () => setModal(true);

  const onCancel = () => setModal(false);

  const onConfirm = () => {
    setModal(false);
    // 부모로받은 온딜리트 바로실행
    onEdit();
  };
  return (
    <>
      <ReplyButtonBlock>
        <button onClick={onEditClick}>
          <MdEdit />
        </button>
        <button onClick={onReDelete}>
          <MdDelete />
        </button>
      </ReplyButtonBlock>
      <AskReplyModal visible={modal} onCancel={onCancel} onConfirm={onConfirm} content={content} onChange={onChange} />
    </>
  );
};

export default ReplyButton;
