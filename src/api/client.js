import axios from "axios";

// client.defaults.baseURL = "https:// asdfasd.com"
//  글로벌 설정은 여기서 가능
// axios.interceptors.response.use(
//     res =>~~
// );

const client = axios.create();

export default client;