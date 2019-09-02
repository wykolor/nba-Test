/**axios封装
 * 请求拦截、相应拦截、错误统一处理
 */
import axios from 'axios';
import router from '../router';
import store from '../store/store';
// 基础配置baseUrl
import baseURL from './env'
axios.defaults.baseURL = baseURL;
// 请求超时时间
axios.defaults.timeout = 15000; //超时时间
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

// 添加请求拦截器
axios.interceptors.request.use(
    config => {
        // 在请求之前做点什么
        // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = localStorage.getItem('token');
        token && (config.headers.Authorization = token);
        return config;
    },
    error => {
        //对请求错误做些什么
        return Promise.error(error);
    }
)

/** 
 * 跳转登录页
 * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
 */
const toLogin = () => {
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
}

// 添加响应拦截器
axios.interceptors.response.use(
    // 对响应数据做点什么
    response => {
        // 与后台定义好的token失效的状态码
        return Promise.resolve(response)
    },
    // 对响应错误做点什么  
    error => {
        if (error.response.status) {
            switch (error.response.status) {
                // 401: 未登录                
                // 未登录则跳转登录页面，并携带当前页面的路径                
                // 在登录成功后返回当前页面，这一步需要在登录页操作。                
                case 401:
                    break;
                    // 403 token过期                
                    // 登录过期对用户进行提示                              
                    // 跳转登录页面                
                case 403:

                    // 清除token                    
                    // localStorage.removeItem('token');                                       
                    // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面

                    break;
                    // 404请求不存在                
                case 404:

                    break;
                case 500:

                    break;
                case 504:
                    break;
                    // 其他错误，直接抛出错误提示                
                default:
                    break;
            }
            return Promise.reject(error.response);
        }
    }
);
export default axios;
