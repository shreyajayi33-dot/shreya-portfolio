/**
 * SHREYA ♡ CHARAN — ROMANTIC LOVE STORY DIGITAL SCRAPBOOK & MAGAZINE
 * Mobile-First Interactive Logic: Scroll Engine, Particle Canvas, Touch Celebrations
 */

(function () {
  'use strict';

  // --- DOM ELEMENTS ---
  const progressBar = document.getElementById('progress-bar');
  const toast = document.getElementById('love-toast');
  const heartsCanvas = document.getElementById('hearts-canvas');
  const replayBtn = document.getElementById('replay-story-btn');
  const shareBtn = document.getElementById('share-btn');
  const hudShareBtn = document.getElementById('hud-share-btn');
  const loveBurstBtn = document.getElementById('love-burst-btn');

  // ==========================================================================
  // 1. SCROLL PROGRESS INDICATOR
  // ==========================================================================
  function updateScrollProgress() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) {
      progressBar.style.width = Math.min(100, Math.max(0, scrollPercent)) + '%';
    }
  }

  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  window.addEventListener('resize', updateScrollProgress, { passive: true });
  updateScrollProgress();

  // ==========================================================================
  // 2. MOBILE-RELIABLE SCROLL REVEALS
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  function checkVisibilityDirect() {
    const windowH = window.innerHeight || document.documentElement.clientHeight;
    revealElements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top <= windowH * 0.92) {
        el.classList.add('revealed');
      }
    });
  }

  // Immediately reveal elements already near/in viewport so mobile screen is never blank
  checkVisibilityDirect();
  window.addEventListener('load', checkVisibilityDirect);
  setTimeout(checkVisibilityDirect, 100);
  setTimeout(checkVisibilityDirect, 500);

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -20px 0px',
      }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    window.addEventListener('scroll', checkVisibilityDirect, { passive: true });
  }

  // ==========================================================================
  // 3. FLOATING HEARTS & SPARKLES CANVAS (MOBILE TOUCH FRIENDLY)
  // ==========================================================================
  if (heartsCanvas) {
    const ctx = heartsCanvas.getContext('2d');
    let width = (heartsCanvas.width = window.innerWidth);
    let height = (heartsCanvas.height = window.innerHeight);

    function onResize() {
      width = heartsCanvas.width = window.innerWidth;
      height = heartsCanvas.height = window.innerHeight;
    }
    window.addEventListener('resize', onResize);

    const particles = [];
    const colors = [
      'rgba(197, 109, 123, 0.45)', // dusty rose
      'rgba(248, 207, 212, 0.55)', // blush pink
      'rgba(190, 49, 68, 0.40)',   // muted red
      'rgba(201, 158, 86, 0.45)',  // gold sparkle
    ];

    class HeartParticle {
      constructor(x, y, isBurst = false) {
        this.x = x !== undefined ? x : Math.random() * width;
        this.y = y !== undefined ? y : height + Math.random() * 50;
        this.size = Math.random() * 14 + 10;
        this.speedY = isBurst ? -(Math.random() * 4 + 2) : -(Math.random() * 1.2 + 0.6);
        this.speedX = isBurst ? (Math.random() - 0.5) * 6 : (Math.random() - 0.5) * 0.8;
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.opacity = isBurst ? 1 : Math.random() * 0.5 + 0.3;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotSpeed = (Math.random() - 0.5) * 0.03;
        this.isHeart = Math.random() > 0.35; // 65% hearts, 35% sparkle stars
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.y * 0.015) * 0.5;
        this.rotation += this.rotSpeed;

        if (this.y < -30) {
          this.y = height + 20;
          this.x = Math.random() * width;
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;

        if (this.isHeart) {
          const s = this.size / 15;
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.bezierCurveTo(-5 * s, -7 * s, -12 * s, -2 * s, -12 * s, 4 * s);
          ctx.bezierCurveTo(-12 * s, 10 * s, -3 * s, 15 * s, 0, 19 * s);
          ctx.bezierCurveTo(3 * s, 15 * s, 12 * s, 10 * s, 12 * s, 4 * s);
          ctx.bezierCurveTo(12 * s, -2 * s, 5 * s, -7 * s, 0, 0);
          ctx.fill();
        } else {
          const s = this.size * 0.5;
          ctx.beginPath();
          ctx.moveTo(0, -s);
          ctx.quadraticCurveTo(0, 0, s, 0);
          ctx.quadraticCurveTo(0, 0, 0, s);
          ctx.quadraticCurveTo(0, 0, -s, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s);
          ctx.fill();
        }
        ctx.restore();
      }
    }

    // Initialize ambient floating particles (lighter load on mobile)
    const particleCount = window.innerWidth < 600 ? 16 : 24;
    for (let i = 0; i < particleCount; i++) {
      particles.push(new HeartParticle(Math.random() * width, Math.random() * height));
    }

    function animateParticles() {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // Spawn heart burst on touch or click
    function spawnBurst(clientX, clientY) {
      for (let i = 0; i < 6; i++) {
        particles.push(new HeartParticle(clientX, clientY, true));
      }
      if (particles.length > 50) {
        particles.splice(0, 6);
      }
    }

    window.addEventListener('click', (e) => {
      if (e.target.closest('button') || e.target.closest('a')) return;
      spawnBurst(e.clientX, e.clientY);
    });

    window.addEventListener('touchstart', (e) => {
      if (!e.touches || !e.touches[0]) return;
      if (e.target.closest('button') || e.target.closest('a')) return;
      const t = e.touches[0];
      spawnBurst(t.clientX, t.clientY);
    }, { passive: true });

    // Big celebration burst function
    window.triggerLoveCelebration = function () {
      for (let i = 0; i < 35; i++) {
        const x = width * 0.5 + (Math.random() - 0.5) * 200;
        const y = height * 0.6 + (Math.random() - 0.5) * 100;
        particles.push(new HeartParticle(x, y, true));
      }
    };
  }

  // ==========================================================================
  // 4. INTERACTIVE 10 THINGS LIST
  // ==========================================================================
  const loveCards = document.querySelectorAll('.love-card');
  loveCards.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('active');
    });
  });

  // ==========================================================================
  // 5. TOAST NOTIFICATIONS & SHARE / COPY LINK
  // ==========================================================================
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  async function handleShare() {
    const shareData = {
      title: 'Our Little Love Story ♡ | Shreya × Charan',
      text: 'A romantic digital scrapbook made with love for Charan ♡',
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
        showToast('Shared with love! ♡');
        return;
      } catch (err) {
        if (err.name !== 'AbortError') {
          copyLinkFallback();
        }
      }
    } else {
      copyLinkFallback();
    }
  }

  function copyLinkFallback() {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(window.location.href).then(() => {
        showToast('Link copied! Share with Charan ♡ 💌');
      }).catch(() => {
        showToast('Story ready to share! ♡');
      });
    } else {
      showToast('Link copied! Share with Charan ♡ 💌');
    }
  }

  if (shareBtn) shareBtn.addEventListener('click', handleShare);
  if (hudShareBtn) hudShareBtn.addEventListener('click', handleShare);

  // ==========================================================================
  // 6. REPLAY STORY (SMOOTH SCROLL TO TOP)
  // ==========================================================================
  if (replayBtn) {
    replayBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
      if (window.triggerLoveCelebration) {
        window.triggerLoveCelebration();
      }
      showToast('Replaying our story from the beginning... ♡');
    });
  }

  // ==========================================================================
  // 7. LOVE BURST BUTTON
  // ==========================================================================
  if (loveBurstBtn) {
    loveBurstBtn.addEventListener('click', () => {
      if (window.triggerLoveCelebration) {
        window.triggerLoveCelebration();
      }
      showToast('Love sent to Charan! 💖✨');
    });
  }
})();
