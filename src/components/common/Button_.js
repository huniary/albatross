import React from "react";
import palette from "../../lib/palette";

import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

const buttonStyled = css`
    border: none;
    outline: none;
    background: ${palette.gray[8]};
    border-radius: 4px;
    font-size: 1rem;
    font-weight: bold;
    padding: 0.25rem 1rem;
    color: white;
    cursor: pointer;

    &:hover{
        background: ${palette.gray[9]};
    }

    ${props => props.fullWidth && css`
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
        width: 100%;
        font-size: 1.125rem;
    `}

    ${props => props.cyan && css`
        background: ${palette.cyan[6]};
        &:hover{
            background: ${palette.cyan[5]};
        }
    `}
    
    &:disabled {
    background: ${palette.gray[3]};
    color: ${palette.gray[5]};
    cursor: not-allowed;
  }

`;

const StyledButton = styled.button`
    ${buttonStyled}
    
`;

const StyledLink = styled(Link)`
    ${buttonStyled}
`;

const Button = (props) => {
    return props.to ? (
      <StyledLink {...props} cyan={props.cyan ? 1 : 0} />
    ) : (
      <StyledButton {...props} />
    );
  };



export default Button;