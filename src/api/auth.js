
import client from "./client";


// 클라이언ㅌ가 백엔드에 보내는 
export const login = ({username, password}) => 
                                //request body에 보내는거
client.post("/api/auth/login", {username, password});

export const register = ({username, password}) => 
// 즈소 4000 에 보낸다 서버에 보낸다
client.post("/api/auth/register", {username, password});


export const check = () => client.get("/api/auth/check");

export const logout = ()=> client.post("/api/auth/logout");

