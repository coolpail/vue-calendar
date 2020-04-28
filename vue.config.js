module.exports = {
  outputDir: "docs",
  publicPath: process.env.NODE_ENV === "production" ? "/vue-calendar" : "",
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('./src')
      }
    },
  }
}
