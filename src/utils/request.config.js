export default {
	baseURL: 'https://www.mgaia.top/', // api的base_url
	// 自定义的请求头
	headers: {
		'Content-Type': 'application/json;charset=utf-8',
	},
	// 超时设置
	timeout: 180000,
	// 跨域是否带Token
	withCredentials: false,
	// 响应的数据格式 json / blob /document /arraybuffer / text / stream
	responseType: 'json'
}