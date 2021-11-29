const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: isProd ? "/admin/" : "/",
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    proxy: {
      "^/api": {
        target: "http://localhost:3000",
        ws: true,
        changeOrigin: true,
      },
    },
  },
};