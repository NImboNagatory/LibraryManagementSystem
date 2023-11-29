function initializeCarousel(containerSelector) {
  let sliderContainer = document.querySelector(containerSelector);
  if (!sliderContainer) return; // Exit if container not found
  
  let innerSlider = sliderContainer.querySelector('.inner-slider');
  if (!innerSlider) return; // Exit if inner slider not found

  let pressed = false;
  let startX;
  let x;
  let velocity = 0;
  let lastTime = 0;
  let lastX = 0;
  let rafID;

  sliderContainer.addEventListener('mousedown', (e) => {
    pressed = true;
    startX = e.offsetX - innerSlider.offsetLeft;
    velocity = 0;
    lastTime = Date.now();
    lastX = startX;
    cancelAnimationFrame(rafID);
  });

  sliderContainer.addEventListener('mouseup', () => {
    pressed = false;
    startInertiaScroll();
  });

  sliderContainer.addEventListener('mouseleave', () => {
    pressed = false;
    startInertiaScroll();
  });

  sliderContainer.addEventListener('mousemove', (e) => {
    if (!pressed) return;
    e.preventDefault();

    x = e.offsetX;
    innerSlider.style.left = `${x - startX}px`;
    calculateVelocity(x);
    checkBoundary();
  });

  // Touch events
  sliderContainer.addEventListener('touchstart', (e) => {
    pressed = true;
    startX = e.touches[0].clientX - innerSlider.offsetLeft;
    velocity = 0;
    lastTime = Date.now();
    lastX = startX;
    cancelAnimationFrame(rafID);
  }, { passive: true });

  sliderContainer.addEventListener('touchend', () => {
    pressed = false;
    startInertiaScroll();
  });

  sliderContainer.addEventListener('touchmove', (e) => {
    if (!pressed) return;
    e.preventDefault();

    x = e.touches[0].clientX;
    innerSlider.style.left = `${x - startX}px`;
    calculateVelocity(x);
    checkBoundary();
  }, { passive: false });

  const calculateVelocity = (currentX) => {
    let currentTime = Date.now();
    velocity = (currentX - lastX) / (currentTime - lastTime);
    lastX = currentX;
    lastTime = currentTime;
  };

  const checkBoundary = () => {
    let outer = sliderContainer.getBoundingClientRect();
    let inner = innerSlider.getBoundingClientRect();

    if (parseInt(innerSlider.style.left) > 0) {
      innerSlider.style.left = '0px';
    } else if (inner.right < outer.right) {
      innerSlider.style.left = `-${inner.width - outer.width}px`;
    }
  };

  const startInertiaScroll = () => {
    if (!pressed && velocity) {
      let inertia = setInterval(() => {
        if (Math.abs(velocity) < 0.1) {
          clearInterval(inertia);
        }
        let nextLeft = parseInt(innerSlider.style.left || '0') + velocity * 5;

        if (nextLeft > 0 || Math.abs(nextLeft) > innerSlider.offsetWidth - sliderContainer.offsetWidth) {
          velocity = 0;
          checkBoundary();
        } else {
          innerSlider.style.left = `${nextLeft}px`;
        }

        velocity *= 0.95;
      }, 10);
    }
  };

  const animate = () => {
    if (pressed) {
      innerSlider.style.left = `${x - startX}px`;
      checkBoundary();
    }
    rafID = requestAnimationFrame(animate);
  };

  rafID = requestAnimationFrame(animate);
}




// Initialize carousels on document ready
document.addEventListener('DOMContentLoaded', () => {
  const carouselSections = document.querySelectorAll('.carousel_section');
  const catrgoryBTN = document.getElementById("category_select")
  const searchcat = document.getElementById("search_categorys")

  // Iterate over the NodeList and add a new class with index
  carouselSections.forEach((section, index) => {
    const containerClass = `slider-container${index}`;
    section.classList.add(containerClass);
    initializeCarousel(`.${containerClass}`);
  });

  catrgoryBTN.addEventListener("click", ()=>{
    if (catrgoryBTN.textContent === "All⮟"){
      searchcat.style = "display:flex;"
      catrgoryBTN.textContent = "All⮝"
    } else {
      searchcat.style = "display:none;"
      catrgoryBTN.textContent = "All⮟"
    }
  })
});





