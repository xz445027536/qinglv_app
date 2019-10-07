import axios from 'axios'
//添加axios拦截
axios.interceptors.response.use(function (response) {
  return response.data.data;
}, function (error) {
  return Promise.reject(error);
});
//请求city组件的数据接口
export let getCities=()=>{
  return axios.get('/mock/city.json')
}

