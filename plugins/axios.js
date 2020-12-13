import AuthUtil from '~/util/AuthUtil'

export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
    const token = AuthUtil.getAuthToken();
    if(token !== null){
      config.headers.Authorization = 'Basic ' + token;
    }
    return config
  })

  $axios.onError(error => {
    console.log(error.toString())
    if(error.toString().includes('Network Error')){
      console.log('----redirecting----')
      redirect('/')
    }
    const code = parseInt(error.response && error.response.status)
    if (code === 401) {
      redirect('/')
    }
  })
}
