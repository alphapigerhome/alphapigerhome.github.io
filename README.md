# Alphapiger's Blog

一个基于 GitHub Pages 和 Twikoo（Netlify 后端）的简洁个人博客。

## 特性

- **简洁设计**：没有复杂的现代化界面，专注于内容
- **Markdown 支持**：直接用 Markdown 写作
- **评论功能**：集成 Twikoo 评论系统，要求填写昵称和邮箱并支持通知
- **GitHub Pages**：免费托管，自动部署

## 如何添加文章

1. 在 `posts` 目录下创建新的 `.md` 文件
2. 使用 YAML front matter 定义标题和日期：

```markdown
---
title: "文章标题"
date: "2026-02-26"
---

# 文章内容

这里是文章内容...
```

3. 推送到 GitHub 仓库即可自动发布

## 目录结构

```
├── index.html          # 主页面
├── style.css           # 样式文件
├── blog.js             # 博客功能
├── posts/              # 文章目录
│   ├── first-post.md   # 示例文章
│   └── hello-world.md  # 示例文章
└── README.md           # 说明文档
```

## 配置 Twikoo 评论（Netlify）

1. Fork [Twikoo 仓库](https://github.com/imaegoo/twikoo)。
2. 访问 [Netlify](https://app.netlify.com/start) → Import an existing project → 选择 Fork 后的仓库。
3. Build command 填 `npm run build`，Publish directory 填 `dist`，保存并开始部署。
4. 部署完成后记录 Netlify 生成的域名，例如 `https://euphonious-paprenjak-45e41e.netlify.app`。
5. 在 `index.html` 中将 `twikoo.init` 的 `envId` 替换为你的 Netlify 地址。

## Twikoo 评论特性

- **实名提醒**：评论必须填写昵称与邮箱，便于通知和防垃圾
- **邮箱支持**：填写邮箱后可接收回复通知
- **无广告**：完全干净的评论体验
- **数据可控**：后端运行在你自己的 Netlify 站点，可随时迁移备份

## 部署

1. 推送到 GitHub 仓库
2. 在仓库设置中启用 GitHub Pages
3. 选择 `main` 分支作为源

## 本地测试

可以使用任何本地服务器来测试：

```bash
# 使用 Python
python -m http.server 8000

# 使用 Node.js
npx serve .

# 使用 PHP
php -S localhost:8000
```

然后访问 `http://localhost:8000`
