import React from 'react';
import styled from 'styled-components';
import palette from '../../lib/palette';
import Button from './Button_';

const ReplyModalBlock = styled.div`
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalBlock = styled.div`
  width: 280px;
  background: white;
  padding: 1.5rem;
  border: 1px solid black;
  border-radius: 4px;
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.12);
  h3 {
    margin-top: 0;
    margin-bottom: 1rem;
  }
  p {
    margin-bottom: 3rem;
    font-size: 0.8rem;
    color: ${palette.gray[8]};
  }
`;

const StyledButton = styled(Button)`
  height: 2rem;
  & + & {
    margin-top: 0.75rem;
  }
`;

const ReplyModal = ({
  visible,
  title,
  content,
  confirmText = '수정하기',
  cancelText = '취소',
  onConfirm,
  onCancel,
  onChange,
}) => {
  //   const [newContent, setnewContent] = useState();
  const replyChange = (e) => {
    onChange({ key: 'content', value: e.target.value });
  };

  if (!visible) return null;

  return (
    <ReplyModalBlock>
      <ModalBlock>
        <h3>{title}</h3>
        <input placeholder={content} onChange={replyChange} />
        {/* 폼할때는 useState로 값 저장해주고 보내야함. */}
        <div>
          <StyledButton onClick={onCancel}>{cancelText}</StyledButton>
          <StyledButton cyan onClick={onConfirm}>
            {confirmText}
          </StyledButton>
        </div>
      </ModalBlock>
    </ReplyModalBlock>
  );
};

export default ReplyModal;
