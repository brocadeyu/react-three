/* eslint-disable @typescript-eslint/no-explicit-any */
import type { AxiosRequestConfig } from 'axios'
import axios from 'axios'
import qs from 'qs'
const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL as string,
  timeout: 5000
})

/**
 * 请求拦截
 */
http.interceptors.request.use(
  (config) => {
    if (config.headers === undefined) {
      config.headers = {} as any
    } else {
      config.headers['X-Requested-With'] = 'XMLHttpRequest'
      config.headers['Request-Start'] = new Date().getTime()
      // config.headers["Authorization"] = useUserStore().user.token;
    } // token 写一个默认值，后面会替换
    // config.headers["Accept-Language"] = getLocaleLang();
    if (config.url !== '/auth/oauth/token') {
      // config.headers['Authorization'] = 'Bearer ' + getToken() || ''
    }
    if (config.method?.toUpperCase() === 'GET') {
      config.params = { ...config.params }
    }
    if (
      Object.values(config.headers).includes(
        'application/x-www-form-urlencoded'
      )
    ) {
      config.data = qs.stringify(config.data)
    }
    // get序列化
    config.paramsSerializer = function (params) {
      return qs.stringify(params, { arrayFormat: 'repeat' })
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)
/**
 * 响应拦截
 */
http.interceptors.response.use(
  (response) => {
    // if (response.data.code === 401) {
    //   //自定义业务状态码
    //   redirectLogin()
    //   throw new Error('未授权，请登录')
    // }
    return response
  },
  (error) => {
    // const status = getValueByKeys(error, 'response.status', 500)
    // const httpCodeLabel: IObject<string> = {
    //   400: '请求参数错误',
    //   401: '未授权，请登录',
    //   403: '拒绝访问',
    //   404: `请求地址出错: ${getValueByKeys(error, 'response.config.url', '')}`,
    //   408: '请求超时',
    //   500: 'API接口报500错误',
    //   501: '服务未实现',
    //   502: '网关错误',
    //   503: '服务不可用',
    //   504: '网关超时',
    //   505: 'HTTP版本不受支持'
    // }
    // if (error && error.response) {
    //   // eslint-disable-next-line no-console
    //   console.error('请求错误', error.response.data)
    // }
    // if (status === 401) {
    //   // redirectLogin();
    // }
    // if (httpCodeLabel[status]) {
    //   Message({
    //     text: httpCodeLabel[status],
    //     top: '100px'
    //   })
    // }
    // ElMessage.error(`请求失败：${error.response.status}`)
    return Promise.reject(error)
  }
)
// const redirectLogin = () => {
//   router.replace('/login')
// }
export default (o: AxiosRequestConfig): Promise<any> => {
  return new Promise((resolve, reject) => {
    http(o)
      .then((res) => {
        return resolve(res.data)
      })
      .catch(reject)
  })
}
