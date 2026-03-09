/* =====================================================
   HARKISHAN SOLANKI PORTFOLIO — main.js
   ===================================================== */

// ── EmailJS Init ──
(function () {
  if (typeof emailjs !== 'undefined') {
    emailjs.init('YOUR_EMAILJS_PUBLIC_KEY'); // ← Replace with your key
  }
})();

// ── Custom Cursor ──
(function () {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  // Expand ring on interactive elements
  const interactables = document.querySelectorAll('a, button, input, textarea, .project-card, .service-card, .c1');
  interactables.forEach(el => {
    el.addEventListener('mouseenter', () => {
      ring.style.width  = '52px';
      ring.style.height = '52px';
      ring.style.borderColor = 'rgba(232,184,75,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      ring.style.width  = '32px';
      ring.style.height = '32px';
      ring.style.borderColor = 'rgba(232,184,75,0.5)';
    });
  });

  // Hide on mobile
  if ('ontouchstart' in window) {
    dot.style.display  = 'none';
    ring.style.display = 'none';
  }
})();

// ── Loading Screen ──
window.addEventListener('load', () => {
  const loadingScreen = document.getElementById('loading-screen');
  if (!loadingScreen) return;

  // Wait for bar animation (≈ 2.8s total) then fade out
  setTimeout(() => {
    loadingScreen.style.transition = 'opacity 0.7s ease, visibility 0.7s ease';
    loadingScreen.style.opacity    = '0';
    loadingScreen.style.visibility = 'hidden';

    setTimeout(() => {
      loadingScreen.style.display = 'none';
      // Trigger initial section animations
      revealOnScroll();
    }, 700);
  }, 2800);
});

// ── Header Scroll Effect ──
(function () {
  const header = document.querySelector('.header-list');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
})();

// ── Mobile Hamburger Menu ──
(function () {
  const hamburger = document.getElementById('hamburger');
  const navList   = document.querySelector('.div-list');
  if (!hamburger || !navList) return;

  hamburger.addEventListener('click', () => {
    navList.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navList.classList.contains('open')) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu when a link is clicked
  navList.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    });
  });
})();

// ── Active Nav on Scroll ──
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.ul-list li');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 100;
    sections.forEach((section, idx) => {
      const top    = section.offsetTop;
      const bottom = top + section.offsetHeight;
      if (scrollPos >= top && scrollPos < bottom) {
        navItems.forEach(item => item.classList.remove('active'));
        if (navItems[idx]) navItems[idx].classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
})();

// ── Scroll Reveal Animations ──
function revealOnScroll() {
  // Slide-in elements
  const slideEls = document.querySelectorAll('.slide-in-left, .slide-in-right');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  slideEls.forEach(el => observer.observe(el));

  // Fade-up for cards
  const cards = document.querySelectorAll('.project-card, .service-card, .c1');
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, i * 80);
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach(card => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    cardObserver.observe(card);
  });

  // Section headers
  const sectionHeaders = document.querySelectorAll('.section-header, .info-home, .about-info, .info-pro');
  const headerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
        entry.target.style.transform = 'translateY(0)';
        headerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  sectionHeaders.forEach(el => {
    el.style.opacity   = '0';
    el.style.transform = 'translateY(16px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    headerObserver.observe(el);
  });
}

// Init on DOMContentLoaded as well
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to let browser paint first
  setTimeout(revealOnScroll, 100);
});

// ── Contact Form (EmailJS) ──
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const btn      = form.querySelector('.btn-send');
    const btnSpan  = btn.querySelector('span');
    const btnIcon  = btn.querySelector('i');
    const original = btnSpan ? btnSpan.textContent : btn.textContent;

    // Loading state
    btn.disabled = true;
    if (btnSpan) btnSpan.textContent = 'Sending...';
    if (btnIcon) btnIcon.className = 'fa-solid fa-spinner fa-spin';
    btn.style.opacity = '0.8';

    if (typeof emailjs === 'undefined') {
      showToast('EmailJS not configured. Please add your public key.', 'error');
      resetBtn();
      return;
    }

    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
      .then(() => {
        showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
        form.reset();
        resetBtn();
      })
      .catch((error) => {
        console.error('EmailJS error:', error);
        showToast('Oops! Something went wrong. Please try again.', 'error');
        resetBtn();
      });

    function resetBtn() {
      btn.disabled = false;
      if (btnSpan) btnSpan.textContent = original;
      if (btnIcon) btnIcon.className = 'fa-solid fa-paper-plane';
      btn.style.opacity = '1';
    }
  });
})();

// ── Toast Notification ──
function showToast(message, type = 'success') {
  // Remove existing toasts
  document.querySelectorAll('.toast-notification').forEach(t => t.remove());

  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-xmark'}"></i>
    <span>${message}</span>
  `;

  Object.assign(toast.style, {
    position:        'fixed',
    bottom:          '30px',
    right:           '30px',
    zIndex:          '99999',
    display:         'flex',
    alignItems:      'center',
    gap:             '12px',
    padding:         '14px 22px',
    background:      type === 'success' ? 'rgba(74, 222, 128, 0.12)' : 'rgba(239, 68, 68, 0.12)',
    border:          `1px solid ${type === 'success' ? 'rgba(74,222,128,0.3)' : 'rgba(239,68,68,0.3)'}`,
    borderRadius:    '10px',
    color:           type === 'success' ? '#4ade80' : '#ef4444',
    fontFamily:      'DM Sans, sans-serif',
    fontSize:        '0.9rem',
    backdropFilter:  'blur(12px)',
    boxShadow:       '0 8px 32px rgba(0,0,0,0.4)',
    transform:       'translateY(20px)',
    opacity:         '0',
    transition:      'all 0.4s cubic-bezier(0.4,0,0.2,1)',
    maxWidth:        '380px',
  });

  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity   = '1';
  });

  // Animate out
  setTimeout(() => {
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity   = '0';
    setTimeout(() => toast.remove(), 400);
  }, 5000);
}

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70; // header height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});