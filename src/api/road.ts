import http from '@/utils/http'
export const getRoadTreeData = () =>
  new Promise((resolve, reject) => {
    http({
      url: '/api/file/GetAllTransport',
      method: 'get'
    })
      .then((res) => {
        // console.log(res, 'res')
        if (Array.isArray(res)) {
          resolve(res)
        }
        // if (res.code === 200) {
        //   resolve(res.result)
        // }
      })
      .catch((e) => {
        reject(e)
      })
  })

export const getRoadInfoByName = (name: string) =>
  new Promise((resolve, reject) => {
    http({
      url: `/api/file/GetTransportByName/0&${name}`,
      method: 'get'
    })
      .then((res) => {
        if (Array.isArray(res)) {
          resolve(res)
        }
        // if (res.code === 200) {
        //   resolve(res.result)
        // }
      })
      .catch((e) => {
        reject(e)
      })
  })
