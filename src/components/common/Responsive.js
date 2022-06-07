import React from "react";
import styled from "styled-components";

const ResponsiveBlock = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    width: 1200px;//보통 1000~1200으로 만듬 대부분 화면에서 할수있게
    margin: 0%;

    @media(max-width:1200px){
        width:768px;
    }
    @media(max-width:768px){
        width:100%;
    }

`;


function  Responsive({children, ...rest}){
    return <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>;
}


export default Responsive;