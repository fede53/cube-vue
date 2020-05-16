import axios from 'axios'

console.log(process.env)
axios.defaults.baseURL = process.env.VUE_APP_API_PATH

axios.interceptors.request.use(function (config) {
  const token = window.localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const appService = {
    connectToServer (credentials) {
        var call = null;
        return new Promise((resolve, reject) => {
            var acceptedResponse = {
                validateStatus: function (status) {
                    return status < 500; // Reject only if the status code is greater than or equal to 500
                }
            }
            switch (credentials.methodToConnect) {
                case 'post':
                    call = axios.post(credentials.urlToConnect, credentials);
                break;
                case 'patch':
                    call = axios.patch(credentials.urlToConnect, credentials);
                break;
                case 'delete':
                    call = axios.delete(credentials.urlToConnect, credentials);
                break;
                default:
                    call = axios.get(credentials.urlToConnect, credentials);
                break;
            }

            call.then(r => {
                resolve(r.data)
            }).catch(e => {
                reject(e)
            })
        })
    }
}

export default appService
