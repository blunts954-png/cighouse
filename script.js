/* ============================================
   CIGARETTE HOUSE - MILLION DOLLAR EDITION
   Smoke Effects | Particles | Animations
   ============================================ */

(function () {
  'use strict';

  // ============================================
  // SMOKE PARTICLE SYSTEM
  // ============================================
  class SmokeSystem {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.particles = [];
      this.resize();
      this.init();
      this.animate();
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    init() {
      // Create initial particles
      for (let i = 0; i < 50; i++) {
        this.particles.push(this.createParticle());
      }
    }

    createParticle() {
      const colors = [
        'rgba(0, 212, 255, 0.15)',   // Neon blue
        'rgba(0, 255, 136, 0.12)',   // Neon cyan/green
        'rgba(168, 85, 247, 0.08)',  // Purple
        'rgba(0, 150, 255, 0.1)'     // Blue
      ];
      
      return {
        x: Math.random() * this.canvas.width,
        y: this.canvas.height + Math.random() * 200,
        size: Math.random() * 100 + 50,
        speedY: Math.random() * 0.8 + 0.3,
        speedX: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.3 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        pulse: Math.random() * Math.PI
      };
    }

    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.particles.forEach((p, index) => {
        // Update position
        p.y -= p.speedY;
        p.x += p.speedX + Math.sin(p.pulse) * 0.3;
        p.rotation += p.rotationSpeed;
        p.pulse += 0.02;

        // Reset if off screen
        if (p.y < -p.size * 2) {
          this.particles[index] = this.createParticle();
        }

        // Draw smoke puff
        this.ctx.save();
        this.ctx.translate(p.x, p.y);
        this.ctx.rotate(p.rotation);
        
        const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
        gradient.addColorStop(0, p.color);
        gradient.addColorStop(0.5, p.color.replace(/[\d.]+\)$/, '0.05)'));
        gradient.addColorStop(1, 'transparent');
        
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Add glow effect
        this.ctx.shadowBlur = 20;
        this.ctx.shadowColor = p.color;
        
        this.ctx.restore();
      });

      // Add occasional new particle
      if (this.particles.length < 60 && Math.random() < 0.05) {
        this.particles.push(this.createParticle());
      }

      requestAnimationFrame(() => this.animate());
    }
  }

  // ============================================
  // FLOATING NEON ORBS
  // ============================================
  class NeonOrbs {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.orbs = [];
      this.resize();
      this.init();
      this.animate();
      window.addEventListener('resize', () => this.resize());
    }

    resize() {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }

    init() {
      for (let i = 0; i < 8; i++) {
        this.orbs.push({
          x: Math.random() * this.canvas.width,
          y: Math.random() * this.canvas.height,
          radius: Math.random() * 150 + 100,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          color: i % 2 === 0 ? 'rgba(0, 212, 255, 0.08)' : 'rgba(0, 255, 136, 0.06)'
        });
      }
    }

    animate() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      this.orbs.forEach(orb => {
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce off edges
        if (orb.x < -orb.radius) orb.x = this.canvas.width + orb.radius;
        if (orb.x > this.canvas.width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = this.canvas.height + orb.radius;
        if (orb.y > this.canvas.height + orb.radius) orb.y = -orb.radius;

        // Draw orb
        const gradient = this.ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.radius);
        gradient.addColorStop(0, orb.color);
        gradient.addColorStop(1, 'transparent');

        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(orb.x, orb.y, orb.radius, 0, Math.PI * 2);
        this.ctx.fill();
      });

      requestAnimationFrame(() => this.animate());
    }
  }

  // ============================================
  // MOUSE TRAIL EFFECT
  // ============================================
  class MouseTrail {
    constructor() {
      this.trail = [];
      this.maxLength = 20;
      this.init();
    }

    init() {
      document.addEventListener('mousemove', (e) => {
        this.trail.push({
          x: e.clientX,
          y: e.clientY,
          age: 0
        });

        if (this.trail.length > this.maxLength) {
          this.trail.shift();
        }
      });

      this.animate();
    }

    animate() {
      this.trail.forEach((point, index) => {
        point.age++;
        
        if (point.age > 30) {
          this.trail.splice(index, 1);
        }
      });

      requestAnimationFrame(() => this.animate());
    }
  }

  // ============================================
  // SCROLL REVEAL ANIMATIONS
  // ============================================
  function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  }

  // ============================================
  // HEADER SCROLL EFFECT
  // ============================================
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      if (currentScroll > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }

      lastScroll = currentScroll;
    });
  }

  // ============================================
  // AGE GATE
  // ============================================
  function initAgeGate() {
    const body = document.body;
    const gate = document.getElementById('gate');
    const enterBtn = document.getElementById('enter-btn');
    const shellTargets = document.querySelectorAll('header.site-header, main, .mobile-bar');

    function setShellInert(state) {
      shellTargets.forEach(node => {
        if (!node) return;
        if (state) {
          node.setAttribute('inert', '');
        } else {
          node.removeAttribute('inert');
        }
      });
    }

    function closeGate() {
      if (!gate || gate.hidden || gate.classList.contains('is-opening')) {
        return;
      }

      // Play entrance sound effect (optional)
      playEntranceSound();

      gate.classList.add('is-opening');

      setTimeout(() => {
        gate.classList.add('is-exiting');
      }, 600);

      setTimeout(() => {
        gate.hidden = true;
        gate.setAttribute('aria-hidden', 'true');
        body.classList.remove('gate-open');
        setShellInert(false);
        gate.classList.remove('is-opening', 'is-exiting');
        
        // Trigger initial animations
        triggerEntranceAnimations();
      }, 1000);
    }

    function playEntranceSound() {
      // Create a subtle whoosh sound using Web Audio API
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.5);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
      } catch (e) {
        // Silent fail if audio not supported
      }
    }

    function triggerEntranceAnimations() {
      const heroElements = document.querySelectorAll('.hero .reveal, .hero .reveal-left, .hero .reveal-right');
      heroElements.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add('active');
        }, i * 150);
      });
    }

    if (gate) {
      body.classList.add('gate-open');
      gate.hidden = false;
      gate.setAttribute('aria-hidden', 'false');
      setShellInert(true);

      if (enterBtn) {
        setTimeout(() => {
          enterBtn.focus();
        }, 100);
        enterBtn.addEventListener('click', closeGate);
      }

      // Close on Enter key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !gate.hidden) {
          closeGate();
        }
      });
    }
  }

  // ============================================
  // PARALLAX EFFECTS
  // ============================================
  function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-media, .floating');
    
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      parallaxElements.forEach(el => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        el.style.transform = `translateY(${yPos}px)`;
      });
    });
  }

  // ============================================
  // COUNTER ANIMATION
  // ============================================
  function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.dataset.target);
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += step;
            if (current < target) {
              counter.textContent = Math.floor(current);
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          };

          updateCounter();
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  // ============================================
  // TEXT SCRAMBLE EFFECT
  // ============================================
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = '!<>-_\\/[]{}—=+*^?#________';
      this.update = this.update.bind(this);
    }

    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => this.resolve = resolve);
      
      this.queue = [];
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || '';
        const to = newText[i] || '';
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }
      
      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }

    update() {
      let output = '';
      let complete = 0;

      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i];
        
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="scramble-char">${char}</span>`;
        } else {
          output += from;
        }
      }

      this.el.innerHTML = output;

      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    }

    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }

  // ============================================
  // SMOOTH SCROLL FOR ANCHOR LINKS
  // ============================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // ============================================
  // MAGNETIC BUTTON EFFECT
  // ============================================
  function initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn, .header-cta');
    
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });
      
      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  // ============================================
  // LOADING SCREEN
  // ============================================
  function initLoader() {
    const loader = document.getElementById('page-loader');
    const gate = document.getElementById('gate');
    
    if (loader) {
      // Hide loader after page loads
      window.addEventListener('load', () => {
        setTimeout(() => {
          loader.classList.add('hidden');
          
          // Show age gate after loader is done
          setTimeout(() => {
            if (gate) {
              gate.style.opacity = '1';
              gate.style.visibility = 'visible';
            }
          }, 300);
        }, 1200);
      });
    }
  }

  // ============================================
  // TILT EFFECT FOR CARDS
  // ============================================
  function initTiltEffect() {
    const cards = document.querySelectorAll('.product-card, .review-card, .info-card');
    
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
      });
      
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ============================================
  // INITIALIZE EVERYTHING
  // ============================================
  function init() {
    // Initialize smoke system
    const smokeCanvas = document.getElementById('smoke-canvas');
    if (smokeCanvas) {
      new SmokeSystem(smokeCanvas);
    }

    // Initialize neon orbs
    const orbsCanvas = document.getElementById('orbs-canvas');
    if (orbsCanvas) {
      new NeonOrbs(orbsCanvas);
    }

    // Initialize all features
    initAgeGate();
    initScrollReveal();
    initHeaderScroll();
    initParallax();
    initCounters();
    initSmoothScroll();
    initMagneticButtons();
    initLoader();
    initTiltEffect();

    // Text scramble for hero title
    const heroTitle = document.querySelector('.hero-copy h1');
    if (heroTitle) {
      const fx = new TextScramble(heroTitle);
      setTimeout(() => {
        fx.setText(heroTitle.innerText);
      }, 1500);
    }
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


/* ============================================
   LEAD CAPTURE MACHINE - JAVASCRIPT
   ============================================ */

// Lead Modal Functions
function openLeadModal() {
  const modal = document.getElementById('lead-modal');
  if (modal) {
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Focus on first input
    setTimeout(() => {
      const firstInput = document.getElementById('lead-name');
      if (firstInput) firstInput.focus();
    }, 300);
  }
}

function closeLeadModal() {
  const modal = document.getElementById('lead-modal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function closeSuccessModal() {
  const modal = document.getElementById('lead-success');
  if (modal) {
    modal.classList.remove('active');
  }
}

// Form Submission
function submitLead(event) {
  event.preventDefault();
  
  const form = document.getElementById('lead-form');
  const formData = new FormData(form);
  
  // Get values
  const name = formData.get('name');
  const phone = formData.get('phone');
  const email = formData.get('email');
  const smsConsent = formData.get('sms-consent') === 'on';
  
  // Validate
  if (!name || !phone || !email) {
    showLeadNotification('Please fill in all fields', 'error');
    return;
  }
  
  // Generate unique coupon code
  const code = generateCouponCode();
  document.getElementById('coupon-code').textContent = code;
  
  // Store lead data (in real app, send to server)
  const leadData = {
    name,
    phone,
    email,
    smsConsent,
    couponCode: code,
    timestamp: new Date().toISOString(),
    source: window.location.href
  };
  
  // Save to localStorage for demo
  let leads = JSON.parse(localStorage.getItem('cigaretteHouseLeads') || '[]');
  leads.push(leadData);
  localStorage.setItem('cigaretteHouseLeads', JSON.stringify(leads));
  
  console.log('Lead captured:', leadData);
  
  // Show success
  closeLeadModal();
  setTimeout(() => {
    document.getElementById('lead-success').classList.add('active');
  }, 300);
  
  // Reset form
  form.reset();
}

function generateCouponCode() {
  const prefix = 'VIP15';
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${random}`;
}

