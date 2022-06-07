import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deletePost } from "../api/posts";
import EditDeleteButton from "../components/post/EditDeleteButton";
import PostViewer from "../components/post/PostViewer";
import HeaderContainer from "../containers/HeaderContainer";
// import loading from "../modules/loading";
import { readPost, unloadPost } from "../modules/post";
import { setOriginalPost } from "../modules/write";

const  ReadPost = ()=>{
    const { postId } = useParams();//유즈팟므 안에 postId가 잇음
    const history = useNavigate();  //이친구 찾아보기 
    const dispatch = useDispatch();
    const {post, error, loading,user } = useSelector(({post, loading, user})=>({
        post: post.post,
        error: post.error,
        loading: loading["posts/READ"],
        user: user.user,
    }));
        //지금 유저의 유저아이디와  글쓴사람의 유저아이디가 같냐 비교
    const ownPost = (user && user._id) === (post && post.user._id);
    // 밑에 이프 이게 트루일때만 들어가는거니까 그대로 let 에 집어넣어버림
    // if((user && user.id) === (post && post.user_id)){
    //     ownPost = true;
    // }

    const onEdit = ()=>{
        dispatch(setOriginalPost(post));
        history("/write");
    }
 

    const onDelete = async() =>{
        try{
            await deletePost(postId);
            history("/");
                // 에이싱크 어웨이트는 트라이캐치필수
        }catch(error){
            console.log(error);
        }
    };

    useEffect(()=>{
        //데이터베이스에서 post를 얻는다.
        dispatch(readPost(postId));
        console.log(postId);


        return ()=> {//언마운트될때 state를 초기화
            dispatch(unloadPost());
        }
    },[dispatch, postId]);





    return (
    <>
        <HeaderContainer />
        <PostViewer 
        post={post} 
        error={error} 
        loading={loading}
        actionButtons={
            // 수정을누르면 writepost로 이동해서 기록이 남아있어야함
            ownPost &&
        <EditDeleteButton onEdit={onEdit} onDelete={onDelete}/>
        }
        />
    </>
    );
}


export default ReadPost;