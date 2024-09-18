# Somunsm MC Helper

游戏：我的世界(Minecraft) 的一款工具

[创建人B站](https://space.bilibili.com/66932246)

## 适用版本

Java版

## 功能

<ol>
    <li>预览大部分游戏资源文件</li>
    <li>导出游戏资源文件</li>
</ol>

## 技术栈

- React
- NodeJs
- Electron

## 项目结构

```
.
├─electron              Electron相关代码
│  └─util               Electron代码工具包
├─dist                  Electron-builder打包后的存储路径
├─out                   React网页打包后的存储路径
├─public                页面资源(非src中的资源)
└─src                   页面代码
    ├─components        页面组件
    ├─page              页面
    ├─resource          页面所需资源(src无法访问public下的资源)
    ├─router            路由
    ├─store             状态管理
    └─util              工具包

```