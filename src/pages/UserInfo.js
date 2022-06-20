import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getUserInfo } from '../modules/user';

const UserInfoBlock = styled.div``;

const UserInfo = () => {
  const dispatch = useDispatch();
  const { user, userInfo, loading } = useSelector(({ user, loading }) => ({
    user: user.user,
    userInfo: user.userInfo,
    loading: loading['user/GET_USERINFO'],
  }));
  console.log(userInfo);
  console.log(user);
  useEffect(() => {
    dispatch(getUserInfo(user._id));
  }, [dispatch, user]);

  if (!userInfo) return <div>로딩중....</div>;
  //   if (loading) return <div>로딩중....</div>;
  return <UserInfoBlock>{!loading && userInfo && userInfo.username}</UserInfoBlock>;
  //   return <UserInfoBlock>{userInfo && userInfo.username}</UserInfoBlock>;
};

export default UserInfo;
