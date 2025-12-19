// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// 功能卡片hover效果
const featureCard = document.querySelector('.feature-card');
if (featureCard) {
    featureCard.addEventListener('mouseenter', () => {
        featureCard.style.transform = 'translateY(-5px)';
        featureCard.style.boxShadow = '0 6px 15px rgba(0,0,0,0.1)';
    });
    featureCard.addEventListener('mouseleave', () => {
        featureCard.style.transform = 'translateY(0)';
        featureCard.style.boxShadow = '0 3px 10px rgba(0,0,0,0.06)';
    });
}

// 导航栏滚动效果
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 30) {
        navbar.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = '0 3px 10px rgba(0,0,0,0.06)';
    }
});