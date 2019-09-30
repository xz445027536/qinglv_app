import axios from 'axios'
//添加axios拦截
axios.interceptors.response.use(function (response) {
  return response.data.data;
}, function (error) {
  return Promise.reject(error);
});
//
export let getDta=()=>{
  return axios.get('')
}