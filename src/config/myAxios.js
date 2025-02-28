// Set config defaults when creating the instance
//自定义实例默认值
import axios from "axios";

const myAxios = axios.create({
    baseURL: 'http://localhost:8039',
    withCredentials:true
});

//拦截器
// 添加请求拦截器
myAxios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log("请求发送了",config)
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
myAxios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    console.log("请求收到了了",response)
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
axios.defaults.withCredentials = true
export default myAxios;
