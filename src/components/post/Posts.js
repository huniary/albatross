import React from "react";
import styled from "styled-components";
import Button from "../common/Button_";
import Responsive from "../common/Responsive";
import PostItem from "./PostItem";

const PostListBlock = styled(Responsive)`

    margin: 0 auto; //마진 순서도 중요함 마진탑이 위에잇으면 안떨어짐 밑으로가야함
    margin-top: 3rem;
`;

// 컴포턴ㄴ트형식으로 만들껀데 길어져서 파일하나만들어서함
// const PostItem = ()=> {
    
// };

const WriteButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 3rem;
`;


const  Posts = ({posts, loading, error, showBtn}) =>{

    if(error){
        return <PostListBlock>에러</PostListBlock>
    }
    
    return (
    <PostListBlock>
        <WriteButtonWrapper>
            {showBtn && (
                <Button cyan to ="/write">
                New Post
            </Button>
                )}

        </WriteButtonWrapper>

        {!loading && posts && (
            <div>
                         {/*key정할게없으면 post,index를 받아와서index넣어줘도됨  */}
               {posts.map(post=> (<PostItem key={post._id} post={post}/>))}
            </div>
        )}
    </PostListBlock>
    );
};


export default Posts;