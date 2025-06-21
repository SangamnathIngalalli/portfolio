// Lazy load images and iframes
document.addEventListener('DOMContentLoaded', function() {
  // Loading animation
  const loadingAnimation = document.createElement('div');
  loadingAnimation.className = 'page-loader';
  loadingAnimation.innerHTML = `
    <div class="loader-spinner"></div>
  `;
  document.body.prepend(loadingAnimation);

  // Hide loader when page is fully loaded
  window.addEventListener('load', function() {
    setTimeout(() => {
      loadingAnimation.style.opacity = '0';
      setTimeout(() => {
        loadingAnimation.style.display = 'none';
      }, 500);
    }, 300);
  });

  // Lazy load images with Intersection Observer
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const lazyIframes = document.querySelectorAll('iframe[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          img.onload = () => img.classList.add('loaded');
          observer.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
    lazyIframes.forEach(iframe => {
      iframe.addEventListener('load', () => {
        iframe.classList.add('loaded');
      });
      iframe.src = iframe.dataset.src;
      iframe.removeAttribute('data-src');
    });
  }
});
