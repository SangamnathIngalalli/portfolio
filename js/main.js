console.log('main.js loaded');

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
  console.log('Initializing parallax effect...');
  const cards = document.querySelectorAll('.project-card');
  console.log('Found', cards.length, 'project cards');
  
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
  
  // Initialize parallax effect for project cards
  initParallaxEffect();
  
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

  // BULLETPROOF Back to Top Button Implementation
  console.log('=== INITIALIZING BULLETPROOF BACK-TO-TOP BUTTON ===');
  
  function initBackToTopButton() {
    const button = document.getElementById('backToTopBtn');
    
    if (!button) {
      console.error('❌ Back-to-top button not found with ID: backToTopBtn');
      return;
    }
    
    console.log('✅ Back-to-top button found');
    
    // Force initial state
    button.style.display = 'none';
    button.style.visibility = 'hidden';
    button.style.opacity = '0';
    button.style.pointerEvents = 'none';
    
    // Create a robust scroll handler
    let scrollTimeout;
    const handleScroll = function() {
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        console.log('📊 Current scroll position:', scrollTop);
        
        if (scrollTop > 200) {
          // Show button with multiple style properties
          button.style.display = 'block';
          button.style.visibility = 'visible';
          button.style.opacity = '1';
          button.style.pointerEvents = 'auto';
          button.style.transform = 'scale(1)';
          console.log('✅ Button shown at position:', scrollTop);
        } else {
          // Hide button with multiple style properties
          button.style.display = 'none';
          button.style.visibility = 'hidden';
          button.style.opacity = '0';
          button.style.pointerEvents = 'none';
          button.style.transform = 'scale(0.8)';
          console.log('❌ Button hidden at position:', scrollTop);
        }
      }, 10); // Small delay to prevent excessive updates
    };
    
    // Add scroll listener with passive option for performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Create a robust click handler
    const handleClick = function(e) {
      e.preventDefault();
      e.stopPropagation();
      
      console.log('🚀 Scrolling to top');
      
      // Disable button during scroll
      button.style.pointerEvents = 'none';
      button.style.opacity = '0.7';
      
      // Smooth scroll to top
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      
      // Re-enable button after scroll completes
      setTimeout(() => {
        button.style.pointerEvents = 'auto';
        button.style.opacity = '1';
      }, 1000);
    };
    
    // Add click listener
    button.addEventListener('click', handleClick);
    
    // Test functionality after 2 seconds
    setTimeout(() => {
      console.log('🧪 TESTING: Forcing button to show');
      button.style.display = 'block';
      button.style.visibility = 'visible';
      button.style.opacity = '1';
      button.style.pointerEvents = 'auto';
      
      setTimeout(() => {
        console.log('🧪 TESTING: Forcing button to hide');
        button.style.display = 'none';
        button.style.visibility = 'hidden';
        button.style.opacity = '0';
        button.style.pointerEvents = 'none';
      }, 2000);
    }, 2000);
    
    console.log('✅ Back-to-top button initialization complete');
  }
  
  // Initialize back-to-top button
  initBackToTopButton();

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
