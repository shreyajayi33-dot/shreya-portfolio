/**
 * Main Portfolio Script for Shreya Jayi
 * Handles navigation, theme toggle, typewriter animation, modals,
 * scroll progress, active link spy, contact form validation & feedback.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Scroll Effect
  const navbar = document.getElementById('main-navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // 2. Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const navMenu = document.getElementById('nav-menu');
  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('mobile-open');
      mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileBtn.textContent = isOpen ? '✕' : '☰';
    });

    // Close mobile menu when any nav-link is clicked
    navMenu.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
        mobileBtn.setAttribute('aria-expanded', 'false');
        mobileBtn.textContent = '☰';
      });
    });
  }

  // 3. Theme Toggle (Dark / Light)
  const themeBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = themeBtn ? themeBtn.querySelector('.theme-icon') : null;
  const savedTheme = localStorage.getItem('theme') || 'dark';

  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('theme', nextTheme);
      updateThemeIcon(nextTheme);
      showToast(`Switched to ${nextTheme === 'dark' ? 'Dark' : 'Light'} Mode`, 'info');
    });
  }

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }

  // 4. Typewriter Effect in Hero Headline
  const typewriterElement = document.getElementById('typewriter-headline');
  if (typewriterElement) {
    const roles = [
      'Computer Science Engineering Student',
      'AI/ML & Neural Networks Intern',
      'Python Developer',
      'Agentic AI Explorer'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function type() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 40;
      } else {
        typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 80;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typeSpeed = 1800; // Pause at end of sentence
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typeSpeed = 350;
      }

      setTimeout(type, typeSpeed);
    }
    type();
  }

  // 5. Scroll Progress Bar
  const progressBar = document.getElementById('scroll-progress-bar');
  function updateScrollProgress() {
    if (!progressBar) return;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight > 0) {
      const progress = (window.scrollY / scrollHeight) * 100;
      progressBar.style.width = `${progress}%`;
      progressBar.setAttribute('aria-valuenow', Math.round(progress));
    }
  }
  window.addEventListener('scroll', updateScrollProgress, { passive: true });

  // 6. Back to Top Button
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // 7. Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('active'));
  }

  // 8. Active Nav Link Spy
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNavLink() {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 150;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
  window.addEventListener('scroll', updateActiveNavLink, { passive: true });

  // 9. Modals Controller (Resume & Projects)
  const resumeModal = document.getElementById('resume-modal');
  const projectModal = document.getElementById('project-modal');
  const heroViewResumeBtn = document.getElementById('hero-view-resume-modal-btn');
  const modalCloseBtns = document.querySelectorAll('.modal-close-btn');

  function openModal(modal) {
    if (!modal) return;
    if (modal === resumeModal) {
      const pdfFrame = document.getElementById('resume-pdf-frame');
      if (pdfFrame && pdfFrame.getAttribute('data-src') && (!pdfFrame.src || pdfFrame.src === 'about:blank' || pdfFrame.src.endsWith('about:blank'))) {
        pdfFrame.src = pdfFrame.getAttribute('data-src');
      }
    }
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeAllModals() {
    document.querySelectorAll('.modal-overlay').forEach(modal => modal.classList.remove('active'));
    document.body.style.overflow = 'auto';
  }

  if (heroViewResumeBtn) {
    heroViewResumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(resumeModal);
    });
  }

  modalCloseBtns.forEach(btn => {
    btn.addEventListener('click', closeAllModals);
  });

  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      closeAllModals();
    }
  });

  // 10. Project Details Modal Content & Trigger
  const projectDetailsBtns = document.querySelectorAll('.project-details-btn');
  const projectModalTitle = document.getElementById('project-modal-title');
  const projectModalContent = document.getElementById('project-modal-content');

  const projectModalInfo = {
    languagetutor: {
      title: 'LanguageTutor — AI Language Learning Application',
      html: `
        <div style="margin-bottom: 20px;">
          <img src="assets/images/project-languagetutor.png" alt="LanguageTutor AI Application" style="width:100%; border-radius:14px; margin-bottom:16px; box-shadow: 0 8px 24px rgba(0,0,0,0.4);" />
          <h4 style="color: var(--accent-cyan); margin-bottom: 8px;">Interactive AI Language Learning Platform</h4>
          <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 14px;">
            An AI-powered language-learning application designed to assist learners with interactive lesson structures, vocabulary retention, and conversational practice.
          </p>
          <ul style="color: var(--text-secondary); line-height: 1.8; margin-left: 20px; margin-bottom: 16px;">
            <li><strong>AI-Driven Instruction:</strong> Tailors interactive exercises to support personalized learner progress.</li>
            <li><strong>Cross-Platform Architecture:</strong> Engineered with responsive web and mobile components for seamless cross-device study.</li>
            <li><strong>Production Repository:</strong> Complete version-controlled codebase published on GitHub with structured engineering workflows.</li>
          </ul>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <span class="tech-tag">React Native / Expo</span>
            <span class="tech-tag">Python</span>
            <span class="tech-tag">AI Integration</span>
            <span class="tech-tag">Interactive UX</span>
          </div>
        </div>
      `
    },
    aura: {
      title: 'AURA — Agentic AI Phone Manager',
      html: `
        <div style="margin-bottom: 20px;">
          <img src="assets/images/project-aura.jpg" alt="AURA Agentic AI Phone Manager" style="width:100%; border-radius:14px; margin-bottom:16px; box-shadow: 0 8px 24px rgba(0,0,0,0.4);" />
          <h4 style="color: var(--accent-violet); margin-bottom: 8px;">Autonomous Reasoning & Tool-Use Architecture</h4>
          <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 14px;">
            An agentic AI architectural concept designed to assist users with phone-related tasks through intelligent intent recognition, task decomposition, and automated tool coordination.
          </p>
          <ul style="color: var(--text-secondary); line-height: 1.8; margin-left: 20px; margin-bottom: 16px;">
            <li><strong>Intent Recognition & Parsing:</strong> Extracts actionable intents from natural language user prompts.</li>
            <li><strong>Tool Orchestration:</strong> Chains tool actions across calendar scheduling, emergency alerts, and message digests.</li>
            <li><strong>Autonomous AI Workflows:</strong> Investigates execution state tracking, latency benchmarks, and reliable agent decisions.</li>
          </ul>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <span class="tech-tag">Agentic AI</span>
            <span class="tech-tag">Intent Parsing</span>
            <span class="tech-tag">Task Automation</span>
            <span class="tech-tag">Neural Models</span>
          </div>
        </div>
      `
    },
    gps: {
      title: 'Women Safety Device Using GPS Tracking',
      html: `
        <div style="margin-bottom: 20px;">
          <img src="assets/images/project-gps.jpg" alt="GPS Safety Device" style="width:100%; border-radius:14px; margin-bottom:16px; box-shadow: 0 8px 24px rgba(0,0,0,0.4);" />
          <h4 style="color: var(--accent-emerald); margin-bottom: 8px;">Safety-Oriented GPS Telemetry Solution</h4>
          <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 14px;">
            Developed a safety-oriented solution using GPS tracking to provide location awareness and support emergency assistance.
          </p>
          <ul style="color: var(--text-secondary); line-height: 1.8; margin-left: 20px; margin-bottom: 16px;">
            <li><strong>Real-Time Location Tracking:</strong> Designed around real-time location tracking to enable faster access to location information during emergency situations.</li>
            <li><strong>Personal Safety Application:</strong> Applied programming and problem-solving concepts to address a practical personal-safety use case.</li>
            <li><strong>Location Awareness:</strong> Provides continuous coordinate awareness to empower rapid emergency response.</li>
          </ul>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <span class="tech-tag">GPS Tracking</span>
            <span class="tech-tag">Personal Safety</span>
            <span class="tech-tag">Real-Time Telemetry</span>
            <span class="tech-tag">Problem Solving</span>
          </div>
        </div>
      `
    },
    weather: {
      title: 'Weather App',
      html: `
        <div style="margin-bottom: 20px;">
          <img src="assets/images/project-weather.jpg" alt="Weather App Interface" style="width:100%; border-radius:14px; margin-bottom:16px; box-shadow: 0 8px 24px rgba(0,0,0,0.4);" />
          <h4 style="color: var(--accent-cyan); margin-bottom: 8px;">Web-Based Weather Application</h4>
          <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 14px;">
            Developed a web-based weather application with a simple and user-friendly interface for displaying weather information.
          </p>
          <ul style="color: var(--text-secondary); line-height: 1.8; margin-left: 20px; margin-bottom: 16px;">
            <li><strong>Clear Weather Presentation:</strong> Focused on clear presentation of weather information and straightforward application usability.</li>
            <li><strong>Structured UI Foundations:</strong> Applied HTML and programming fundamentals to structure the application and provide an accessible user experience.</li>
          </ul>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <span class="tech-tag">HTML</span>
            <span class="tech-tag">JavaScript</span>
            <span class="tech-tag">Responsive UX</span>
          </div>
        </div>
      `
    }
  };

  projectDetailsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const projKey = btn.getAttribute('data-project');
      const data = projectModalInfo[projKey];
      if (data && projectModal && projectModalTitle && projectModalContent) {
        projectModalTitle.textContent = data.title;
        projectModalContent.innerHTML = data.html;
        openModal(projectModal);
      }
    });
  });

  // 11. Copy Email Address with Feedback
  const copyEmailBtn = document.getElementById('copy-email-btn');
  const copyFeedback = document.getElementById('copy-feedback-badge');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = 'shreyajayi33@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        if (copyFeedback) {
          copyFeedback.style.display = 'inline-block';
          setTimeout(() => { copyFeedback.style.display = 'none'; }, 2000);
        }
        showToast('Email address copied to clipboard!', 'success');
      }).catch(() => {
        showToast('Could not copy email automatically.', 'info');
      });
    });
  }

  // 12. Contact Form Frontend Validation & Feedback
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const messageInput = document.getElementById('contact-message');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const feedbackBanner = document.getElementById('form-feedback-banner');

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;

      // Validate Name
      if (!nameInput.value.trim()) {
        nameError.style.display = 'block';
        nameInput.style.borderColor = '#ef4444';
        isValid = false;
      } else {
        nameError.style.display = 'none';
        nameInput.style.borderColor = 'var(--border-subtle)';
      }

      // Validate Email
      if (!emailInput.value.trim() || !validateEmail(emailInput.value.trim())) {
        emailError.style.display = 'block';
        emailInput.style.borderColor = '#ef4444';
        isValid = false;
      } else {
        emailError.style.display = 'none';
        emailInput.style.borderColor = 'var(--border-subtle)';
      }

      // Validate Message
      if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
        messageError.style.display = 'block';
        messageInput.style.borderColor = '#ef4444';
        isValid = false;
      } else {
        messageError.style.display = 'none';
        messageInput.style.borderColor = 'var(--border-subtle)';
      }

      if (!isValid) return;

      // Display required frontend-only message
      if (feedbackBanner) {
        feedbackBanner.style.display = 'block';
      }
      showToast('Thanks! Your message has been captured locally. This demo form does not send emails yet.', 'success');
      contactForm.reset();
    });

    // Clear field errors on input
    [nameInput, emailInput, messageInput].forEach(input => {
      if (input) {
        input.addEventListener('input', () => {
          input.style.borderColor = 'var(--border-subtle)';
          const err = input.parentElement.querySelector('.field-error');
          if (err) err.style.display = 'none';
        });
      }
    });
  }

  // 13. Toast Notification Helper
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    const icon = type === 'success' ? '✅' : type === 'error' ? '⚠️' : 'ℹ️';
    toast.innerHTML = `<span>${icon}</span> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(40px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  // 14. Keyboard Accessibility (Escape to close modals & menu)
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
      if (navMenu && navMenu.classList.contains('mobile-open')) {
        navMenu.classList.remove('mobile-open');
        if (mobileBtn) {
          mobileBtn.setAttribute('aria-expanded', 'false');
          mobileBtn.textContent = '☰';
        }
      }
    }
  });
});
