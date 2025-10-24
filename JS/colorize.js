document.addEventListener('DOMContentLoaded', function() {
  var root = document.documentElement;
  var ticking = false;

  // Get the main container that has the scroll (might be html or body)
  var scrollContainer = document.scrollingElement || document.documentElement;
  // Background shift for body::before multi-layer background
  // (we set --bg_shift in px to move the stacked layers)
  
  function setVhVar() {
    var vh = window.innerHeight || document.documentElement.clientHeight || 800;
    root.style.setProperty('--vh', vh + 'px');
  }

  function update() {
    // Get current scroll position
    var scrollTop = scrollContainer.scrollTop || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    // Get the total scrollable height
    var scrollHeight = Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.body.clientHeight,
      document.documentElement.clientHeight
    ) - window.innerHeight;
    
    // Ensure we don't divide by zero
    if (scrollHeight <= 0) {
      console.log('Scroll height is zero, setting grayscale to 100%');
      root.style.setProperty('--bw', '100%');
      return;
    }
    
    // Calculate progress (0 at top, 1 at bottom)
    var progress = Math.min(Math.max(scrollTop / scrollHeight, 0), 1);
    // Ease-out cubic for faster initial reveal and smooth finish
    // eased = 1 - (1 - t)^3
    var eased = 1 - Math.pow(1 - progress, 3);
    
    // Convert to grayscale percentage (100% at top, 0% at bottom)
    var grayscaleValue = 100 - Math.round(eased * 100);
    
    // Update CSS variables
    root.style.setProperty('--bw', grayscaleValue + '%');
    // Shared background position for section gradients (keep for sections)
    var bgPosition = (100 - (eased * 100)).toFixed(2) + '%';
    root.style.setProperty('--bgp', bgPosition);

    // Shift the multi-layer body background (4 layers => shift across 3 viewports)
    var shiftPx = -(eased * 3 * window.innerHeight);
    root.style.setProperty('--bg_shift', shiftPx.toFixed(2) + 'px');
    
    // For debugging
    console.log('Scroll:', scrollTop.toFixed(0), '/', scrollHeight.toFixed(0), 'Grayscale:', grayscaleValue + '%', 'BG Pos:', bgPosition, 'BG Shift:', shiftPx.toFixed(2) + 'px');
    
    ticking = false;
  }
  
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }
  
  // Initial setup
  setVhVar();
  update();
  
  // Add event listeners - try both window and document
  window.addEventListener('scroll', onScroll, { passive: true, capture: true });
  document.addEventListener('scroll', onScroll, { passive: true, capture: true });
  window.addEventListener('resize', onScroll, { passive: true });
  window.addEventListener('resize', setVhVar, { passive: true });
  window.addEventListener('orientationchange', setVhVar, { passive: true });
  
  // Fallback: force update on a timer
  setInterval(update, 200);
  
  // Also update after a short delay to catch any late-loading content
  setTimeout(update, 500);
  setTimeout(update, 1000);
  
  // Debug: log the scroll container
  console.log('Using scroll container:', scrollContainer);
});
