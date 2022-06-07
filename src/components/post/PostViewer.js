import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import palette from "../../lib/palette";
import { fetchReplyList } from "../../modules/replylist";
import Button from "../common/Button_";
import Responsive from "../common/Responsive";




const PostViewerBlock = styled(Responsive)`
    margin-top: 3rem;
`;

const PostHeader = styled.div`
    border-bottom: 1px solid ${palette.gray[2]};
    padding-bottom: 3rem;
    margin-bottom: 3rem;
    h1{
        font-size: 3rem;
        line-height: 1.5;
        margin: 0;
    }
`;

const SubInfo = styled.div`
    margin-top: 1rem;
    color: ${palette.gray[5]};
    span + span::before{
        color:${palette.gray[5]};
        padding-left: 0.25rem;
        padding-right: 0.25rem;
        content: "\\B7";    //정규표현인데 점표현하는거
    }
`;

const Tags = styled.div`
    margin-top: 0.5rem;
    .tag{
        display: inline-block;
        color: ${palette.cyan[7]};
        text-decoration: none;
        margin-right: 0.5rem;
        &:hover{
            color: ${palette.cyan[6]};
        }
    }
`;

const PostContent = styled.div`
    font-size: 1.13rem;
    color: ${palette.gray[9]};

`;

const ReplyInput = styled.input`

`;



const  PostViewer =({post, error, loading, actionButtons}) =>{
    
    // const dispatch = useDispatch();
    // const {replies} = useSelector(({replyList})=>({
    //     replies: replyList.reply,
    // }))
    
    // useEffect(()=>{
    //     dispatch(fetchReplyList());
    // },[dispatch])
    

    if(error) return <PostViewerBlock>게시글이존재하지않습니다</PostViewerBlock>


// 로딩중이면 내용 표시안하고 리턴 포스가없어도
    if(loading || !post) return ;  

    const { title, user, body, tags, publishedDate } = post;


    return (
    <PostViewerBlock>
        {/* <Helmet>
            <title>{post.title}</title>
        </Helmet> */}

        <PostHeader>
            <h1>{title}</h1>
            <SubInfo username={user.username} 
            publishDate={publishedDate} />
            <Tags>
                {tags.map(tag =>(
                    <span className="tag" key={tag}>
                    #{tag}    
                    </span>
                ))}
            </Tags> 
        </PostHeader>
        {/* Readpost에 액션버튼으로 만들어줌 원래여긴데  */}
        {actionButtons}
        <PostContent 
                                //그대로출력하면 <div><p>같이 출력되서 이렇게해결함
        dangerouslySetInnerHTML={{__html:  body}}/>
        {/* 댓글만들고 */}
        {/* <div>{replies.map((reply,index) =>(<div key={index}>{reply}</div>))}</div> */}
        <ReplyInput /><Button>댓글 작성</Button>
        {/* 화살표만들고 */}
    </PostViewerBlock>
    );
}


export default PostViewer;