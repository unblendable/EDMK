import axios from 'axios'
axios.defaults.headers = {
  'Content-Type': 'application/json'
}
const SERV_API = process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:3010/'

export function post_api(route_name, params) {
  return new Promise((resolve) => {
    axios.post(SERV_API + route_name, params)
      .then((response) => {
        return resolve(response.data)
      })
  })
}