function copyCoupon() {
  const code = document.getElementById('coupon-code').textContent;
  navigator.clipboard.writeText(code).then(() => {
    const btn = document.querySelector('.copy-btn');
    const originalText = btn.textContent;
    btn.textContent = 'Copied!';
    btn.style.background = 'var(--neon-cyan)';
    btn.style.color = '#000';
    
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
      btn.style.color = '';
    }, 2000);
  });
}

// Notification for lead capture
function showLeadNotification(message, type = 'success') {
  const notif = document.createElement('div');
  notif.style.cssText = `
    position: fixed;
    top: 100px;
    right: 30px;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    font-weight: 600;
    z-index: 9999;
    animation: slideInRight 0.4s ease;
    ${type === 'error' 
      ? 'background: #ff4757; color: #fff;' 
      : 'background: linear-gradient(135deg, var(--neon-blue), var(--neon-cyan)); color: #000;'}
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
  `;
  notif.textContent = message;
  document.body.appendChild(notif);
  
  setTimeout(() => {
    notif.style.animation = 'slideInRight 0.4s ease reverse';
    setTimeout(() => notif.remove(), 400);
  }, 3000);
}

// Auto-show lead modal after delay
function initLeadCapture() {
  const modal = document.getElementById('lead-modal');
  if (!modal) return;
  
  // Check if user has already seen it (don't show again for 24 hours)
  const lastShown = localStorage.getItem('leadModalLastShown');
  const now = Date.now();
  const hours24 = 24 * 60 * 60 * 1000;
  
  if (!lastShown || (now - parseInt(lastShown)) > hours24) {
    // Show after 15 seconds
    setTimeout(() => {
      // Only show if gate is closed
      const gate = document.getElementById('gate');
      if (gate && gate.hidden) {
        openLeadModal();
        localStorage.setItem('leadModalLastShown', now.toString());
      }
    }, 15000);
  }
  
  // Exit intent detection
  let exitIntentShown = false;
  document.addEventListener('mouseout', (e) => {
    if (e.clientY < 10 && !exitIntentShown && !modal.classList.contains('active')) {
      exitIntentShown = true;
      const gate = document.getElementById('gate');
      if (gate && gate.hidden) {
        openLeadModal();
        // Animate the trigger button
        const trigger = document.getElementById('lead-trigger');
        if (trigger) {
          trigger.classList.add('shake');
          setTimeout(() => trigger.classList.remove('shake'), 500);
        }
      }
    }
  });
  
  // Close modal on backdrop click
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.classList.contains('lead-backdrop')) {
      closeLeadModal();
    }
  });
  
  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLeadModal();
      closeSuccessModal();
    }
  });
}

// Initialize lead capture when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initLeadCapture);
} else {
  initLeadCapture();
}
