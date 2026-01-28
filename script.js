// ===================================
// THEME TOGGLE (Dark/Light Mode)
// ===================================

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Verifica tema salvo no localStorage
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggle.addEventListener('click', () => {
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Animação suave no botão
  themeToggle.style.transform = 'rotate(360deg)';
  setTimeout(() => {
    themeToggle.style.transform = 'rotate(0deg)';
  }, 300);
});

// ===================================
// MOBILE MENU TOGGLE
// ===================================

const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.querySelector('.nav-links');

mobileMenuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  mobileMenuToggle.classList.toggle('active');
});

// Fecha menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    mobileMenuToggle.classList.remove('active');
  });
});

// ===================================
// SMOOTH SCROLL COM OFFSET (navbar fixa)
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    
    if (target) {
      const navbarHeight = document.querySelector('.navbar').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  
  if (currentScroll > 100) {
    navbar.style.boxShadow = 'var(--shadow-md)';
  } else {
    navbar.style.boxShadow = 'none';
  }
  
  lastScroll = currentScroll;
});

// ===================================
// ANIMAÇÃO DE ENTRADA (Intersection Observer)
// ===================================

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Elementos para animar
const animateElements = document.querySelectorAll(`
  .project-card,
  .skill-category,
  .timeline-item,
  .stat-item,
  .contact-method
`);

animateElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ===================================
// TYPING EFFECT (Opcional - Hero Title)
// ===================================

const heroTitle = document.querySelector('.hero-title');
const originalText = heroTitle.textContent;
let index = 0;

function typeWriter() {
  if (index < originalText.length) {
    heroTitle.textContent = originalText.substring(0, index + 1);
    index++;
    setTimeout(typeWriter, 100);
  }
}

// Descomente a linha abaixo para ativar o efeito de digitação
// heroTitle.textContent = '';
// typeWriter();

// ===================================
// SCROLL TO TOP BUTTON (Opcional)
// ===================================

// Crie um botão no HTML se quiser usar:
// <button id="scrollTop" class="scroll-top">↑</button>

const scrollTopBtn = document.getElementById('scrollTop');

if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

// ===================================
// CONSOLE MESSAGE (Easter Egg)
// ===================================

console.log('%c👋 Olá, Dev Curioso!', 'color: #0066FF; font-size: 20px; font-weight: bold;');
console.log('%cGostou do código? Vamos trabalhar juntos! 🚀', 'color: #7C3AED; font-size: 14px;');
console.log('%cContato: luancalais@gmail.com', 'color: #FF6B6B; font-size: 12px;');