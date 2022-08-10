// 向web页面注入方法脚本
import { contextBridge, ipcRenderer } from 'electron'

window.addEventListener('DOMContentLoaded', () => {
  for (const dependency of ['chrome', 'node', 'electron']) {
    console.log(dependency, process.versions[dependency])
  }
  // 注入electron方法
})

/**
 * contextBridge.exposeInMainWorld向页面window暴露一个对象
 * 在页面中可以使用 window.electronAPI 进行调用
 */
contextBridge.exposeInMainWorld('electronAPI', {
  // 获取实时对局文件内容
  getTempArenaInfoJson: async (path: string): Promise<any> => await ipcRenderer.invoke('getTempArenaInfoJson', path),

  // 打开文件夹选定文件夹路径
  getDirectoryPath: async (): Promise<any> => await ipcRenderer.invoke('getDirectoryPath'),

  // 更新检查
  checkForUpdates: () => ipcRenderer.send('ev-check-for-update'),

  // 暴露更新提示方法
  shouldUpdateHandleCounter: (callback: any) => ipcRenderer.on('ev-should-update', callback),

  // 立即更新
  electronUpdateNow: () => ipcRenderer.send('ev-update-now'),

  // 消息提示
  electronMessage: (callback: any) => ipcRenderer.on('ev-message', callback)
})
