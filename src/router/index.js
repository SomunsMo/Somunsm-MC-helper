import Error404 from "../page/error/404";
import {PAGE_MAP} from "./PageMap";

export const RouterMap = [
    {
        path: PAGE_MAP.home.path,
        element: PAGE_MAP.home.element,
        children: [
            {
                path: PAGE_MAP.assets.path,
                element: PAGE_MAP.assets.element,
                children: [
                    {path: PAGE_MAP.imageViewer.path, element: PAGE_MAP.imageViewer.element},
                    {path: PAGE_MAP.soundViewer.path, element: PAGE_MAP.soundViewer.element},
                    {path: PAGE_MAP.textViewer.path, element: PAGE_MAP.textViewer.element},
                    {path: PAGE_MAP.unknownViewer.path, element: PAGE_MAP.unknownViewer.element},
                ]
            },
            {path: 'setting', element: <Setting/>},
            {path: 'about', element: <About/>}

            {path: PAGE_MAP.settings.path, element: PAGE_MAP.settings.element},

            {path: PAGE_MAP.about.path, element: PAGE_MAP.about.element}
        ]
    },
    // 重定向
    {path: 'home', redirectTo: '/'},
    // 404找不到
    {path: '*', element: <Error404/>}
];