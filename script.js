// --------------- 新增：从 favicon 提取主色并应用为主题色 ---------------
function rgbToHex(r, g, b) {
    return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}

function mixRgb(a, b, t) {
    return [
        Math.round(a[0] * (1 - t) + b[0] * t),
        Math.round(a[1] * (1 - t) + b[1] * t),
        Math.round(a[2] * (1 - t) + b[2] * t)
    ];
}

function sampleImageAverage(src, callback) {
    try {
        const img = new Image();
        img.crossOrigin = 'Anonymous';
        // 防止缓存，确保新加载
        img.src = src + '?_=' + Date.now();
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const size = 32;
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, size, size);
            const data = ctx.getImageData(0, 0, size, size).data;
            let r = 0, g = 0, b = 0, count = 0;
            for (let i = 0; i < data.length; i += 4) {
                const alpha = data[i + 3];
                if (alpha < 32) continue; // 忽略透明像素
                r += data[i];
                g += data[i + 1];
                b += data[i + 2];
                count++;
            }
            if (count === 0) return callback(null);
            r = Math.round(r / count);
            g = Math.round(g / count);
            b = Math.round(b / count);
            callback([r, g, b]);
        };
        img.onerror = () => callback(null);
    } catch (err) {
        callback(null);
    }
}

function applyThemeFromFavicon() {
    const faviconPath = 'assets/favicon.png';
    sampleImageAverage(faviconPath, (rgb) => {
        if (!rgb) return; // 失败则保留默认
        const primaryHex = rgbToHex(rgb[0], rgb[1], rgb[2]);
        // 生成一个强调色（与橙色混合以保留可用的对比感）
        const orange = [249, 115, 22];
        const accentRgb = mixRgb(rgb, orange, 0.28);
        const accentHex = rgbToHex(accentRgb[0], accentRgb[1], accentRgb[2]);

        document.documentElement.style.setProperty('--primary', primaryHex);
        document.documentElement.style.setProperty('--accent', accentHex);

        // 更新 meta theme-color（移动设备顶部颜色）
        const meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', primaryHex);
    });
}

// 在脚本加载时尝试应用（脚本放在 body 末尾，DOM 已就绪）
applyThemeFromFavicon();

// --------------- 下面为已有交互逻辑（保留并放置在同一文件中） ---------------

// 平滑滚动并在移动端关闭菜单
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (!href || href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            const navLinks = document.querySelector('.nav-links');
            const navToggle = document.querySelector('.nav-toggle');
            if (navLinks && navLinks.classList.contains('show')) {
                navLinks.classList.remove('show');
                if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
});

// 为所有功能卡片添加 hover/leave 效果
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
        card.style.boxShadow = '0 18px 40px rgba(8,15,30,0.08)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.boxShadow = '';
    });
});

// 导航栏滚动效果
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (!navbar) return;
    if (window.scrollY > 30) {
        navbar.style.boxShadow = '0 10px 30px rgba(8,15,30,0.08)';
        navbar.style.transform = 'translateY(0)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

// 移动导航切换与外部点击关闭
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        navLinks.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            navLinks.classList.remove('show');
            navToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// 进入视口动画（IntersectionObserver）
const io = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-up, .feature-card, .hero-img').forEach(el => {
    el.classList.add('fade-up');
    io.observe(el);
});

