import React from "react";
import styled from "styled-components";
import Button from "../Button";

const PostActionButtonBlock = styled.div`
    margin-top: 1rem;
    margin-bottom: 3rem;
    button + button {
        margin-left: 0.5rem;

    }
`;

const StyledButton = styled(Button)`
    height: 2.5rem;
    & + & {
        margin-left: 0.5rem;
    }

`;

const  PostActionButton= ({onPublish, onCancel, isEdit}) => {
    return (
        <PostActionButtonBlock>
            <StyledButton cyan onClick={onPublish}>
                {isEdit? "Edit!!" : "Post!!"}
            </StyledButton>
            <StyledButton gray onClick={onCancel}>
                Cancle
            </StyledButton>
        </PostActionButtonBlock>
    );
};


export default PostActionButton;