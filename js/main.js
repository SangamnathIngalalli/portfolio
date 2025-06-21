// Typing animation - types name once and stops
function initTypingEffect() {
  const text = "Sangamnath R Ingalalli";
  const typingText = document.getElementById('typing-text');
  const cursor = document.querySelector('.cursor');
  
  let charIndex = 0;
  const typingSpeed = 100; // milliseconds per character
  
  function type() {
    if (charIndex < text.length) {
      typingText.textContent += text.charAt(charIndex);
      charIndex++;
      setTimeout(type, typingSpeed);
    }
  }
  
  // Start the typing effect after a short delay
  setTimeout(type, 500);
}

// Parallax effect for project cards
function initParallaxEffect() {
  const cards = document.querySelectorAll('.project-card');
  
  // Set initial state and add index for staggered animation
  cards.forEach((card, index) => {
    card.style.setProperty('--index', index);
    card.style.transform = 'translateZ(0)';
    
    // Add a small delay before starting the animation
    setTimeout(() => {
      if (isElementInViewport(card)) {
        card.classList.add('visible');
      }
    }, 50);
  });
  
  // Only add event listener if we have cards
  if (cards.length > 0) {
    // Initial check for cards in viewport
    checkCardsInViewport();
    
    // Check on scroll
    window.addEventListener('scroll', checkCardsInViewport, { passive: true });
  }
  
  function checkCardsInViewport() {
    const scrollPosition = window.pageYOffset;
    const windowHeight = window.innerHeight;
    
    cards.forEach((card, index) => {
      const cardRect = card.getBoundingClientRect();
      const cardPosition = cardRect.top + window.pageYOffset;
      const distance = cardPosition - scrollPosition;
      
      // Check if card is in or near viewport
      if (distance < windowHeight * 1.2 && distance > -windowHeight * 0.5) {
        // Add visible class with a small delay for staggered effect
        setTimeout(() => {
          card.classList.add('visible');
        }, index * 50);
        
        // Calculate parallax effect (subtle movement)
        const offset = (windowHeight - distance) * 0.015;
        const rotation = (windowHeight - distance) * 0.0008;
        
        // Apply transform with subtle 3D effect
        card.style.transform = `perspective(1000px) translateZ(${Math.min(offset, 15)}px) rotateX(${Math.min(rotation, 2)}deg)`;
        
        // Slight shadow enhancement based on scroll
        const shadowIntensity = Math.min(offset / 15, 0.1);
        card.style.boxShadow = `0 ${Math.min(offset/2, 10)}px ${Math.min(offset, 20)}px rgba(0, 0, 0, ${0.05 + shadowIntensity})`;
      }
    });
  }
  
  // Helper function to check if element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 1.2 &&
      rect.bottom >= 0
    );
  }
}

