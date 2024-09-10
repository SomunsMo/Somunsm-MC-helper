const {contextBridge, ipcRenderer} = require("electron");

contextBridge.exposeInMainWorld("ElectronAPI", {
    // 窗口控件-最小化
    minimizeWindow: () => ipcRenderer.invoke("minimizeWindow"),
    // 窗口控件-最大化
    maximizeWindow: () => ipcRenderer.invoke("maximizeWindow"),
    // 窗口控件-关闭
    closeWindow: () => ipcRenderer.invoke("closeWindow"),

    // 写文本到剪贴板
    clipboard: (text) => ipcRenderer.invoke("clipboard", text),
    // 用系统默认浏览器打开链接
    openUrl: (url) => ipcRenderer.invoke("openUrl", url),

    // 获取软件及依赖的版本信息
    getAppVer: async () => await ipcRenderer.invoke("getAppVer"),
    // 获取软件配置
    getConfigs: () => ipcRenderer.invoke("getConfigs"),

    // 获取目录
    getSysDir: () => ipcRenderer.invoke('getSysDir'),

    // 保存游戏根目录
    saveGameRootDir: (dir) => ipcRenderer.invoke('saveGameRootDir', dir),

    openMcRootDir: () => ipcRenderer.invoke('openMcRootDir'),

    // 扫描游戏版本列表
    scanGameVersion: () => ipcRenderer.invoke('scanGameVersion'),

    // 保存选择的游戏版本
    saveActiveGameVer: (ver) => ipcRenderer.invoke('saveActiveGameVer', ver),

    // 读取MC资产索引文件
    readAssetsIndex: () => ipcRenderer.invoke('readAssetsIndex'),
    // 读取MC资产文件内容
    readAssets: (fileHash) => ipcRenderer.invoke('readAssets', fileHash),

    // 导出资源文件
    exportAsset: (assetName) => ipcRenderer.invoke('exportAsset', assetName),

});
