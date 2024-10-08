import React, {useEffect, useRef, useState} from 'react';
import {useLocation} from "react-router";
import {ImageViewerStyle} from "./style";
import {inRectangularRange} from "../../../../util/ShapeUtil";
import {percentage} from "../../../../util/SMath";

// 一次缩放的倍率
const UNIT_ZOOM = 0.5;

// 最小缩放倍率
const ZOOM_MIN = 0.3;
// 最大缩放倍率(非百分比，1=100%)
const ZOOM_MAX = 100;
// 最大的合适缩放倍率
const ZOOM_FITTING_MAX = 10;

//--- 下面的变量放外部是避免页面更新导致变量重置

// 当前图片的缩放倍率
let zoomMagnification = 1;
// 图片元素的真实尺寸（显示的尺寸）
const imgRefRealSize = {x: 0, y: 0};
// 图片元素的偏移量（按光标缩放时产生的）
const imgRefOffset = {left: 50, top: 50};

const ImageViewer = () => {
    // 获取路由信息 - 获取传入的参数
    const location = useLocation();
    const {state} = location;

    // 鼠标左键按下的坐标与图片左上角的坐标差
    const offsetPosition = {x: 0, y: 0};

    // 查看器的根元素
    const viewerRootRef = useRef();
    // img
    const imgRef = useRef();

    // 图片实际展示时左上角的坐标
    const [position, setPosition] = useState({x: 0, y: 0});
    // 当前图片缩放倍率的展示数值
    const [zoomText, setZoomText] = useState(zoomMagnification);
    // 图片是否以平滑模式显示
    const [smoothImg, setSmoothImg] = useState(true);

    useEffect(() => {
        initImg();
        return () => {
            removeMouseListener();
        }
    }, []);

    // 初始化图片查看器
    const initImg = () => {
        console.log("[ImageViewer] img changed")

        removeMouseListener();

        // 监听鼠标滚动
        viewerRootRef.current.onwheel = handleMouseWheel;

        // 设置图片显示模式
        setImgSmoothMode()

        // 计算图片大小，如果图片超过查看区域高度，则缩小图片
        const fittingZoom = getFittingZoom();

        // 重置缩放
        setImgZoom(fittingZoom)

        // 重置图片位置
        resetImgPosition();
        // 将图片展示坐标设置为图片当前位置，防止第一次移动导致的图片偏移
        setPosition({x: imgRef.current.offsetLeft, y: imgRef.current.offsetTop})
    }

    //--- 事件处理方法

    // 鼠标滚轮滚动
    const handleMouseWheel = (e) => {
        // 获取滚轮滚动方向 | ture=向上 false=向下
        const up = e.deltaY < 0;
        // 获取鼠标坐标
        const arrowPosition = {x: e.clientX, y: e.clientY};

        let latestZoom;
        if (up) {
            latestZoom = zoomMagnification * (1 + UNIT_ZOOM);
        } else {
            latestZoom = zoomMagnification * (1 - UNIT_ZOOM);
        }

        // 获取img组件信息
        const imgRect = imgRef.current.getBoundingClientRect();

        // 判断光标是否在图片上
        const overImg = inRectangularRange(arrowPosition, {
            left: imgRect.x,
            top: imgRect.y,
            width: imgRect.width,
            height: imgRect.height
        });

        // 当光标在img里时
        if (overImg) {
            // 计算出当前位置的百分比
            const pX = percentage(arrowPosition.x - imgRect.x, imgRect.width);
            const pY = percentage(arrowPosition.y - imgRect.y, imgRect.height);

            imgRefOffset.left = pX;
            imgRefOffset.top = pY;
        }


        // 更新缩放倍率
        setImgZoom(latestZoom)
    };

    // 查看器鼠标按下后的移动事件监听器
    const handleMouseMove = (e) => {
        // 计算新的位置 | 鼠标所在坐标 - 鼠标相对图片左上角的偏移值 = 图片左上角应在的坐标
        const x = e.clientX - offsetPosition.x;
        const y = e.clientY - offsetPosition.y;

        // 更新位置
        updateImgPosition(x, y);
        setPosition({x, y});
    };

    // 鼠标按下移动后的抬起事件监听器
    const handleMouseUp = () => {
        viewerRootRef.current.style.cursor = "default";

        // 移除鼠标移动和释放的监听
        removeMouseListener()
    };

    // 移除鼠标移动和释放的监听
    const removeMouseListener = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    }


    //--- 功能方法

    // 设置图片是否平滑显示
    const setImgSmoothMode = (smooth) => {
        // 如果未传值则用state中的值更新显示组件
        if (undefined === smooth) {
            smooth = smoothImg;
        } else {
            setSmoothImg(smooth);
        }

        if (smooth) {
            imgRef.current.style.imageRendering = "-webkit-optimize-contrast";
        } else {
            imgRef.current.style.imageRendering = "pixelated";
        }
    }

    // 将平滑模式状态取反
    const changeSmoothMode = () => {
        setImgSmoothMode(!smoothImg);
    }

    // 获取平滑模式状态的显示文本
    const getSmoothModeText = (mode) => {
        if (undefined === mode) {
            mode = smoothImg;
        }

        if (mode) {
            return "平滑";
        } else {
            return "像素";
        }
    }

    // 设置图片缩放倍率
    const setImgZoom = (zoom) => {
        // 倍率校验
        if (zoom < ZOOM_MIN) {
            zoom = ZOOM_MIN;
        } else if (zoom > ZOOM_MAX) {
            zoom = ZOOM_MAX;
        }

        // 计算图片显示的尺寸
        imgRefRealSize.x = imgRef.current.clientWidth * zoom;
        imgRefRealSize.y = imgRef.current.clientHeight * zoom;

        zoomMagnification = zoom;
        setZoomText(zoom);

        // 更新视图
        updateImgZoom();
    }

    // 更新图片缩放 num:缩放倍率 大于1则放大，小于1则缩小
    const updateImgZoom = () => {
        imgRef.current.style.transform = `scale(${zoomMagnification})`;
        imgRef.current.style.transformOrigin = `${imgRefOffset.left}% ${imgRefOffset.top}%`;
    }

    /**
     * 计算合适的缩放比
     *
     * 原理：设图片宽-显示区域宽=x , 图片高-显示区域高=y 取差值最大的算出缩放倍率，这样就不会超出显示范围
     */
    const getFittingZoom = () => {
        // 宽高的相差值
        let differenceValue = {x: 0, y: 0};

        // img父元素宽高
        const viewerWidth = viewerRootRef.current.clientWidth;
        const viewerHeight = viewerRootRef.current.clientHeight;
        // img宽高
        const imgSize = getImgSize();

        // 计算差值
        differenceValue.x = imgSize.width - viewerWidth;
        differenceValue.y = imgSize.height - viewerHeight;

        // 得出相差最大的方向
        let finalZoom;
        if (differenceValue.x > differenceValue.y) {
            finalZoom = viewerWidth / imgSize.width;
        } else {
            finalZoom = viewerHeight / imgSize.height;
        }


        // 保留2未小数(四舍五入)
        const zoomRound = Math.round(finalZoom * 100) / 100;
        // 判断是否超过最大合适缩放倍率，超过则返回最大合适倍率，否则返回计算的值
        return ZOOM_FITTING_MAX < zoomRound ? ZOOM_FITTING_MAX : zoomRound;
    };

    // 获取图片的宽高(图片的尺寸，不是视觉上的尺寸)
    const getImgSize = () => {
        return {
            width: imgRef.current.clientWidth,
            height: imgRef.current.clientHeight
        }
    }

    // 更新图片移动位置
    const updateImgPosition = (x, y) => {
        imgRef.current.style.left = x + "px";
        imgRef.current.style.top = y + "px";
    }

    // 重置图片移动位置
    const resetImgPosition = () => {
        // img父元素宽高
        const viewerWidth = viewerRootRef.current.clientWidth;
        const viewerHeight = viewerRootRef.current.clientHeight;
        // img宽高
        const imgSize = getImgSize();

        // 计算中心位置
        const imgLeft = (viewerWidth - imgSize.width) / 2;
        const imgTop = (viewerHeight - imgSize.height) / 2;

        imgRefOffset.left = 50;
        imgRefOffset.top = 50;

        // 重置到中心位置
        updateImgPosition(imgLeft, imgTop);
        // 重置缩放
        updateImgZoom()
    };

    // 阻止事件冒泡
    const stopPropagation = (e) => e.stopPropagation();


    //--- 组件互动

    // 查看器鼠标按下
    const mouseDown = (e) => {
        viewerRootRef.current.style.cursor = "pointer";

        // 将鼠标按下坐标 - 原图片左上角坐标 = 与图片左上角相差多远
        offsetPosition.x = e.clientX - position.x;
        offsetPosition.y = e.clientY - position.y;

        // 添加全局鼠标移动和鼠标释放监听
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        // 阻止默认行为(避免出现图片的拖动鬼影)
        e.preventDefault();
    }

    // 重置图片查看的变换参数
    const resetImg = (e) => {
        initImg();
        e.stopPropagation();
    }

    return (
        <ImageViewerStyle ref={viewerRootRef} onMouseDown={mouseDown}>
            <img ref={imgRef} src={state.imgPath} alt={"?"} onLoad={initImg}/>

            <div className={"imgControlPanel"}>
                <button onClick={resetImg} onMouseDown={stopPropagation}>
                    重置
                </button>
                <button onClick={changeSmoothMode} onMouseDown={stopPropagation}>
                    {getSmoothModeText(!smoothImg)}
                </button>
            </div>
            <span>{getSmoothModeText()} | {Math.round(zoomText * 100)}%</span>
        </ImageViewerStyle>
    );
};

export default ImageViewer;