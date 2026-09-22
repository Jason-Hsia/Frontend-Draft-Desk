# 草图桌 Frontend Draft Desk

一个用于快速绘制前端页面布局的浏览器草图工具。无需安装依赖，打开网页即可拖放组件、编辑文字、调整尺寸，并把草图导出给 AI 继续实现。

**在线体验：** [sketchdesk-frontend-0916.jasonhsia1023.chatgpt.site](https://sketchdesk-frontend-0916.jasonhsia1023.chatgpt.site)

## 功能

- 12 种基础元素、30 种界面组件和 51 个常用线框图标
- 元素拖动、缩放、复制、删除、对齐和图层排序
- 文字、颜色、边框、圆角、透明度及组件状态编辑
- 自定义画布宽高，支持最高 20,000px 的长网页草图
- 网格、吸附、缩放、撤销与重做
- 浏览器自动保存，并支持 JSON 草图文件导入、导出
- 导出完整 PNG 草图和可直接交给 AI 的布局说明
- 桌面与手机界面适配

## 本地运行

项目由原生 HTML、CSS 和 JavaScript 构成，没有安装步骤。进入项目目录后启动任意静态文件服务器：

```bash
python -m http.server 4173 --directory dist
```

然后访问 [http://localhost:4173](http://localhost:4173)。也可以直接打开 `dist/index.html` 使用主要功能。

## 项目结构

```text
dist/
├── index.html                 # 编辑器页面
├── style.css                 # 界面样式与响应式布局
├── app.js                    # 画布、编辑、保存和导出逻辑
├── component-library.js      # 基础元素和界面组件定义
├── component-renderer.js     # SVG 组件渲染
├── icon-library.js           # 常用图标
└── ICON-LICENSE.txt          # 图标许可说明
```

## 数据与隐私

草图默认保存在当前浏览器的本地存储中，不会上传到服务器。需要跨浏览器或跨设备继续编辑时，请使用“保存文件”导出 JSON 草图。

## 许可

项目代码采用 [MIT License](LICENSE)。内置图标来自 [Lucide](https://lucide.dev/)，图标许可内容见 `dist/ICON-LICENSE.txt`。

