// Enhanced Portfolio Animations and Interactions
console.log('Enhanced animations loaded');

document.addEventListener('DOMContentLoaded', function() {
  // ==========================================
  // 1. Smooth Scroll Reveal Animation
  // ==========================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });

  // ==========================================
  // 2. Enhanced Parallax for Project Cards
  // ==========================================
  const projectCards = document.querySelectorAll('.project-card');

  function updateParallax() {
    const scrolled = window.pageYOffset;
    
    projectCards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardTop = rect.top + scrolled;
      const cardCenter = cardTop + rect.height / 2;
      const windowCenter = scrolled + window.innerHeight / 2;
      const distance = windowCenter - cardCenter;

      // Only apply parallax when card is near viewport
      if (Math.abs(distance) < window.innerHeight) {
        const parallaxOffset = distance * 0.02;
        const rotateX = distance * 0.005;
        card.style.transform = `translateY(${parallaxOffset}px) rotateX(${rotateX}deg) perspective(1000px)`;
      }
    });
  }

  // Throttle parallax for performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // ==========================================
  // 3. Magnetic Effect for Buttons
  // ==========================================
  const magneticElements = document.querySelectorAll('.modern-download-btn, .project-link, .tab-btn');

  magneticElements.forEach(element => {
    element.addEventListener('mousemove', (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      element.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    element.addEventListener('mouseleave', () => {
      element.style.transform = 'translate(0, 0)';
    });
  });

  // ==========================================
  // 4. Tech Cards Interactive Tilt
  // ==========================================
  const techCards = document.querySelectorAll('.tech-card');

  techCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
  });

  // ==========================================
  // 5. Enhanced Back to Top Button
  // ==========================================
  const backToTopBtn = document.getElementById('backToTop');
  let lastScrollTop = 0;

  function updateBackToTop() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 300) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // Add rotation based on scroll direction
    if (scrollTop > lastScrollTop) {
      backToTopBtn.style.transform = 'rotate(180deg)';
    } else {
      backToTopBtn.style.transform = 'rotate(0deg)';
    }

    lastScrollTop = scrollTop;
  }

  window.addEventListener('scroll', updateBackToTop, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ==========================================
  // 6. Animated Counter for Metrics
  // ==========================================
  function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current);
      }
    }, 16);
  }

  // Observe metrics for counter animation
  const metricsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const strongTags = entry.target.querySelectorAll('strong');
        strongTags.forEach(strong => {
          const text = strong.textContent;
          const number = parseInt(text);
          if (!isNaN(number) && number > 0) {
            animateCounter(strong, number);
          }
        });
        metricsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.metric').forEach(metric => {
    metricsObserver.observe(metric);
  });

  // ==========================================
  // 7. Enhanced Tab Switching with Animation
  // ==========================================
  const tabButtons = document.querySelectorAll('.tab-btn');
  const techCategories = document.querySelectorAll('.tech-category');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetCategory = button.getAttribute('data-category');

      // Remove active from all
      tabButtons.forEach(btn => btn.classList.remove('active'));
      techCategories.forEach(cat => {
        cat.classList.remove('active');
        cat.style.opacity = '0';
        cat.style.transform = 'translateY(20px)';
      });

      // Add active to clicked
      button.classList.add('active');
      const activeCategory = document.getElementById(`${targetCategory}-tab`);

      if (activeCategory) {
        setTimeout(() => {
          activeCategory.classList.add('active');
          activeCategory.style.opacity = '1';
          activeCategory.style.transform = 'translateY(0)';

          // Animate cards in active category
          const cards = activeCategory.querySelectorAll('.tech-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, index * 50);
          });
        }, 100);
      }
    });
  });

  // ==========================================
  // 8. Cursor Trail Effect (Optional)
  // ==========================================
  const createCursorTrail = () => {
    const trail = document.createElement('div');
    trail.className = 'cursor-trail';
    trail.style.cssText = `
      position: fixed;
      width: 10px;
      height: 10px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      opacity: 0;
      transition: opacity 0.3s;
    `;
    document.body.appendChild(trail);
    return trail;
  };

  const trails = Array.from({ length: 5 }, createCursorTrail);
  let mouseX = 0, mouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateTrails() {
    trails.forEach((trail, index) => {
      setTimeout(() => {
        trail.style.left = mouseX + 'px';
        trail.style.top = mouseY + 'px';
        trail.style.opacity = (1 - index * 0.2).toString();
        trail.style.transform = `scale(${1 - index * 0.15})`;
      }, index * 30);
    });
    requestAnimationFrame(animateTrails);
  }

  animateTrails();

  // ==========================================
  // 9. Text Typing Animation Enhancement
  // ==========================================
  const typingText = document.getElementById('typing-text');
  const cursor = document.querySelector('.cursor');

  if (typingText && cursor) {
    const text = "Sangamnath R Ingalalli";
    let charIndex = 0;

    function type() {
      if (charIndex < text.length) {
        typingText.textContent += text.charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
      } else {
        // Blink cursor after typing is complete
        cursor.style.animation = 'blink 1s infinite';
      }
    }

    setTimeout(type, 500);
  }

  // ==========================================
  // 10. Skill Tags Shuffle Animation
  // ==========================================
  const skillTags = document.querySelectorAll('.skill-tags span');

  skillTags.forEach((tag, index) => {
    tag.style.opacity = '0';
    tag.style.transform = 'scale(0.5)';

    setTimeout(() => {
      tag.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
      tag.style.opacity = '1';
      tag.style.transform = 'scale(1)';
    }, index * 50);
  });

  // ==========================================
  // 11. Project Card Hover Sound Effect (Optional)
  // ==========================================
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      // Add ripple effect
      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(102, 126, 234, 0.5);
        width: 0;
        height: 0;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        animation: ripple 0.6s ease-out;
      `;
      card.style.position = 'relative';
      card.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // Add ripple animation
  const style = document.createElement('style');
  style.textContent = `
    @keyframes ripple {
      to {
        width: 300px;
        height: 300px;
        opacity: 0;
      }
    }
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // ==========================================
  // 12. Enhanced Download Button with Progress
  // ==========================================
  const downloadBtn = document.getElementById('downloadCv');

  if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const btn = this;
      const btnText = btn.querySelector('.btn-text');
      const icon = btn.querySelector('.btn-icon');
      const originalText = btnText.textContent;

      // Disable button
      btn.style.pointerEvents = 'none';
      btnText.textContent = 'Preparing...';
      icon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';

      // Simulate progress
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += 10;
        btnText.textContent = `Downloading... ${progress}%`;

        if (progress >= 100) {
          clearInterval(progressInterval);

          try {
            const pdfUrl = 'resources/Sangamnath_QA_Automation_Engineer_8197775778.pdf';
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = 'Sangamnath_QA_Automation_Engineer_8197775778.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            btnText.textContent = 'Downloaded!';
            icon.innerHTML = '<i class="fas fa-check"></i>';
          } catch (error) {
            console.error('Download error:', error);
            btnText.textContent = 'Error!';
            icon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
          }

          setTimeout(() => {
            btnText.textContent = originalText;
            icon.innerHTML = '<i class="fas fa-download"></i>';
            btn.style.pointerEvents = 'auto';
          }, 3000);
        }
      }, 100);
    });
  }

  // ==========================================
  // 13. Experience Timeline Animation
  // ==========================================
  const jobCards = document.querySelectorAll('.job');

  const jobObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, index * 100);
        jobObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  jobCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-50px)';
    card.style.transition = 'all 0.6s ease-out';
    jobObserver.observe(card);
  });

  // ==========================================
  // 14. Page Load Animation
  // ==========================================
  window.addEventListener('load', () => {
    const loader = document.querySelector('.page-loader');
    if (loader) {
      setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500);
      }, 500);
    }
  });

  // ==========================================
  // 15. Smooth Anchor Scrolling
  // ==========================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ==========================================
  // 16. Easter Egg: Konami Code
  // ==========================================
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        activateEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });

  function activateEasterEgg() {
    // Add rainbow effect to all headings
    const headings = document.querySelectorAll('h1, h2, h3');
    headings.forEach(heading => {
      heading.style.animation = 'rainbow 3s linear infinite';
    });

    // Add rainbow animation
    const rainbowStyle = document.createElement('style');
    rainbowStyle.textContent = `
      @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
    `;
    document.head.appendChild(rainbowStyle);

    // Show notification
    const notification = document.createElement('div');
    notification.textContent = '🎉 Easter Egg Activated! Rainbow Mode ON!';
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: linear-gradient(135deg, #667eea, #764ba2);
      color: white;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      z-index: 10000;
      animation: slideInRight 0.5s ease-out;
    `;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.5s ease-out';
      setTimeout(() => notification.remove(), 500);
    }, 3000);
  }

  console.log('All enhanced animations initialized!');
});
