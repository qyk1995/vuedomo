import axios from 'axios';
import { Loading,Message } from 'element-ui';



let  Load = null 
export function ShowLoading(msg="加载中,请稍等..."){
    Load && Load.close() 
    Load = Loading.service({
        lock: true,
        text: msg,
        background: 'rgba(0, 0, 0, 0.7)',
    })
}

export function ShowError(){
    Load && Load.close() 
    Message.closeAll()
   // Message.error(msg)

}

export function ShowSuccess(){
   Load && Load.close() 
   Message.closeAll()
 //  Message.success(msg)
}
// 请求配置基础路径和超时时间
const requests = axios.create({
    baseURL:'/api',
    timeout:120000
});


// 请求拦截器配置

requests.interceptors.request.use((config)=>{
    ShowLoading()
    return config;
});


// 请求返回拦截器
requests.interceptors.response.use((res)=>{
    
    ShowSuccess()
    return res.data;
},()=>{
    // 响应失败的回调函数
    ShowError()
    return Promise.reject(new Error('faile'));
})

// 对外暴露
export default requests;