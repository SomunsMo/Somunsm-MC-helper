// 配置项及对应关系（数据库名称、默认值）
const path = require("path");
const CONFIG_MAP = {
    // Mc根目录
    gameRootDir: {dbName: "gameRootDir", defaultValue: null},
    // 当前选择的Mc版本
    activeGameVer: {dbName: "activeGameVer", defaultValue: null},
    // 当前Mc版本对应的资源索引文件的Id
    assetsId: {dbName: "assetsId", defaultValue: null},
};

// MC文件路径，一般情况下都是相对于MC根目录的相对路径
const MC_FILE_PATH = {
    assetsIndex: {path: path.join("assets", "indexes"), desc: "MC资产索引文件路径"},
    assets: {path: path.join("assets", "objects"), desc: "MC资产文件路径(以Hash获取)"},
    verDir: {path: path.join("versions"), desc: "MC版本列表文件夹"},
}

//---

// 从DB读取配置，不存在配置记录则创建记录
const configReadOrCreate = (db, configMap) => {
    let cfgValue = null;

    const cfgRecord = db.prepare(`
        SELECT *
        FROM app_config
        WHERE key = ?
    `).get(configMap.dbName);

    if (cfgRecord) {
        cfgValue = cfgRecord.config_value;
    } else {
        // 如果配置记录不存在，则创建记录
        db.prepare(`
            INSERT INTO app_config (key, config_value)
            VALUES (?, ?)
        `).run(configMap.dbName, configMap.defaultValue);
    }

    return cfgValue;
}

// 更新配置值
const updateConfig = (db, key, v) => {
    db.prepare(`
        UPDATE app_config
        SET config_value = ?
        WHERE key = ?;
    `).run(v, key);
}

/**
 存储私有变量
 在初始化软件配置时，会从DB中读常量"CONFIG_MAP"里所有属性的值，DB中不存在配置记录则会创建。
 */
const privateData = new WeakMap();

// 软件的配置
class AppConfig {

    constructor() {
        privateData.set(this, {
            // 数据库实例
            db: null,
            configs: {
                // 游戏根目录
                gameRootDir: CONFIG_MAP.gameRootDir.defaultValue,
                // 当前选择的游戏版本
                activeGameVer: CONFIG_MAP.activeGameVer.defaultValue,
                // 当前游戏版本对应的资源ID
                assetId: null,
                // 资源名索引表
                assetsIndex: null,
            },
        });
    }

    getGameRootDir() {
        return privateData.get(this).configs.gameRootDir;
    }

    setGameRootDir(dir) {
        privateData.get(this).configs.gameRootDir = dir;
        updateConfig(
            privateData.get(this).db,
            CONFIG_MAP.gameRootDir.dbName,
            dir);
    }

    getActiveGameVer() {
        return privateData.get(this).configs.activeGameVer;
    }

    setActiveGameVer(version) {
        privateData.get(this).configs.activeGameVer = version;
        updateConfig(
            privateData.get(this).db,
            CONFIG_MAP.activeGameVer.dbName,
            version);
    }

    getAssetsId() {
        return privateData.get(this).configs.assetsId;
    }

    setAssetsId(id) {
        privateData.get(this).configs.assetsId = id;
        updateConfig(
            privateData.get(this).db,
            CONFIG_MAP.assetsId.dbName,
            id);
    }

    getAssetsIndex() {
        console.log(privateData.get(this));
        return privateData.get(this).configs.assetsIndex;
    }

    setAssetsIndex(value) {
        privateData.get(this).configs.assetsIndex = value;
    }

//---

    // 初始化应用配置
    initConfig(db, configDir) {
        console.log("start initializing app config...");

        // 存储应用的配置文件夹
        privateData.get(this).configDir = configDir;
        // 设置数据库实例
        privateData.get(this).db = db;

        // 初始化各配置
        Object.keys(CONFIG_MAP).forEach(configKey => {
            privateData.get(this).configs[configKey] = configReadOrCreate(db, CONFIG_MAP[configKey]);
        })

        console.log("app config initialization complete");
    }

    // 获取所有配置
    getConfigs() {
        return {...privateData.get(this).configs}
    }

}

// 单例
const appConfig = new AppConfig();

module.exports = {
    appConfig: appConfig,
    MC_FILE_PATH: MC_FILE_PATH
};
