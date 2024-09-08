import React, {useEffect, useState} from 'react';
import {AssetsStyle} from "./style";
import Description from "../../components/description";
import Tag from "../../components/tag";
import {Outlet} from "react-router";
import {fileSizeAutoUnit, getFileType} from "../../util/McFileUtil";
import {useNavigate} from "react-router-dom";
import {PAGE_MAP} from "../../router/PageMap";
import useDebounce from "../../components/useDebounce";
import {FixedSizeList as List} from "react-window";
import useStore from "../../store/rootStore";

const DEFAULT_ASSET_INFO = {
    assetName: "-",
    fileName: "-",
    fileHash: "-",
    fileSize: "-",
    fileCreationTime: "-",
    fileType: "-",
    path: "-",
    data: "-"
};

// 搜索文本最大长度
const SEARCH_MAX_LENGTH = 32;

const Assets = () => {
    const {AssetStore} = useStore();

    const navigate = useNavigate();

    // 资源名称列表 - 用于展示
    const [filteredAssetList, setFilteredAssetList] = useState([]);
    // 资产列表选中资产的索引
    const [selectedIndex, setSelectedIndex] = useState(null);

    // 当前预览的资源信息
    const [assetInfo, setAssetInfo] = useState(DEFAULT_ASSET_INFO)

    // 被要搜索的文本
    const [searchText, setSearchText] = useState("");
    const debounce = useDebounce(searchText, 200);

    useEffect(() => {
        if (AssetStore.assetsIsNull()) {
            refreshAssetList();
        }
    }, []);

    // 搜索防抖
    useEffect(() => {
        const assetNames = Object.keys(AssetStore.getAssets())
        setFilteredAssetList(assetNames.filter(v => v.includes(searchText)));
    }, [debounce]);

    // 获取资源预览区域的默认文本，如果正在预览资源则灭有默认文本
    const browseDefaultText = () => {
        if (DEFAULT_ASSET_INFO.assetName === assetInfo.assetName) {
            return <div>资源预览</div>
        }
    };

    // 刷新资源列表
    const refreshAssetList = async () => {
        console.log("[Asset] read assets index...")

        const assetsJson = await window.ElectronAPI.readAssetsIndex();
        if (!assetsJson) {
            console.error("读取资源Json文件失败");
            return;
        }

        const assets = JSON.parse(assetsJson);

        AssetStore.setAssets(assets.objects);
        setFilteredAssetList(Object.keys(assets.objects));
    }

    // 过滤资源列表
    const searchAssets = (e) => {
        setSearchText(e.target.value);
    }

    // 查看资源
    const viewAsset = async (assetName, index) => {
        setSelectedIndex(index);

        // 资源存储时的Hash文件名
        const assetHash = AssetStore.getAssets()[assetName];
        console.log(assetName);

        // 读取资源文件信息
        const assetInfo = await window.ElectronAPI.readAssets(assetHash.hash);
        if (!assetInfo) {
            console.error("读取资源文件失败");
        }

        // 处理文件创建时间
        let fileCreationTime = assetInfo.fileCreationTime;
        if (!fileCreationTime || !(fileCreationTime instanceof Date)) {
            fileCreationTime = "-";
        } else {
            fileCreationTime = fileCreationTime.toLocaleDateString("zh-CN", {timeZone: "Asia/Shanghai"});
        }

        assetInfo.assetName = assetName;
        assetInfo.fileCreationTime = fileCreationTime;
        assetInfo.fileType = getFileType(assetName);
        assetInfo.fileSize = fileSizeAutoUnit(assetInfo.fileSize);
        setAssetInfo(assetInfo || DEFAULT_ASSET_INFO);

        // 预览资源部分

        // 判断文件类型并路由到对应查看器子页面
        switch (getFileType(assetName)) {
            case "image":
                navigate(PAGE_MAP.imageViewer.path, {state: {imgPath: assetInfo.path}});
                break;
            case "sound":
                navigate(PAGE_MAP.soundViewer.path, {state: {filePath: assetInfo.path}});
                break;
            case "text":
                navigate(PAGE_MAP.textViewer.path, {state: {text: assetInfo.data}});
                break;
            default:
                navigate(PAGE_MAP.unknownViewer.path);
                break;
        }
    }

    // 导出资源文件
    const exportAsset = () => {
        console.log(assetInfo.assetName);
        window.ElectronAPI.exportAsset(assetInfo.assetName);
    }

    // 获取资源列表选中项的样式
    const getCheckedStyle = (style, index) => {
        // 最新样式
        let latestStyle = {...style};

        if (index === selectedIndex) {
            latestStyle["color"] = 'white';
            latestStyle["backgroundColor"] = 'darkorange';
        }

        return latestStyle;
    }

    // 虚拟列表的项
    const Row = ({index, style}) => {
        const assetName = filteredAssetList[index];
        return (
            <li tabIndex={0}
                onClick={() => viewAsset(assetName, index)}
                key={index}
                style={getCheckedStyle(style, index)}>
                [{index + 1}]&nbsp;{assetName}
            </li>
        )
    };

    return (
        <AssetsStyle>
            <div className={"assetsList"}>
                <h4>资源列表</h4>
                <input type="text" placeholder={"搜索"} maxLength={SEARCH_MAX_LENGTH} onChange={searchAssets}/>

                <List
                    className={"ulList"}
                    height={9999}
                    itemCount={filteredAssetList.length}
                    itemSize={40}>
                    {Row}
                </List>
                <button className={"refreshAssetList"} onClick={refreshAssetList}>刷新列表</button>
            </div>

            <div className={"assetInfo"}>
                <div className={"assetOverview"}>
                    <Description name={"资源名称"} content={assetInfo.assetName} clickCopy={true}/>
                    <Description name={"文件类型"} content={<Tag text={assetInfo.fileType}/>} inline={true}/>
                    <Description name={"文件名称"} content={assetInfo.fileName} inline={true}/>
                    <Description name={"SHA-1"} content={assetInfo.fileHash} inline={true}/>
                    <Description name={"占用空间"} content={assetInfo.fileSize} inline={true}/>
                    <Description name={"创建时间"}
                                 content={assetInfo.fileCreationTime}
                                 inline={true}/>

                    <button className={"assetSaveAs"} onClick={exportAsset}>导出</button>
                </div>
                <div className={"assetBrowseArea"}>
                    <Outlet/>
                    {browseDefaultText()}
                </div>
            </div>
        </AssetsStyle>
    );
};

export default Assets;