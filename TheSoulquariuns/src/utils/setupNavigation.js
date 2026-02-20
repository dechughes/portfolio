import { scrollToSection, updateDots, updateArrows, currentSection } from './navigation.js';

export function setupNavigationListeners() {
  // Wheel navigation
  window.addEventListener('wheel', (e) => {
    const sections = document.querySelectorAll('[id^="section"]');
    const currentSectionEl = sections[currentSection];
    
    if (currentSectionEl) {
      const hasVerticalScroll = currentSectionEl.scrollHeight > currentSectionEl.clientHeight;
      
      if (hasVerticalScroll) {
        const scrollTop = currentSectionEl.scrollTop;
        const maxScroll = currentSectionEl.scrollHeight - currentSectionEl.clientHeight;
        
        if ((scrollTop > 0 && scrollTop < maxScroll) || 
            (scrollTop === 0 && e.deltaY > 0) || 
            (scrollTop === maxScroll && e.deltaY < 0)) {
          return;
        }
      }
    }
    
    if (e.deltaY > 0 && currentSection < sections.length - 1) {
      scrollToSection(currentSection + 1);
    } else if (e.deltaY < 0 && currentSection > 0) {
      scrollToSection(currentSection - 1);
    }
  }, { passive: false });

  // Dot navigation
  const dots = document.querySelectorAll('#dot-nav .rounded-full');
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => scrollToSection(index));
  });

  // Scroll event listener
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollX;
    const windowWidth = window.innerWidth;
    const index = Math.round(scrollPosition / windowWidth);
    if (index !== currentSection) {
      updateDots(index);
      updateArrows();
    }
  });
}
