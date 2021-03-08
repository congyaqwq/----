const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    publicPath: isProd ? '/backend/' : '/',
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    }
}