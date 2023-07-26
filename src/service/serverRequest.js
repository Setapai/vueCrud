import axios from 'axios';

const axiosRequestPost = (url, params) => axios.post(process.env.VUE_APP_BE_URL + '/' + url, params)
const axiosRequestGet = (url) => axios.get(process.env.VUE_APP_BE_URL + '/' + url)

export {axiosRequestGet , axiosRequestPost}