document.addEventListener('DOMContentLoaded', function() {
  // Initialize typing effect
  initTypingEffect();
  
  // Initialize parallax effect
  initParallaxEffect();
  
  // Back to Top Button
  const backToTopButton = document.getElementById('backToTop');
  let lastScrollTop = 0;
  let isScrollingDown = false;
  
  // Update scroll position attribute
  function updateScrollPosition() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    document.documentElement.setAttribute('data-scroll', scrollPosition);
    return scrollPosition;
  }
  
  // Initial check
  updateScrollPosition();
  
  // Handle scroll events
  window.addEventListener('scroll', function() {
    const scrollPosition = updateScrollPosition();
    
    // Determine scroll direction
    isScrollingDown = scrollPosition > lastScrollTop;
    
    // Add/remove scrolling-down class for animation
    if (isScrollingDown && scrollPosition > 100) {
      backToTopButton.classList.add('scrolling-down');
    } else {
      backToTopButton.classList.remove('scrolling-down');
    }
    
    lastScrollTop = scrollPosition <= 0 ? 0 : scrollPosition;
  }, { passive: true });
  
  // Show button immediately if not at top on page load
  if (window.pageYOffset > 0) {
    backToTopButton.classList.add('visible');
  }

  // Smooth scroll to top with easing
  backToTopButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
    
    const duration = 600; // ms
    const start = window.pageYOffset;
    const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
    
    function scroll() {
      const now = 'now' in window.performance ? performance.now() : new Date().getTime();
      const time = Math.min(1, ((now - startTime) / duration));
      const easedTime = easeInOutCubic(time);
      
      window.scroll(0, Math.ceil((1 - easedTime) * start));
      
      if (time < 1) {
        requestAnimationFrame(scroll);
      }
    }
    
    scroll();
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Enhanced Download CV button click handler with visual feedback
  const downloadCvBtn = document.getElementById('downloadCv');
  if (downloadCvBtn) {
    downloadCvBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Add loading state
      const btn = this;
      const btnText = btn.querySelector('.btn-text');
      const originalText = btnText.textContent;
      const icon = btn.querySelector('.btn-icon');
      
      // Disable button to prevent multiple clicks
      btn.style.pointerEvents = 'none';
      btnText.textContent = 'Preparing...';
      icon.classList.remove('fa-download');
      icon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
      
      try {
        // Path to your PDF file in the resources folder
        const pdfUrl = 'resources/Sangamnath_QA_Automation_Engineer_8197775778.pdf';
        console.log('Attempting to download file from:', pdfUrl);
        
        // Create a temporary link to trigger the download
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'Sangamnath_QA_Automation_Engineer_8197775778.pdf'; // Name of the downloaded file
        
        // Add link to document and trigger click
        document.body.appendChild(link);
        console.log('Link created and appended to body');
        
        // Add event listeners for debugging
        link.addEventListener('click', (e) => {
          console.log('Link clicked');
        });
        
        // Trigger the download
        link.click();
        console.log('Download triggered');
        
        // Clean up
        setTimeout(() => {
          document.body.removeChild(link);
          console.log('Link removed from DOM');
        }, 100);
        
        // Show success state
        btnText.textContent = 'Downloaded!';
        icon.innerHTML = '<i class="fas fa-check"></i>';
      } catch (error) {
        // Show error state
        console.error('Error downloading CV:', error);
        console.log('Button state:', {
          btnText: btnText.textContent,
          icon: icon.innerHTML,
          button: btn.outerHTML
        });
        btnText.textContent = 'Error!';
        icon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
        // Show error message to user
        alert('Failed to download CV. Please check console for details.');
      }
      
      // Re-enable button and reset after delay
      setTimeout(() => {
        btnText.textContent = originalText;
        icon.innerHTML = '<i class="fas fa-download"></i>';
        btn.style.pointerEvents = 'auto';
      }, 3000);
    });
  }

  // Initialize skill bars with percentages
  document.querySelectorAll('.skill-bar').forEach(bar => {
    const percent = bar.getAttribute('data-percent') || '0%';
    bar.style.width = percent;
    bar.setAttribute('aria-valuenow', parseInt(percent));
  });

  // Tech Stack Tabs Functionality
  const initTechTabs = () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const techCategories = document.querySelectorAll('.tech-category');
    
    // Function to switch tabs
    const switchTab = (tabId) => {
      console.log('Switching to tab:', tabId);
      
      // Remove active class from all buttons and categories
      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
        btn.setAttribute('tabindex', '-1');
      });
      
      techCategories.forEach(cat => {
        cat.classList.remove('active');
        cat.setAttribute('aria-hidden', 'true');
        cat.hidden = true;
      });
      
      // Add active class to selected tab and corresponding category
      const activeTab = document.querySelector(`.tab-btn[data-category="${tabId}"]`);
      const activeCategory = document.getElementById(`${tabId}-tab`);
      
      if (activeTab && activeCategory) {
        // Update active tab
        activeTab.classList.add('active');
        activeTab.setAttribute('aria-selected', 'true');
        activeTab.removeAttribute('tabindex');
        activeTab.focus();
        
        // Show active category
        activeCategory.classList.add('active');
        activeCategory.setAttribute('aria-hidden', 'false');
        activeCategory.hidden = false;
        
        // Animate the cards in the active category
        animateTechCards(activeCategory);
      }
    };
    
    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const category = button.getAttribute('data-category');
        console.log('Tab clicked:', category);
        switchTab(category);
        
        // Add click effect
        button.classList.add('clicked');
        setTimeout(() => button.classList.remove('clicked'), 300);
      });
      
      // Add keyboard navigation
      button.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const category = button.getAttribute('data-category');
          switchTab(category);
        } else if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const currentIndex = Array.from(tabButtons).indexOf(button);
          const direction = e.key === 'ArrowRight' ? 1 : -1;
          const nextIndex = (currentIndex + direction + tabButtons.length) % tabButtons.length;
          const nextTab = tabButtons[nextIndex];
          nextTab.focus();
          switchTab(nextTab.getAttribute('data-category'));
        }
      });
    });
    
    // Initialize first tab as active if none is active
    const activeTabs = document.querySelectorAll('.tab-btn.active');
    if (activeTabs.length === 0 && tabButtons.length > 0) {
      const firstTab = tabButtons[0].getAttribute('data-category');
      console.log('Initializing first tab:', firstTab);
      switchTab(firstTab);
    } else if (activeTabs.length > 0) {
      // If there's already an active tab, make sure its panel is visible
      const activeTab = activeTabs[0];
      const activeTabId = activeTab.getAttribute('data-category');
      console.log('Found active tab:', activeTabId);
      switchTab(activeTabId);
    }
  };
  
  // Animate tech cards in a category
  const animateTechCards = (category) => {
    if (!category) return;
    
    const cards = category.querySelectorAll('.tech-card');
    console.log(`Animating ${cards.length} cards in category:`, category.id);
    
    cards.forEach((card, index) => {
      // Reset animation
      card.style.animation = 'none';
      void card.offsetWidth; // Trigger reflow
      
      // Apply staggered animation
      setTimeout(() => {
        card.style.animation = 'fadeInUp 0.5s forwards';
        card.style.animationDelay = `${index * 0.05}s`;
      }, 10);
    });
  };
  
  // Initialize when DOM is fully loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTechTabs);
  } else {
    initTechTabs();
  }
  
  // Animate tech stack section when it comes into view
  const techStackSection = document.querySelector('.tech-stack');
  if (techStackSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          console.log('Tech stack section in view');
          const activeCategory = document.querySelector('.tech-category.active');
          if (activeCategory) {
            animateTechCards(activeCategory);
          } else {
            // If no active category, initialize tabs
            initTechTabs();
          }
        }
      });
    }, { threshold: 0.1 });
    
    observer.observe(techStackSection);
  }

  // Tech Stack initialization is complete
});
