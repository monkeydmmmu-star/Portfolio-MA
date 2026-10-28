# Yunpeng · Selected Works

当前内容来源：2026_MA_Portfolio_High quality.pdf（2026-10-28 替换）；139 页全部重新渲染。

完整静态网页作品集，139 页均直接从用户 PDF 渲染，无生成或替换摄影。无需账号、数据库、构建服务或外部 CDN；翻页库已随站点打包。

## 打开网站

最简单：直接打开 index.html（现代 Chrome / Edge）。推荐通过本地静态服务器预览：在本文件所在目录运行 `python -m http.server 8000`，浏览器打开 http://localhost:8000 。没有 Python 可用编辑器的 Live Server。

## 阅读方式

- 桌面封面单页；其后 2–3、4–5，直到 138–139，共 70 个阅读状态。
- 手机依次单页显示 1–139；横屏或放大窗口自动重排，保持当前阅读位置。
- 点击边缘、拖动页角、左右方向键、左右滑动翻页。Home / End 跳到首尾。
- 页码框可直接跳页；页码索引含全部缩略图；双击页面打开大图，可用浏览器缩放查看。
- 全屏按钮在浏览器支持时启用；部分手机浏览器限制全屏，可改用横屏。
- URL `#page=8` 可分享阅读位置。跳到奇数右页时桌面显示其所属双页。
- 主阅读器只加载当前及相邻页面；缩略图使用浏览器延迟加载。已加载图片保留为浏览器缓存。

## GitHub Pages 免费部署

1. 在 GitHub 创建公开仓库，例如 portfolio（免费方案使用公开仓库）。
2. 把本目录内的全部内容上传到仓库根目录：index.html、style.css、app.js、assets、vendor、.nojekyll 等。不要把 ZIP 作为唯一文件上传，也不要多嵌套一层 portfolio 文件夹。
3. 仓库 Settings → Pages → Build and deployment → Deploy from a branch。
4. Branch 选择 main，目录选择 /(root)，Save。
5. 等部署完成，访问 `https://你的用户名.github.io/portfolio/`。

所有资源均使用相对路径，支持仓库子路径。更新同名文件提交后将自动重新部署。

官方说明：https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site

## Cloudflare Pages 免费部署

1. 登录 Cloudflare → Workers & Pages → 创建应用 → Pages → 上传静态资源（Direct Upload；界面名称可能调整）。
2. 输入项目名，将本目录拖入上传区域，确保网站根目录就是 index.html。
3. 点击部署，完成后获得 `https://项目名.pages.dev`。
4. 以后更新，在该项目内创建新部署并重新上传目录内容。

也可以连接 GitHub 仓库：Framework preset 选 None，不需要构建命令；输出目录选根目录（`/` 或界面提供的根目录选项）。

站点 278 个图片文件，最大单文件低于 25 MiB，符合 Pages 静态单文件限制。高清原始 PDF 约 83 MB，超过此限制，因此未放进站点；网站阅读不依赖原 PDF。可免费使用平台提供的子域名，购买独立域名并非必需。

官方说明：https://developers.cloudflare.com/pages/get-started/direct-upload/
限制：https://developers.cloudflare.com/pages/platform/limits/

## 文件与重建

- assets/001.webp–139.webp：2400 px 宽原比例阅读页面，WebP quality 90。
- assets/t001.webp–t139.webp：约 200 px 宽缩略图。
- audit.json：原文件 SHA-256、139 页尺寸、旋转、提取文字与完整配对表。部分中文文字提取存在原 PDF 字体编码问题；页面图片使用 PDF 渲染，不依赖文字提取。
- vendor/page-flip.js：StPageFlip 2.0.7，MIT，许可证附带。
- tools/render.py：重建脚本；安装 `pypdf pypdfium2 Pillow` 后运行 `python tools/render.py 原文件.pdf`。重建脚本同时在 tools/contact.jpg 生成前 15 页校对图。

原 PDF 全部页面 MediaBox 为 396.85 × 453.543 pt；封面后严格按自然页顺序成对，无裁剪、额外白边或装饰性书脊遮挡。渲染与 WebP 为有损压缩，适合网页浏览，不能替代用于印刷的原始 PDF。

网站源码可自由修改；原作品内容版权归原权利人所有。


