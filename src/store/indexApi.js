import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react"

// 创建一个Api对象
const xxxApi = createApi({
  reducerPath: "xxxApi", // Api标识
  // 指定基础请求信息，默认fetch
  baseQuery: fetchBaseQuery({
    baseUrl: "http://xxx/",
  }),
  // 方法，指定Api的各种功能，返回一个对象
  endpoints(build) {
    // build是请求的构建器，通过build来设置相关信息
    return {
      getXxx: build.query({
        query(id) {
          // 指定子路径，调用Api时会拼接baseUrl
          return "xxx" + id
        },
        transformResponse(baseQueryReturnValue) {
          // 转换响应数据
          return baseQueryReturnValue
        },
        // 设置缓存时间，单位秒，0为不缓存，默认60s
        keepUnusedDataFor: 0,
      }),
    }
  },
})

// Api对象创建后，会根据endpoints返回的方法生成各个钩子函数
// 钩子函数命名规则：getXxx => useGetXxxQuery
export const { useGetXxxQuery } = xxxApi
export default xxxApi
