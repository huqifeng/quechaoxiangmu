const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}
// const BASE_URL = process.env.NODE_ENV === 'production' ? '/' : '/'
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
module.exports = {
  publicPath: './',
  outputDir: 'dist',
  assetsDir: 'static',
  lintOnSave: true, // 是否开启编译时是否不符合eslint提示
  css: {
    // css预设器配置项
    loaderOptions: {
      postcss: {
        plugins: [
          autoprefixer({
            overrideBrowserslist: [
              'Android 4.1',
              'iOS 7.1',
              'Chrome > 31',
              'ff > 31',
              'ie >= 8'
            ]
          }),
          pxtorem({
            rootValue: 37.5,
            propList: ['*']
          })
        ]
      }
    }
  },
  chainWebpack: config => {
    // key,value自行定义，比如.set('@@', resolve('src/components'))
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_c', resolve('src/components'))
    // 性能提示，超过 250kb 的资源提示关闭
    config.performance.set('hints', false)
  },
  // 设为false打包时不生成.map文件
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.VUE_APP_TITLE === 'production') {
      // 打包生成环境删除console
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
    }
  },
  devServer: {
    // host: '0.0.0.0',
    // port: 8080,
    // publicPath: '../',
    proxy: {
      '/api': {
        target: 'http://qc.gf.bj.cn/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
}
