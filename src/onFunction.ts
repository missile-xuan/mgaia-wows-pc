
import { ipcMain, dialog, BrowserWindow } from 'electron'
import fs from 'fs'

// 声明带响应的监听方法
export function handleFunction (): void {
  // 获取实时对局文件内容
  ipcMain.handle('getTempArenaInfoJson', (event, path: string) => {
    // 具体文件名还是交给前端
    return fs.readFileSync(path, 'utf-8')
  })

  // 选择文件夹路径
  ipcMain.handle('getDirectoryPath', (event) => {
    const webContents = event.sender
    const win = BrowserWindow.fromWebContents(webContents)
    return dialog.showOpenDialogSync(win as Electron.BrowserWindow, {
      properties: ['openDirectory']
    })
  })
}
