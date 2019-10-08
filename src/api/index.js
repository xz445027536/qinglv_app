import axios from 'axios'
//添加axios拦截
axios.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  return Promise.reject(error);
});
//请求Swiper组件的数据接口
export let getSwiper=()=>{
  return axios.get('http://127.0.0.1:3300/swiper')
}
//请求city组件的数据接口
export let getCities=()=>{
  return axios.get('/mock/city.json')
}

