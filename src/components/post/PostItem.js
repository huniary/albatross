import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import palette from '../../lib/palette';
import SubInfo from './SubInfo';

const PostItemBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between; //다떨쳐지던데

  & + & {
    border-top: 1px solid ${palette.gray[2]};
  }

  h4 {
    &:hover {
      color: ${palette.gray[6]};
    }
  }
`;

const PostItem = ({ post }) => {
  //   console.log(post);
  // const {
  //     title,
  //     publishedDate,
  //     user: {username},
  // } = post; 이렇게 적고 post. 빼고 그대로적어도됨

  return (
    <PostItemBlock>
      <h4>
        <Link to={`/@${post.user.username}/${post._id}`}>{post.title}</Link>
      </h4>
      <div>{post.body}</div>
      <SubInfo username={post.user.username} publishedDate={post.publishedDate}></SubInfo>
    </PostItemBlock>
  );
};

export default PostItem;
