const {ipcMain, shell, dialog, clipboard} = require("electron");
const fsPromises = require("fs").promises;
const fs = require("fs");
const {appConfig, MC_FILE_PATH} = require("./appConfig")
const {stitchingPath} = require("./util/pathUtil")
const {stitchingAssetPath, getAssetNameByAssetName} = require("./util/assetsUtil")
const crypto = require('crypto');

// 处理IPC通信
const ipcHandler = (window, db) => {
    // 最小化窗口处理器
    ipcMain.handle("minimizeWindow", () => window.minimize());

    // 最大化窗口处理器
    ipcMain.handle("maximizeWindow", (e, makeMax) => {
        if (makeMax || true) {
            window.maximize();
        } else {
            window.unmaximize();
        }
    });

    // 退出程序的处理器
    ipcMain.handle("closeWindow", () => window.close());

    // 写文本到剪贴板
    ipcMain.handle("clipboard", (e, text) => clipboard.writeText(text));

    // 用系统默认浏览器打开链接
    ipcMain.handle("openUrl", (e, url) => shell.openExternal(url));

    // 读取软件配置
    ipcMain.handle("getConfigs", () => {
        return appConfig.getConfigs() || {};
    });

    // 选择路径
    ipcMain.handle("getSysDir", async () => {
        const dir = await dialog.showOpenDialog({properties: ['openDirectory']});
        console.log("getDir:" + dir);
        return dir;
    });

    // 保存游戏根目录
    ipcMain.handle("saveGameRootDir", (e, dir) => {
        console.log("saveGameRootDir:" + dir);
        appConfig.setGameRootDir(dir);
        return true;
    });

    // 用系统资源管理器打开Mc根文件夹
    ipcMain.handle('openMcRootDir', async (e) => {
        shell.openPath(appConfig.getGameRootDir()).then(res => {
            console.log(res)
        }).catch(e => {
            console.log("文件夹打开失败：", e);
        })
    });

    // 扫描游戏版本列表
    ipcMain.handle('scanGameVersion', async () => {
        const stitchingResult = stitchingPath(appConfig.getGameRootDir(), MC_FILE_PATH.verDir.path.toString());
        if (!stitchingResult.success) {
            console.error("path error");
            return;
        }

        const dir = stitchingResult.dir;
        console.log("rootDir:" + appConfig.getGameRootDir(), dir);

        // 读取出来的文件夹及文件
        let childFiles;
        try {
            childFiles = await fsPromises.readdir(dir, {withFileTypes: true});
        } catch (e) {
            console.log("read file err:", e);
            return [];
        }

        // 过滤出文件夹（即版本）
        const verDirList = childFiles.filter(d => d.isDirectory());
        // 过滤出版本号，防止其他信息传入渲染层
        return verDirList.map(i => i.name);
    })

    // 保存选择的游戏版本
    ipcMain.handle("saveActiveGameVer", async (e, ver) => {
        console.log("saveActiveGameVer:" + ver);

        const stitchingResult = stitchingPath(appConfig.getGameRootDir(), MC_FILE_PATH.verDir.path, ver, ver + ".json");
        if (!stitchingResult.success) {
            console.error("path error");
            return;
        }

        // 当前游戏版本Json路径
        const verJsonPath = stitchingResult.dir;

        // 读取当前游戏版本对应的资源ID
        let verJsonData;
        verJsonData = await fsPromises.readFile(verJsonPath, 'UTF-8')
        verJsonData = JSON.parse(verJsonData);

        console.log(verJsonData);
        const assetId = verJsonData.assetIndex.id;
        if (!assetId) {
            console.error("assetId not found", assetId);
            return;
        }

        // 存储当前游戏版本
        appConfig.setActiveGameVer(ver);
        // 保存当前游戏版本对应的资源ID
        appConfig.setAssetsId(assetId);

        return true;
    });


    // 读取mc资源索引文件
    ipcMain.handle('readAssetsIndex', async () => {
        const gameDir = appConfig.getGameRootDir();

        const stitchingResult = stitchingPath(gameDir, MC_FILE_PATH.assetsIndex.path, appConfig.getAssetsId());
        if (!stitchingResult.success) {
            console.error("path error");
            return;
        }

        // 补全后缀名
        stitchingResult.dir = stitchingResult.dir + ".json";

        let fileData;
        const filePath = stitchingResult.dir;
        fileData = await fsPromises.readFile(filePath, 'UTF-8');

        // 将索引数据转为对象
        const fileJson = JSON.parse(fileData);

        // 保存资源索引表
        appConfig.setAssetsIndex(fileJson.objects);
        return fileData;
    })

    // 读取mc资源
    ipcMain.handle('readAssets', async (e, fileHash) => {
        const gameDir = appConfig.getGameRootDir();

        const stitchingResult = stitchingAssetPath(gameDir, fileHash);
        if (!stitchingResult.success) {
            console.error("path error");
            return;
        }

        let fileData;
        const filePath = stitchingResult.dir;

        const fileStat = await fsPromises.stat(filePath);

        fileData = await fsPromises.readFile(filePath, "utf-8");
        const hash = crypto.createHash("sha1");

        hash.update(fileData);

        return {
            fileName: fileHash,
            fileHash: hash.digest("hex"),
            fileSize: fileStat.size,
            fileCreationTime: fileStat.ctime,
            path: filePath,
            data: fileData
        };
    });

    // 导出资源文件
    ipcMain.handle('exportAsset', async (e, assetName) => {
        const gameDir = appConfig.getGameRootDir();

        // 用资源名查找资源hash名
        const fileHash = getAssetNameByAssetName(assetName);

        const stitchingResult = stitchingAssetPath(gameDir, fileHash.hash);
        if (!stitchingResult.success) {
            console.error("path error");
            return;
        }

        // 判断资源是否存在
        if (!fs.existsSync(stitchingResult.dir)) {
            console.error("asset not exist");
            return;
        }

        // 用户选定导出位置
        const {canceled, filePath} = await dialog.showSaveDialog({
            title: '导出文件',
            defaultPath: assetName, // 默认文件名为资源名
            buttonLabel: '导出',
            filters: [
                {name: 'All Files', extensions: ['*']}
            ],
            properties: ['createDirectory'] // 允许用户创建不存在的目录
        });

        if (canceled) {
            return;
        }

        // 复制文件到用户选定的位置
        fs.copyFileSync(stitchingResult.dir, filePath);
    });


}
exports.ipcHandler = ipcHandler;