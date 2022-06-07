import QueryString from "qs";
import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Pagination from "../components/post/Pagination";

const  PaginationContainer = () => {

    const {lastPage, posts, loading }=useSelector(({postList, loading})=> ({
        lastPage: postList.lastPage,
        posts: postList.posts,
        loading: loading["postList/POST_LIST"],
    }));
    
    const { username } = useParams();
    const location = useLocation();

    if(!posts || loading) return null;

        //페이지 초기값 설정해주는듯
    const{ tag, page = 1} = QueryString.parse(location.search,{
        ignoreQueryPrefix: true});


    return (
    <Pagination 
        page={parseInt(page,10)} 
        tag={tag} 
        lastPage={lastPage}  
        username={username}/>
        );
}


export default PaginationContainer;