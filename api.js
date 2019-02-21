import axios from 'axios'

export const baseUrl = "http://v.juhe.cn/toutiao/index";

const http = axios.create({
        baseURL: baseUrl,
		timeout: 6000
    });


//get请求
export const get = (url,params) => { return http({
    headers: {
        'Content-Type':'application/json;'
    },
    url:url,
    method:"GET",
    data: params
    }).then(res => res);
};

//post请求
export const post = (url,params) => { return http({
    headers: {
        'Content-Type':'application/json;'
    },
    url:url,
    method:"POST",
    data:params
}).then(res => res)};

