import { finish, start } from '../modules/loading';

export default function createRequestThunk(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  console.log(type, request);

  //{username, password}
  return (param) => async (dispatch) => {
    dispatch({ type }); //어떤타입이 올지 정하고 //처리시작
    try {
      //로그인이지만 request받아왓으니까 그대로
      dispatch(start(type)); //로딩시작
      //POST http://localhost:4000/api/auth/register로 가는거
      //await api.register({username,password})화면으로부터받은거
      const response = await request(param);
      console.log(`${response}떵크에서 리스폰스오니`);
      console.log(response);
      //리스폰스 이거임 ctx.body = user.serialized();서버에이는거
      dispatch({
        type: SUCCESS, //register_success
        payload: response.data,
        //성공했을때response데이터 넣기 "username": "username" 결과가 유저내임만 받게해놔서
        meta: response, //페이지정보알기위해 메타라는친구를사용 이런저런값들이 들어있음.
      });
    } catch (error) {
      dispatch({
        type: FAILURE,
        payload: error,
        error: true,
      });
      throw error;
    }
    dispatch(finish(type));
  };
}
