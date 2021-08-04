import Vue from 'vue'
import axios from 'axios'

if (process.env.PROD) {
  axios.defaults.baseURL = 'https://59f5tguc6l.execute-api.us-east-2.amazonaws.com/Prod/'
} else {
  axios.defaults.baseURL = 'http://localhost:3000/'
}

Vue.prototype.$axios = axios
