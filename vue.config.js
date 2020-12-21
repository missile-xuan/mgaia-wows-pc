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
        // see https://www.electron.build/configuration/publish#genericserveroptions
        publish: {
          provider: 'generic',
          url: ''
          // url: 'https://mgaia.top/update/wowspc'
        },
        win: {
          icon: './public/app.ico'
        },
        productName: 'mgaia-wows-pc-app',
        nsis: {
          oneClick: false,
          // 允许修改安装目录
          allowToChangeInstallationDirectory: true, 
          allowElevation: true,
          createDesktopShortcut: true,
          createStartMenuShortcut: true,
          shortcutName: 'wows憨批伴侣'
        }
      }
    }
  }
}