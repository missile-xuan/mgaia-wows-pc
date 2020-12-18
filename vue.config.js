// eslint-disable-next-line no-undef
module.exports = {
  css: {
    loaderOptions: {
      // 给 stylus-loader 传递选项
      stylus: {
        import: '~@/components/stylus/variables.styl'
      }
    }
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        win: {
          icon: './public/app.ico'
        },
        productName: 'mgaia-wows-pc-app'
      }
    }
  }
}