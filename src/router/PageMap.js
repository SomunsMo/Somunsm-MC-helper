import Home from "../page/home";
import Assets from "../page/assets";
import ImageViewer from "../page/assets/viewer/image";
import SoundViewer from "../page/assets/viewer/sound";
import TextViewer from "../page/assets/viewer/text";
import UnknownViewer from "../page/assets/viewer/unknown";
import Setting from "../page/setting";
import About from "../page/about";
import Error404 from "../page/error/404";

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


    // 设置
    settings: {path: "/setting", element: <Setting/>},

    // 关于
    about: {path: "/about", element: <About/>},

    // 未找到页面
    notFound: {path: "*", element: <Error404/>}
}