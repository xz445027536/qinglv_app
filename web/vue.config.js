module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? '/' : '/',
  css: {
    loaderOptions: {
      less: {
        // 这里的选项会传递给 less-loader
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    open: true,
    proxy: {
      '/spsp-web': {
        target: 'http://10.203.246.93:8080',
        ws: true,
        changeOrigin: true
      }
    }
  }

}