// 博客功能实现
let posts = [];
let currentPost = null;

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    loadPosts();
    setupNavigation();
});

// 设置导航
function setupNavigation() {
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            
            if (href === 'index.html' || href === '#') {
                showPostsList();
            } else if (href === '#about') {
                showAbout();
            }
        });
    });
}

// 加载文章列表
async function loadPosts() {
    try {
        // 使用预加载的数据
        if (window.posts && window.posts.length > 0) {
            posts = window.posts;
            displayPostsList();
            return;
        }
        
        // 备用方案：尝试从文件加载
        const response = await fetch('posts/index.json');
        if (response.ok) {
            const postsData = await response.json();
            posts = postsData;
            displayPostsList();
        } else {
            // 如果没有 index.json，尝试直接加载文章
            await loadPostsDirectly();
        }
    } catch (error) {
        console.error('加载文章列表失败:', error);
        await loadPostsDirectly();
    }
}

// 直接加载文章（备用方案）
async function loadPostsDirectly() {
    const commonPostNames = [
        'first-post.md',
        'hello-world.md',
        'about-me.md',
        'test-post.md'
    ];
    
    posts = [];
    
    for (const filename of commonPostNames) {
        try {
            const response = await fetch(`posts/${filename}`);
            if (response.ok) {
                const content = await response.text();
                const post = parseMarkdownFile(content, filename);
                if (post) {
                    posts.push(post);
                }
            }
        } catch (error) {
            console.log(`文章 ${filename} 不存在`);
        }
    }
    
    // 按日期排序
    posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    displayPostsList();
}

// 解析 Markdown 文件
function parseMarkdownFile(content, filename) {
    const lines = content.split('\n');
    let frontMatter = {};
    let bodyStart = 0;
    
    // 检查是否有 front matter
    if (lines[0] === '---') {
        let frontMatterEnd = -1;
        for (let i = 1; i < lines.length; i++) {
            if (lines[i] === '---') {
                frontMatterEnd = i;
                break;
            }
        }
        
        if (frontMatterEnd > 0) {
            const frontMatterText = lines.slice(1, frontMatterEnd).join('\n');
            frontMatter = parseFrontMatter(frontMatterText);
            bodyStart = frontMatterEnd + 1;
        }
    }
    
    // 提取文章内容
    const body = lines.slice(bodyStart).join('\n').trim();
    
    // 如果没有 front matter，使用默认值
    if (!frontMatter.title) {
        frontMatter.title = filename.replace('.md', '').replace(/-/g, ' ');
    }
    
    if (!frontMatter.date) {
        frontMatter.date = new Date().toISOString().split('T')[0];
    }
    
    // 生成摘要（前100个字符）
    const excerpt = body.replace(/[#*`]/g, '').substring(0, 100) + '...';
    
    return {
        filename: filename,
        title: frontMatter.title,
        date: frontMatter.date,
        excerpt: excerpt,
        content: body,
        ...frontMatter
    };
}

// 解析 front matter
function parseFrontMatter(text) {
    const frontMatter = {};
    const lines = text.split('\n');
    
    lines.forEach(line => {
        const colonIndex = line.indexOf(':');
        if (colonIndex > 0) {
            const key = line.substring(0, colonIndex).trim();
            const value = line.substring(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
            frontMatter[key] = value;
        }
    });
    
    return frontMatter;
}

// 显示文章列表
function displayPostsList() {
    const postsList = document.getElementById('posts-list');
    
    if (posts.length === 0) {
        postsList.innerHTML = '<p>暂无文章。</p>';
        return;
    }
    
    postsList.innerHTML = posts.map(post => `
        <div class="post-item">
            <div class="post-title">
                <a href="#" onclick="loadPost('${post.filename}'); return false;">${post.title}</a>
            </div>
            <div class="post-date">${formatDate(post.date)}</div>
            <div class="post-excerpt">${post.excerpt}</div>
        </div>
    `).join('');
}

// 加载单个文章
async function loadPost(filename) {
    try {
        // 先从已加载的文章中查找
        let post = posts.find(p => p.filename === filename);
        
        if (!post) {
            // 如果没找到，重新加载
            const response = await fetch(`posts/${filename}`);
            if (!response.ok) {
                throw new Error('文章不存在');
            }
            const content = await response.text();
            post = parseMarkdownFile(content, filename);
        }
        
        currentPost = post;
        displayPost();
        showContent();
        
        // 加载评论
        setTimeout(() => {
            loadGiscus();
        }, 100);
        
    } catch (error) {
        console.error('加载文章失败:', error);
        alert('文章加载失败');
    }
}

// 显示文章内容
function displayPost() {
    if (!currentPost) return;
    
    const articleContent = document.getElementById('article-content');
    const html = marked.parse(currentPost.content);
    
    articleContent.innerHTML = `
        <h1>${currentPost.title}</h1>
        <div class="post-date">${formatDate(currentPost.date)}</div>
        <hr>
        <div class="post-body">
            ${html}
        </div>
    `;
}

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// 页面显示控制
function showPostsList() {
    hideAllSections();
    document.getElementById('posts').style.display = 'block';
}

function showContent() {
    hideAllSections();
    document.getElementById('content').style.display = 'block';
}

function showAbout() {
    hideAllSections();
    document.getElementById('about').style.display = 'block';
}

function hideAllSections() {
    document.getElementById('posts').style.display = 'none';
    document.getElementById('content').style.display = 'none';
    document.getElementById('about').style.display = 'none';
}

function backToList() {
    showPostsList();
    currentPost = null;
}

// 处理浏览器前进后退
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.post) {
        loadPost(event.state.post);
    } else {
        showPostsList();
    }
});
