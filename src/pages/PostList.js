import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import Posts from "../components/post/Posts";
import qs from "qs";

import HeaderContainer from "../containers/HeaderContainer";
import { fetchPostList } from "../modules/postlist";

import PaginationContainer from "../containers/PaginationContainer";

const PostList = () => {
  const location = useLocation();
  const { username } = useParams(); //파라메타로 유저네임받아오니까
  const dispatch = useDispatch();
  const { posts, error, loading, user } = useSelector(
    ({ postList, loading, user }) => ({
      posts: postList.posts,
      error: postList.error,
      loading: loading["postList/POST_LIST"],
      user: user.user,
    })
  );

  useEffect(() => {
    //useLoaction() 콜백함수안에 들어가면안된데 pathname이랑
    // 내가 쿼리에적은 ? ㅇ뒤에 값이 search에 나옴
    // 여기에 ?까지 같이 나오기때문에 이그노어퀘리프리픽스 를하면 ? 사라짐
    //그리고 qs.parse()하면 오브젝트로 username: "1111" 이 나옴
    //쿼리스트링에 파스랑 스트링기파이는 셋트 /파스 제이슨화
    const { tag, page } = qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });

    dispatch(fetchPostList({ username, tag, page }));
  }, [dispatch, username, location.search]);
  
  // console.log(username);

  return (
    <>
      <HeaderContainer />
      <Posts loading={loading} error={error} posts={posts} showBtn={user} />
      <PaginationContainer></PaginationContainer>
    </>
  );
};

export default PostList;
