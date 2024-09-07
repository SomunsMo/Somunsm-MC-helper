const {app, BrowserWindow, screen} = require('electron')
const path = require("node:path");
const {ipcHandler} = require("./ipcHandler")
const BetterSqlite3 = require("better-sqlite3");

const {appConfig} = require("./appConfig");
const checkTableExists = require("./DbUtil");

// 窗口本体
let window;
// 数据库
let db;
// 最大屏幕的尺寸
let maxScreenSize = {x: 0, y: 0, pixels: 0}


// 窗口设定
const createWindow = () => {
    // 获取尺寸最大的屏幕(防止超出边界)
    let screens = screen.getAllDisplays()
    for (let i = 0; i < screens.length; i++) {
        const {workArea} = screens[i];
        const nowScreenPixels = workArea.width * workArea.height;
        if (nowScreenPixels > maxScreenSize.pixels) {
            maxScreenSize = {
                x: workArea.width,
                y: workArea.height,
                pixels: nowScreenPixels
            };
        }
    }

    window = new BrowserWindow({
        minWidth: 800,
        minHeight: 520,
        maxWidth: maxScreenSize.x,
        maxHeight: maxScreenSize.y,
        icon: path.join(__dirname, "../public/favicon.ico"),
        webPreferences:
            {
                // 使用Node的path模块引入预加载层
                preload: path.join(__dirname, "preload.js"),

                // 更严格的渲染与Node隔离，防止渲染层恶意访问Node
                // 当该值为true时，Electron才会将preload.js的对象加载到渲染层中
                // 例如：React的页面 | 原生Html的renderer.js中
                contextIsolation:
                    true,
                // 渲染进程能否访问Node环境（为了安全，建议关闭 |但这不影响渲染层的使用）
                nodeIntegration:
                    false,
                // 禁用同源策略,允许跨域
                webSecurity:
                    false
            },
        // 隐藏标题栏
        frame: false,
        // 禁止窗口拖动成自定义尺寸
        // resizable: false,
        // 隐藏窗口顶部菜单栏
        autoHideMenuBar:
            true,
        // 窗口底色
        // backgroundColor: "red"
    })

    // 判断是否是Dev模式
    if (!app.isPackaged) {
        window.loadURL("http://localhost:4725")
        // 打开开发者工具
        window.webContents.openDevTools();
    } else {
        window.loadFile(path.join(__dirname, "build/index.html"));
    }

    window.webContents.openDevTools();

}

// 创建窗口
app.whenReady().then(() => {
    // 创建窗口
    createWindow()
    // 实例化数据库
    db = new BetterSqlite3(path.join(__dirname, "app.db"));
    // 初始化数据库
    dbInit();
    // 初始化配置
    appConfig.initConfig(db);


    // 调用IPC处理器
    ipcHandler(window, db);


    // 官方示例中表明这是兼容MacOS后台运行用的
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// 对数据库进行初始化
const dbInit = () => {
    console.log("Start initializing DB...");

    // 【软件配置表】
    if (!checkTableExists(db, "app_config")) {
        console.log("[init DB] created app_config table")
        // 表不存在则创建表
        db.exec(`
            CREATE TABLE IF NOT EXISTS app_config
            (
                key          TEXT NOT NULL PRIMARY KEY,
                config_value TEXT
            )
        `);
        // 创建索引
        db.exec(`CREATE INDEX "main"."key_index" ON "app_config" ("key" ASC)`);
    }

    console.log("DB initialization complete");
}