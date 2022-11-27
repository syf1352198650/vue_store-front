import axios from "axios";

const service=axios.create({
    baseURL:'http://127.0.0.1:3007',
    // withCredentials: true, // 允许携带coolie,报错
})
service.interceptors.request.use((req)=>{
    console.log('请求拦截');
    
    // console.log(token);

    if(req.headers.needToken){

        let token=JSON.parse(localStorage.getItem('teaUserInfo')).token || '';
        console.log(token);
        req.headers.token=token;
    }
    return req
})
service.interceptors.response.use((res)=>{
    console.log('响应拦截');
    res=res.data
    return res
})
export default service