const isProd = process.env.NODE_ENV === 'production'

module.exports = {
    publicPath: isProd ? '/backend/dist' : '/',
    css: {
        loaderOptions: {
            less: {
                javascriptEnabled: true
            }
        }
    }
}