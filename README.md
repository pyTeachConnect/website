pyTeachConnect
=================

简洁的静态演示页面，用于展示 pyTeachConnect 项目主页样式与交互。该仓库仅包含前端静态资源（HTML/CSS/JS），适合作为项目介绍、文档首页或演示页面。

主要内容
- index.html：页面结构与语义化内容
- style.css：重构后的响应式样式（使用 Inter 字体、渐变与卡片风格）
- script.js：平滑滚动、移动端导航切换、视口动画等交互增强

主要功能与改进
- 响应式布局：在桌面/平板/手机上都有良好表现
- 现代化视觉：主色/强调色变量、卡片阴影、按钮渐变与微交互
- 无侵入依赖：仅使用 Google Fonts 与 Font Awesome CDN
- 无障碍增强：语义化标签、ARIA 支持与键盘可访问性基础

快速开始
1. 直接打开本地文件：双击 index.html 在浏览器中查看。 
2. 建议使用本地静态服务器：
   - 使用 Python 3：
     python -m http.server 8000
     然后访问 http://localhost:8000

定制
- 常量颜色与字体在 style.css 的 :root 中定义，可直接修改以适配品牌色。
- 替换 hero 区图片为项目截图或设计稿，修改 index.html 中 img 的 src 即可。

贡献
欢迎提交 Issue 或 PR：
- 报告样式或交互问题
- 提供更多内容模块（示例配置、部署指南、截图）

许可证
- 本示例页面不包含第三方字体/图标的本地副本。请遵循所用 CDN（Google Fonts、Font Awesome）的使用条款。

Contact
- 仓库主页：https://github.com/pyteachconnect


