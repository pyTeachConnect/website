// --------------- 修改：使用固定主题色（保留原交互逻辑） ---------------
(function applyFixedTheme() {
    const primaryHex = '#44b3d3';
    const accentHex = getComputedStyle(document.documentElement).getPropertyValue('--accent') || '#f97316';
    document.documentElement.style.setProperty('--primary', primaryHex);
    // 保持现有 accent（如需改变可在此修改）
    document.documentElement.style.setProperty('--accent', accentHex.trim());
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', primaryHex);
})();

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

// 移动导航切换与外部点击关闭（增强：切换 .open 用于图标旋转动画）
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
    navToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const expanded = navToggle.getAttribute('aria-expanded') === 'true';
        navToggle.setAttribute('aria-expanded', String(!expanded));
        navLinks.classList.toggle('show');
        navToggle.classList.toggle('open'); // 新增：控制旋转样式
    });

    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !navToggle.contains(e.target)) {
            navLinks.classList.remove('show');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.classList.remove('open');
        }
    });
}

// 按钮波纹效果（点击时生成并在动画结束后移除）
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        this.appendChild(ripple);
        ripple.addEventListener('animationend', () => ripple.remove());
    });
});

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
