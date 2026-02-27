# Alphapiger's Blog

一个基于 GitHub Pages 和 Giscus 的简洁个人博客。

## 特性

- **简洁设计**：没有复杂的现代化界面，专注于内容
- **Markdown 支持**：直接用 Markdown 写作
- **评论功能**：集成 Giscus 评论系统，支持 GitHub 账号登录评论
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

## 配置 Giscus 评论

1. 访问 [giscus.app](https://giscus.app) 并授予 GitHub Discussions 权限。
2. 选择评论仓库（当前为 `alphapigerhome/alphapigerhome.github.io`），并生成 `data-repo-id` 与 `data-category-id`。
3. 将生成的脚本嵌入 `index.html` 的评论区域，或直接复用当前配置。

## Giscus 评论特性

- **GitHub 登录**：依赖 GitHub Discussions，天然防垃圾
- **表情 & Markdown**：继承 GitHub 的互动体验
- **无后台维护**：无需额外服务器或数据库
- **自动同步**：评论即 Discussions，便于管理与备份

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
