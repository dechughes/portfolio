export let currentSection = 0;
let isScrolling = false;

export function scrollToSection(index) {
  if (isScrolling) return;
  isScrolling = true;
  currentSection = index;
  
  const scrollPosition = window.innerWidth * index;
  window.scrollTo({
    left: scrollPosition,
    behavior: 'smooth'
  });
  
  updateDots(index);
  updateArrows();
  setTimeout(() => { isScrolling = false; }, 800);
}

export function updateDots(index) {
  const dots = document.querySelectorAll('#dot-nav .rounded-full');
  dots.forEach((dot, i) => {
    if (i === index) {
      dot.classList.remove('bg-gray-400');
      dot.classList.add('bg-slate-50');
    } else {
      dot.classList.remove('bg-slate-50');
      dot.classList.add('bg-gray-400');
    }
  });
}

export function scrollPage(direction) {
  const sections = document.querySelectorAll('[id^="section"]');
  if (direction === 'next' && currentSection < sections.length - 1) {
    scrollToSection(currentSection + 1);
  } else if (direction === 'prev' && currentSection > 0) {
    scrollToSection(currentSection - 1);
  }
}

export function updateArrows() {
  const prevArrow = document.querySelector('.swipe-button-prev');
  const nextArrow = document.querySelector('.swipe-button-next');
  const sections = document.querySelectorAll('[id^="section"]');

  if (currentSection === 0) {
    prevArrow?.classList.add('opacity-50', 'cursor-not-allowed');
    prevArrow?.classList.remove('cursor-pointer');
  } else {
    prevArrow?.classList.remove('opacity-50', 'cursor-not-allowed');
    prevArrow?.classList.add('cursor-pointer');
  }

  if (currentSection === sections.length - 1) {
    nextArrow?.classList.add('opacity-50', 'cursor-not-allowed');
    nextArrow?.classList.remove('cursor-pointer');
  } else {
    nextArrow?.classList.remove('opacity-50', 'cursor-not-allowed');
    nextArrow?.classList.add('cursor-pointer');
  }
}

export function toggleMenu() {
  const sideNav = document.getElementById('side-nav');
  if (sideNav.classList.contains('-translate-x-full')) {
    sideNav.classList.remove('-translate-x-full');
    sideNav.classList.add('translate-x-0');
  } else {
    sideNav.classList.remove('translate-x-0');
    sideNav.classList.add('-translate-x-full');
  }
}