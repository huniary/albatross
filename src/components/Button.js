import React from "react";
import palette from "../lib/palette";

import styled, { css } from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledButton = styled.button`
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

    &:disabled{
        background: ${palette.gray[3]};
        color: ${palette.gray[5]};
        cursor: not-allowed;
    }
`;


const Button = ({to, ...rest})=>{
    const history = useNavigate();

    const onClick = (e) =>{
        if(to){
            history(to);
        }
        if(rest.onClick){
            rest.onClick(e);
        }
    };

    return <StyledButton {...rest} onClick={onClick} />;
        };



export default Button;