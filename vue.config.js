let baseUrl = ''
switch (process.env.NODE_ENV) {
  case 'development':
    baseUrl = 'http://localhost:3000'
    break
  case 'production':
    baseUrl = 'https://www.chenpeiliang/ajsj'
    break
}

const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/', // 基本路径
  outputDir: 'dist', // 打包输出目录
  lintOnSave: false, // 不校验eslint
  devServer: {
    proxy: {
      '/api': {
        target: baseUrl
      },
    }
  },

  // webpack配置
  chainWebpack: (config) => { //修改文件引入自定义路径
    console.log('开发环境为：' + process.env.NODE_ENV) // ==> development
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@com', resolve('src/components'))
      .set('@views', resolve('src/views'))
      .set('@css', resolve('src/assets/css'))
      .set('@img', resolve('src/assets/images'))
      .set('@js', resolve('src/assets/js'))
  },
  // css配置
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "@/assets/css/base/variable.scss";`
      }
    }
  }

}