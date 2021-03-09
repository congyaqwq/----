const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    publicPath: isProd ? '/admin/' : '/',
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    }
}