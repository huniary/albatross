import React, { useCallback, useEffect } from "react";
import Responsive from "../components/common/Responsive";
import { useDispatch, useSelector } from "react-redux";
import Editor from "../components/post/Editor";
import PostActionButton from "../components/post/PostActionButton";
import TagBox from "../components/post/TagBox";
import { changeField, updatePost, writePost } from "../modules/write";
import { initialize } from "../modules/write";
import { useNavigate } from "react-router-dom";
import HeaderContainer from "../containers/HeaderContainer";

const  WriterPost = () => {
    const dispatch = useDispatch();
    const {title, body, tags, post, postError, originalPostId} = useSelector(({write})=>({
        title: write.title,
        body: write.body,
        tags: write.tags,
        post: write.post,
        postError: write.postError,
        originalPostId: write.originalPostId
    }));
    const history = useNavigate();

                        //포스트 에디터에서 온체인지할때 값 전달받아옴
const onChange = useCallback((payload)=>{
    dispatch(changeField(payload));
},[dispatch]);      

const onPublish = ()=>{
    //작성할때 버튼이랑 수정할때버튼이랑 구분할줄알아야하는데 이렇게함아이디받아와서
    //이건 수정할때 
    if(originalPostId){
        dispatch(updatePost({title, body, tags, id:originalPostId}));
        return;
    }
            //모듈의 writepost
    dispatch(writePost({title,body,tags})); 
}


useEffect(()=>{
    return () =>{
        dispatch(initialize());
    }
},[dispatch]);

useEffect(()=>{
    if(post){       //유저에잇는 유저네임
        const{ _id, user:{username} } = post; //res.data에 post와user와_id가들어잇음
        history(`/@${username}/${_id}`);    //포스트 하나만읽는거
    }

    if(postError){
        console.log(postError);
    }
},[post,postError, history])

console.log(`${originalPostId}오리지널포스트아이디나오나?`);

    return (
    <>
    <HeaderContainer/>
    <Responsive>
        <Editor onChange={onChange} title={title} body={body}/>
        <TagBox onChangeTag={onChange} tags={tags} />
                                        {/* !! 부정의부정이니까 true 암것도안적으면 값이없어서 false되서 그경우를 방지하기위해 */}
                                        {/* null이랑 값이없으면 0도 폴스 false임 */}
                                        {/* 언디파인드는언디파인드인데 null은 null이라는 값이인식됨?? */}
                                        {/* 자바스크립의 특징일까낭? 눌 언디파인드 카라모지 ??요런구분? */}
        <PostActionButton onPublish={onPublish} isEdit={!!originalPostId}/>
    </Responsive>
    </>
    );
}


export default WriterPost;