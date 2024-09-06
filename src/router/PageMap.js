import Home from "../page/home";
import Assets from "../page/assets";
import ImageViewer from "../page/assets/viewer/image";
import SoundViewer from "../page/assets/viewer/sound";
import TextViewer from "../page/assets/viewer/text";
import UnknownViewer from "../page/assets/viewer/unknown";

export const PAGE_MAP = {
    // 软件主页面
    home: {path: "/", element: <Home/>},

    // Mc资源页
    assets: {path: "/assets", element: <Assets/>},
    // 图片查看器
    imageViewer: {path: "/assets/image", element: <ImageViewer/>},
    // 音频查看器
    soundViewer: {path: "/assets/sound", element: <SoundViewer/>},
    // 文本查看器
    textViewer: {path: "/assets/text", element: <TextViewer/>},
    // 无法查看的资源
    unknownViewer: {path: "/assets/unknown", element: <UnknownViewer/>},


}