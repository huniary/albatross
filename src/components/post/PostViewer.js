import React from 'react';

import styled from 'styled-components';

import palette from '../../lib/palette';

import Responsive from '../common/Responsive';

import AllOfReply from '../../containers/AllOfReply';

const PostViewerBlock = styled(Responsive)`
  margin-top: 3rem;
`;

const PostHeader = styled.div`
  border-bottom: 1px solid ${palette.gray[2]};
  padding-bottom: 3rem;
  margin-bottom: 3rem;
  h1 {
    font-size: 3rem;
    line-height: 1.5;
    margin: 0;
  }
`;

const SubInfo = styled.div`
  margin-top: 1rem;
  color: ${palette.gray[5]};
  span + span::before {
    color: ${palette.gray[5]};
    padding-left: 0.25rem;
    padding-right: 0.25rem;
    content: '\\B7'; //정규표현인데 점표현하는거
  }
`;

const Tags = styled.div`
  margin-top: 0.5rem;
  .tag {
    display: inline-block;
    color: ${palette.cyan[7]};
    text-decoration: none;
    margin-right: 0.5rem;
    &:hover {
      color: ${palette.cyan[6]};
    }
  }
`;

const PostContent = styled.div`
  font-size: 1.13rem;
  color: ${palette.gray[9]};
`;

const PostViewer = ({ post, error, loading, actionButtons, reUser, onChange }) => {
  if (error) return <PostViewerBlock>게시글이존재하지않습니다</PostViewerBlock>;

  // 로딩중이면 내용 표시안하고 리턴 포스가없어도
  if (loading || !post) return;

  const { _id, title, user, body, tags, publishedDate } = post;
  console.log(`${_id}뷰어에서 post_id오나요`);

  return (
    <PostViewerBlock>
      <PostHeader>
        <h1>{title}</h1>
        <SubInfo username={user.username} publishDate={publishedDate} />
        <Tags>
          {tags.map((tag) => (
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
        dangerouslySetInnerHTML={{ __html: body }}
      />
      {/* 댓글만들고 */}
      <AllOfReply reUser={reUser} _id={_id} title={title} onChange={onChange} />

      {/* 화살표만들고 */}
    </PostViewerBlock>
  );
};

export default PostViewer;
