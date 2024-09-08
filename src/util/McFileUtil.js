const JAVA_MC_DIR_INNER_NAME = ".minecraft";

// 校验mc根目录是否正确
export const vailMcDir = (dir) => {
    if (!dir) {
        return false;
    }

    // 使用正则表达式去除末尾的斜杠（如果有的话）
    const trimmedPath = dir.replace(/[\/\\]$/, '');

    // 使用split方法按照路径分隔符分割路径
    // Windows使用'\'或'/'，Mac和Linux使用'/'
    // 正则表达式'[/\\]'同时匹配这两种分隔符
    const parts = trimmedPath.split(/[\/\\]/);

    // 取最里层的文件夹名称
    const innerName = parts[parts.length - 1];
    return JAVA_MC_DIR_INNER_NAME === innerName;
}

// 获取文件格式
export const getFileSuffix = (filename) => {
    if (!filename) {
        return null;
    }

    const sp = filename.split('.')
    return sp[sp.length - 1];
}

// 将文件存储大小转为合适单位
export const fileSizeAutoUnit = (fileSize) => {
    if (fileSize === 0) return '0 Byte';


    const k = 1024; // 或 1000 如果是十进制
    // 单位
    const units = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const dm = decimalPlaces => num => num.toFixed(decimalPlaces).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');

    const i = Math.floor(Math.log(fileSize) / Math.log(k));

    return dm(2)(fileSize / Math.pow(k, i)) + ' ' + units[i];
}

const AssetFileType = Object.freeze({
    UNKNOWN: "unknown",
    IMAGE: "image",
    SOUND: "sound",
    TEXT: "text",
    ZIP: "zip",
})

// 文件后缀
const FILE_TYPE = {
    // 图片
    image: ["bmp", "png", "jpg", "jpeg"],
    // 音频
    sound: ["mp3", "ogg"],
    // 文本
    text: ["txt", "json", "mcmeta"],
    // 压缩包
    zip: ["zip", "7z"],
};

// 获取文件属于什么类型的
export const getFileType = (assetName) => {
    const suffix = getFileSuffix(assetName);
    if (!suffix) {
        return null;
    }

    if (FILE_TYPE.image.includes(suffix)) {
        return AssetFileType.IMAGE;
    } else if (FILE_TYPE.sound.includes(suffix)) {
        return AssetFileType.SOUND;
    } else if (FILE_TYPE.text.includes(suffix)) {
        return AssetFileType.TEXT;
    } else if (FILE_TYPE.zip.includes(suffix)) {
        return AssetFileType.ZIP;
    } else {
        return AssetFileType.UNKNOWN;
    }
}