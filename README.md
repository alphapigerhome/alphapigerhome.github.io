# Alphapiger's Blog

一个基于 GitHub Pages 和 Giscus 的简洁个人博客。

## 特性

- **简洁设计**：没有复杂的现代化界面，专注于内容
- **Markdown 支持**：直接用 Markdown 写作
- **评论功能**：集成 Giscus 评论系统
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
│   ├── index.json      # 文章索引
│   ├── first-post.md   # 示例文章
│   └── hello-world.md  # 示例文章
└── README.md           # 说明文档
```

## 配置 Giscus

1. 访问 [Giscus](https://giscus.app/) 
2. 配置你的仓库
3. 替换 `index.html` 中的 `data-repo-id` 和 `data-category-id`

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
