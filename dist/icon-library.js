/*
ISC License

Copyright (c) 2026 Lucide Icons and Contributors

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

---

The following Lucide icons are derived from the Feather project:

airplay, alert-circle, alert-octagon, alert-triangle, aperture, arrow-down-circle, arrow-down-left, arrow-down-right, arrow-down, arrow-left-circle, arrow-left, arrow-right-circle, arrow-right, arrow-up-circle, arrow-up-left, arrow-up-right, arrow-up, at-sign, calendar, cast, check, chevron-down, chevron-left, chevron-right, chevron-up, chevrons-down, chevrons-left, chevrons-right, chevrons-up, circle, clipboard, clock, code, columns, command, compass, corner-down-left, corner-down-right, corner-left-down, corner-left-up, corner-right-down, corner-right-up, corner-up-left, corner-up-right, crosshair, database, divide-circle, divide-square, dollar-sign, download, external-link, feather, frown, hash, headphones, help-circle, info, italic, key, layout, life-buoy, link-2, link, loader, lock, log-in, log-out, maximize, meh, minimize, minimize-2, minus-circle, minus-square, minus, monitor, moon, more-horizontal, more-vertical, move, music, navigation-2, navigation, octagon, pause-circle, percent, plus-circle, plus-square, plus, power, radio, rss, search, server, share, shopping-bag, sidebar, smartphone, smile, square, table-2, tablet, target, terminal, trash-2, trash, triangle, tv, type, upload, x-circle, x-octagon, x-square, x, zoom-in, zoom-out

The MIT License (MIT) (for the icons listed above)

Copyright (c) 2013-present Cole Bemis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

*/
const iconLibrary = {
  "home": {
    "name": "首页",
    "group": "导航",
    "keywords": "house",
    "paths": "<path d=\"M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8\" />\n  <path d=\"M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z\" />"
  },
  "menu": {
    "name": "菜单",
    "group": "导航",
    "keywords": "menu",
    "paths": "<path d=\"M4 5h16\" />\n  <path d=\"M4 12h16\" />\n  <path d=\"M4 19h16\" />"
  },
  "search": {
    "name": "搜索",
    "group": "导航",
    "keywords": "search",
    "paths": "<path d=\"m21 21-4.34-4.34\" />\n  <circle cx=\"11\" cy=\"11\" r=\"8\" />"
  },
  "arrow": {
    "name": "向右箭头",
    "group": "导航",
    "keywords": "arrow-right",
    "paths": "<path d=\"M5 12h14\" />\n  <path d=\"m12 5 7 7-7 7\" />"
  },
  "back": {
    "name": "向左箭头",
    "group": "导航",
    "keywords": "arrow-left",
    "paths": "<path d=\"m12 19-7-7 7-7\" />\n  <path d=\"M19 12H5\" />"
  },
  "up": {
    "name": "向上箭头",
    "group": "导航",
    "keywords": "arrow-up",
    "paths": "<path d=\"m5 12 7-7 7 7\" />\n  <path d=\"M12 19V5\" />"
  },
  "down": {
    "name": "展开",
    "group": "导航",
    "keywords": "chevron-down",
    "paths": "<path d=\"m6 9 6 6 6-6\" />"
  },
  "external": {
    "name": "外部链接",
    "group": "导航",
    "keywords": "external-link",
    "paths": "<path d=\"M15 3h6v6\" />\n  <path d=\"M10 14 21 3\" />\n  <path d=\"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6\" />"
  },
  "more": {
    "name": "更多",
    "group": "导航",
    "keywords": "ellipsis",
    "paths": "<circle cx=\"12\" cy=\"12\" r=\"1\" />\n  <circle cx=\"19\" cy=\"12\" r=\"1\" />\n  <circle cx=\"5\" cy=\"12\" r=\"1\" />"
  },
  "plus": {
    "name": "添加",
    "group": "操作",
    "keywords": "plus",
    "paths": "<path d=\"M5 12h14\" />\n  <path d=\"M12 5v14\" />"
  },
  "close": {
    "name": "关闭",
    "group": "操作",
    "keywords": "x",
    "paths": "<path d=\"M18 6 6 18\" />\n  <path d=\"m6 6 12 12\" />"
  },
  "check": {
    "name": "确认",
    "group": "操作",
    "keywords": "check",
    "paths": "<path d=\"M20 6 9 17l-5-5\" />"
  },
  "edit": {
    "name": "编辑",
    "group": "操作",
    "keywords": "pencil",
    "paths": "<path d=\"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z\" />\n  <path d=\"m15 5 4 4\" />"
  },
  "trash": {
    "name": "删除",
    "group": "操作",
    "keywords": "trash-2",
    "paths": "<path d=\"M10 11v6\" />\n  <path d=\"M14 11v6\" />\n  <path d=\"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6\" />\n  <path d=\"M3 6h18\" />\n  <path d=\"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\" />"
  },
  "copy": {
    "name": "复制",
    "group": "操作",
    "keywords": "copy",
    "paths": "<rect width=\"14\" height=\"14\" x=\"8\" y=\"8\" rx=\"2\" ry=\"2\" />\n  <path d=\"M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2\" />"
  },
  "download": {
    "name": "下载",
    "group": "操作",
    "keywords": "download",
    "paths": "<path d=\"M12 15V3\" />\n  <path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\" />\n  <path d=\"m7 10 5 5 5-5\" />"
  },
  "upload": {
    "name": "上传",
    "group": "操作",
    "keywords": "upload",
    "paths": "<path d=\"M12 3v12\" />\n  <path d=\"m17 8-5-5-5 5\" />\n  <path d=\"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4\" />"
  },
  "share": {
    "name": "分享",
    "group": "操作",
    "keywords": "share-2",
    "paths": "<circle cx=\"18\" cy=\"5\" r=\"3\" />\n  <circle cx=\"6\" cy=\"12\" r=\"3\" />\n  <circle cx=\"18\" cy=\"19\" r=\"3\" />\n  <line x1=\"8.59\" x2=\"15.42\" y1=\"13.51\" y2=\"17.49\" />\n  <line x1=\"15.41\" x2=\"8.59\" y1=\"6.51\" y2=\"10.49\" />"
  },
  "save": {
    "name": "保存",
    "group": "操作",
    "keywords": "save",
    "paths": "<path d=\"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z\" />\n  <path d=\"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7\" />\n  <path d=\"M7 3v4a1 1 0 0 0 1 1h7\" />"
  },
  "filter": {
    "name": "筛选",
    "group": "操作",
    "keywords": "list-filter",
    "paths": "<path d=\"M2 5h20\" />\n  <path d=\"M6 12h12\" />\n  <path d=\"M9 19h6\" />"
  },
  "refresh": {
    "name": "刷新",
    "group": "操作",
    "keywords": "refresh-cw",
    "paths": "<path d=\"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8\" />\n  <path d=\"M21 3v5h-5\" />\n  <path d=\"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16\" />\n  <path d=\"M8 16H3v5\" />"
  },
  "user": {
    "name": "用户",
    "group": "沟通",
    "keywords": "user-round",
    "paths": "<circle cx=\"12\" cy=\"8\" r=\"5\" />\n  <path d=\"M20 21a8 8 0 0 0-16 0\" />"
  },
  "users": {
    "name": "用户组",
    "group": "沟通",
    "keywords": "users",
    "paths": "<path d=\"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2\" />\n  <path d=\"M16 3.128a4 4 0 0 1 0 7.744\" />\n  <path d=\"M22 21v-2a4 4 0 0 0-3-3.87\" />\n  <circle cx=\"9\" cy=\"7\" r=\"4\" />"
  },
  "mail": {
    "name": "邮件",
    "group": "沟通",
    "keywords": "mail",
    "paths": "<path d=\"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7\" />\n  <rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\" />"
  },
  "message": {
    "name": "消息",
    "group": "沟通",
    "keywords": "message-circle",
    "paths": "<path d=\"M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719\" />"
  },
  "bell": {
    "name": "通知",
    "group": "沟通",
    "keywords": "bell",
    "paths": "<path d=\"M10.268 21a2 2 0 0 0 3.464 0\" />\n  <path d=\"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326\" />"
  },
  "phone": {
    "name": "电话",
    "group": "沟通",
    "keywords": "phone",
    "paths": "<path d=\"M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384\" />"
  },
  "heart": {
    "name": "喜欢",
    "group": "沟通",
    "keywords": "heart",
    "paths": "<path d=\"M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5\" />"
  },
  "star": {
    "name": "星标",
    "group": "沟通",
    "keywords": "star",
    "paths": "<path d=\"M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z\" />"
  },
  "file": {
    "name": "文档",
    "group": "内容",
    "keywords": "file-text",
    "paths": "<path d=\"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z\" />\n  <path d=\"M14 2v5a1 1 0 0 0 1 1h5\" />\n  <path d=\"M10 9H8\" />\n  <path d=\"M16 13H8\" />\n  <path d=\"M16 17H8\" />"
  },
  "folder": {
    "name": "文件夹",
    "group": "内容",
    "keywords": "folder",
    "paths": "<path d=\"M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z\" />"
  },
  "image": {
    "name": "图片",
    "group": "内容",
    "keywords": "image",
    "paths": "<rect width=\"18\" height=\"18\" x=\"3\" y=\"3\" rx=\"2\" ry=\"2\" />\n  <circle cx=\"9\" cy=\"9\" r=\"2\" />\n  <path d=\"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21\" />"
  },
  "video": {
    "name": "视频",
    "group": "内容",
    "keywords": "video",
    "paths": "<path d=\"m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5\" />\n  <rect x=\"2\" y=\"6\" width=\"14\" height=\"12\" rx=\"2\" />"
  },
  "music": {
    "name": "音乐",
    "group": "内容",
    "keywords": "music",
    "paths": "<path d=\"M9 18V5l12-2v13\" />\n  <circle cx=\"6\" cy=\"18\" r=\"3\" />\n  <circle cx=\"18\" cy=\"16\" r=\"3\" />"
  },
  "code": {
    "name": "代码",
    "group": "内容",
    "keywords": "code-xml",
    "paths": "<path d=\"m18 16 4-4-4-4\" />\n  <path d=\"m6 8-4 4 4 4\" />\n  <path d=\"m14.5 4-5 16\" />"
  },
  "link": {
    "name": "链接",
    "group": "内容",
    "keywords": "link",
    "paths": "<path d=\"M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71\" />\n  <path d=\"M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71\" />"
  },
  "clipboard": {
    "name": "剪贴板",
    "group": "内容",
    "keywords": "clipboard",
    "paths": "<rect width=\"8\" height=\"4\" x=\"8\" y=\"2\" rx=\"1\" ry=\"1\" />\n  <path d=\"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2\" />"
  },
  "settings": {
    "name": "设置",
    "group": "系统",
    "keywords": "settings",
    "paths": "<path d=\"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915\" />\n  <circle cx=\"12\" cy=\"12\" r=\"3\" />"
  },
  "shield": {
    "name": "安全",
    "group": "系统",
    "keywords": "shield-check",
    "paths": "<path d=\"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z\" />\n  <path d=\"m9 12 2 2 4-4\" />"
  },
  "lock": {
    "name": "锁定",
    "group": "系统",
    "keywords": "lock-keyhole",
    "paths": "<circle cx=\"12\" cy=\"16\" r=\"1\" />\n  <rect x=\"3\" y=\"10\" width=\"18\" height=\"12\" rx=\"2\" />\n  <path d=\"M7 10V7a5 5 0 0 1 10 0v3\" />"
  },
  "eye": {
    "name": "查看",
    "group": "系统",
    "keywords": "eye",
    "paths": "<path d=\"M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0\" />\n  <circle cx=\"12\" cy=\"12\" r=\"3\" />"
  },
  "calendar": {
    "name": "日历",
    "group": "系统",
    "keywords": "calendar-days",
    "paths": "<path d=\"M8 2v3\" />\n  <path d=\"M16 2v3\" />\n  <rect x=\"3\" y=\"3\" width=\"18\" height=\"18\" rx=\"2\" />\n  <path d=\"M3 9h18\" />\n  <path d=\"M8 13h.01\" />\n  <path d=\"M12 13h.01\" />\n  <path d=\"M16 13h.01\" />\n  <path d=\"M8 17h.01\" />\n  <path d=\"M12 17h.01\" />\n  <path d=\"M16 17h.01\" />"
  },
  "clock": {
    "name": "时间",
    "group": "系统",
    "keywords": "clock",
    "paths": "<circle cx=\"12\" cy=\"12\" r=\"10\" />\n  <path d=\"M12 6v6l4 2\" />"
  },
  "pin": {
    "name": "位置",
    "group": "系统",
    "keywords": "map-pin",
    "paths": "<path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\" />\n  <circle cx=\"12\" cy=\"10\" r=\"3\" />"
  },
  "globe": {
    "name": "全球",
    "group": "系统",
    "keywords": "globe",
    "paths": "<circle cx=\"12\" cy=\"12\" r=\"10\" />\n  <path d=\"M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20\" />\n  <path d=\"M2 12h20\" />"
  },
  "cart": {
    "name": "购物车",
    "group": "系统",
    "keywords": "shopping-cart",
    "paths": "<path d=\"m2.05 2.05 1.099-.028a1 1 0 0 1 1.008.815l2.69 14.347A1 1 0 0 0 7.83 18H18\" />\n  <path d=\"M4.563 5h16.435a1 1 0 0 1 .981 1.204l-1.026 6.226A2 2 0 0 1 18.962 14H6.25\" />\n  <circle cx=\"18\" cy=\"20\" r=\"2\" />\n  <circle cx=\"8\" cy=\"20\" r=\"2\" />"
  },
  "payment": {
    "name": "支付",
    "group": "系统",
    "keywords": "credit-card",
    "paths": "<rect width=\"20\" height=\"14\" x=\"2\" y=\"5\" rx=\"2\" />\n  <line x1=\"2\" x2=\"22\" y1=\"10\" y2=\"10\" />\n  <path d=\"M6 14h2\" />"
  },
  "chart": {
    "name": "柱状图",
    "group": "系统",
    "keywords": "chart-no-axes-column",
    "paths": "<path d=\"M5 21v-6\" />\n  <path d=\"M12 21V3\" />\n  <path d=\"M19 21V9\" />"
  },
  "dashboard": {
    "name": "仪表盘",
    "group": "系统",
    "keywords": "layout-dashboard",
    "paths": "<rect width=\"7\" height=\"9\" x=\"3\" y=\"3\" rx=\"1\" />\n  <rect width=\"7\" height=\"5\" x=\"14\" y=\"3\" rx=\"1\" />\n  <rect width=\"7\" height=\"9\" x=\"14\" y=\"12\" rx=\"1\" />\n  <rect width=\"7\" height=\"5\" x=\"3\" y=\"16\" rx=\"1\" />"
  },
  "cloud": {
    "name": "云端",
    "group": "系统",
    "keywords": "cloud",
    "paths": "<path d=\"M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z\" />"
  },
  "printer": {
    "name": "打印",
    "group": "系统",
    "keywords": "printer",
    "paths": "<path d=\"M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2\" />\n  <path d=\"M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6\" />\n  <rect x=\"6\" y=\"14\" width=\"12\" height=\"8\" rx=\"1\" />"
  }
};
