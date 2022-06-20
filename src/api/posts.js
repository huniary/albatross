import client from './client';
import qs from 'qs';

export const writePost = ({ title, body, tags }) => client.post('/api/posts', { title, body, tags });
//이건 request 요구한거 서버측에 전달할 변수3개

//request 에서 필요한 id는 (id)건네주면됨
//오브젝트가아닌 한개라서 {노필요}
export const readPost = (id) => client.get(`/api/posts/${id}`);

//한페이지씩 늘어놓고싶은경우 뒤에 쿼리 하나들어가는느낌 3페이지
// 모든경우를 한번에 처리  파라메타가아니라 쿼리로던지는건가봄
//위에 writePost 에서 파라메터하면 /api/posts/아이디 이런건데
//쿼리는 api/posts?username=username식임
export const postList = ({ page, username, tag }) => {
  // qs 퀘리스트링 라이브러리사용
  const queryString = qs.stringify({
    page,
    username,
    tag,
  });

  return client.get(`/api/posts?${queryString}`);
};

export const updatePost = ({ id, title, body, tags }) =>
  // 주소, 그리고 파라메타
  client.patch(`/api/posts/${id}`, { title, body, tags });

export const deletePost = (id) => client.delete(`/api/posts/${id}`);

export const replyList = (id) => client.get(`/api/reply/${id}`);

export const writeReply = ({ _id, title, content }) => 
  client.post(`/api/reply`, { _id, title, content });

export const deleteReply = (id) => client.delete(`/api/reply/${id}`);

export const updateReply = ({ id, content, title }) => 
  client.patch(`/api/reply/${id}`, { content, title });
