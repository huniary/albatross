import React from "react";
import { Helmet } from "react-helmet-async";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import PostList from "./pages/PostList";
import ReadPost from "./pages/ReadPost";
import Register from "./pages/Register";
import WriterPost from "./pages/WriterPost";

function App() {
  //Login
  //회원가입
  //

  return (
    //안에내용다지우고시작
    <>
    {/* <Helmet>
      <title>알바트로오스</title>
    </Helmet> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        {/* 전체를보여줄거냐 유저네임검색한걸 보여줄거냐 근데안돼*/}
        <Route path="/" element={<PostList />} exact />
        <Route path="/@:username" element={<PostList />} exact />
        <Route path="/@:username/:postId" element={<ReadPost />} />
        <Route path="/write" element={<WriterPost />} />
      </Routes>
    </>
  );
}

export default App;
