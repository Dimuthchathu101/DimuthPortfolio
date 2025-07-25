// Current year for copyright
document.getElementById('year').textContent = new Date().getFullYear();

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Scroll reveal animation
function reveal() {
    const reveals = document.querySelectorAll('.reveal');
    for (let i = 0; i < reveals.length; i++) {
        const windowHeight = window.innerHeight;
        const revealTop = reveals[i].getBoundingClientRect().top;
        const revealPoint = 150;
        if (revealTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        }
    }
}
window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// Animated skill percentage counters
function animateSkillCounters() {
    document.querySelectorAll('.skill-item').forEach(item => {
        const percentSpan = item.querySelector('.skill-name span:last-child');
        if (!percentSpan) return;
        const target = parseInt(percentSpan.textContent, 10);
        let current = 0;
        percentSpan.textContent = '0%';
        const interval = setInterval(() => {
            if (current < target) {
                current++;
                percentSpan.textContent = current + '%';
            } else {
                clearInterval(interval);
            }
        }, 12);
    });
}
// Animate skill bars when they come into view
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100);
    });
    animateSkillCounters();
}
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });
document.querySelectorAll('.skills').forEach(skills => {
    skillsObserver.observe(skills);
});

// Ripple effect for buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.classList.add('ripple');
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    button.appendChild(circle);
    circle.addEventListener('animationend', () => {
        circle.remove();
    });
}
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', createRipple);
});

// Dark/Light mode toggle
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

function setTheme(mode) {
    if (mode === 'light') {
        body.classList.add('light-mode');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        body.classList.remove('light-mode');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
    localStorage.setItem('theme', mode);
}

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-mode')) {
        setTheme('dark');
    } else {
        setTheme('light');
    }
});

// On page load, set theme from localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    setTheme('light');
} else {
    setTheme('dark');
} 