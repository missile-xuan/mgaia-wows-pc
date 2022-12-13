import { BrowserWindow, app, BrowserWindowConstructorOptions } from 'electron'
import { handleUpdate } from './update'
import { handleFunction } from './src/onFunction'
import path from 'path'
console.log('启动')
const browserWindowOptions: BrowserWindowConstructorOptions = {
  minWidth: 1200,
  width: 1500,
  minHeight: 600,
  height: 1000,
  autoHideMenuBar: true
}

/** 构建窗口 */
// http://172.17.12.99:3000/
// https://wows.mgaia.top/

const createWindow = (url = 'https://wows.mgaia.top/'): BrowserWindow => {
  const win = new BrowserWindow({
    ...browserWindowOptions,
    webPreferences: {
      preload: path.join(__dirname, 'src', 'preload.js'),
      webSecurity: false // 开跨域
    }
  })
  // 隐藏顶部菜单栏
  // win.menuBarVisible = false
  void win.loadURL(url)
  // 打开调试窗口
  // win.webContents.openDevTools()
  // 替换为
  win.webContents.setWindowOpenHandler((details) => {
    // 允许创建 allow 取消创建 deny 创建窗口设置
    return { action: 'allow', overrideBrowserWindowOptions: browserWindowOptions }
  })
  return win
}

/** 当程序启动准备好后执行操作 */
void app.whenReady().then(() => {
  // 监听方法
  handleFunction()
  // 启动窗口及验证更新
  handleUpdate(createWindow())
})

/** 关闭所有窗口执行的操作 */
app.on('window-all-closed', () => {
  // 关闭所有窗口后退出
  if (process.platform !== 'darwin') app.quit()
})
