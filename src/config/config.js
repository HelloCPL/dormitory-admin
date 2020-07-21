let baseUrl = ''
switch (process.env.NODE_ENV) {
  case 'development':
    // baseUrl = 'http://localhost:3000/api/admin'
    baseUrl = 'http://106.55.153.80:3000/api/admin'
    break
  case 'production':
    baseUrl = 'http://106.55.153.80:3000/api/admin'
    break
  default:
    baseUrl = 'http://106.55.153.80:3000/api/admin'
}

export default {
  baseUrl: baseUrl,
  // baseUrl: '/api/admin',
  salt: 'liangwanming'
}