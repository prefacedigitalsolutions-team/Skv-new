
// loder section start
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.transition = "opacity 0.5s ease";
  loader.style.opacity = 0;
  setTimeout(() => {
    loader.style.display = "none";
  }, 500);
});

// loder section End




// mouse hover animatio start

document.addEventListener("DOMContentLoaded", () => {

  const lens = document.querySelector(".global-lens");
  const zoom = document.querySelector(".zoom-layer");

  /* 👉 agar lens exist nahi karta (mobile) to JS band */
  if (!lens || !zoom) return;

  // actual mouse position
  let mouseX = 0;
  let mouseY = 0;

  // rendered lens position
  let currentX = 0;
  let currentY = 0;

  const ZOOM = 1.9;
  const LERP = 0.10;
  const SNAP = 0.0001;

  zoom.style.backgroundImage = `url(${window.location.href})`;

  function animate() {
    currentX += (mouseX - currentX) * LERP;
    currentY += (mouseY - currentY) * LERP;

    if (Math.abs(mouseX - currentX) < SNAP) currentX = mouseX;
    if (Math.abs(mouseY - currentY) < SNAP) currentY = mouseY;

    lens.style.left = currentX + "px";
    lens.style.top = currentY + "px";

    zoom.style.backgroundPosition =
      `${-currentX * ZOOM}px ${-currentY * ZOOM}px`;

    requestAnimationFrame(animate);
  }

  document.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  animate();
});

// mouse hover animatio start





// nav bar section start

const toggle = document.getElementById("toggle");
const sidebar = document.getElementById("sidebar");

// Toggle sidebar on button click
toggle.addEventListener("click", (e) => {
  e.stopPropagation(); // Prevent click from bubbling
  toggle.classList.toggle("active");
  sidebar.classList.toggle("active");
});

// Close sidebar when clicking outside
document.addEventListener("click", (e) => {
  if (sidebar.classList.contains("active") && !sidebar.contains(e.target) && e.target !== toggle) {
    sidebar.classList.remove("active");
    toggle.classList.remove("active");
    closeAllDropdowns(); // close any open dropdown
  }
});

// Prevent sidebar clicks from closing itself

sidebar.addEventListener("click", (e) => {
  e.stopPropagation();
});

// Dropdown toggle for all dropdowns (multiple safe)
const dropdowns = document.querySelectorAll(".dropdown");

dropdowns.forEach(drop => {
  drop.addEventListener("click", (e) => {
    e.stopPropagation();
    drop.classList.toggle("active");
  });
});

// Function to close all dropdowns

function closeAllDropdowns() {
  dropdowns.forEach(drop => drop.classList.remove("active"));
}

// nav bar section End




//banar section start

document.addEventListener("DOMContentLoaded", function () {

  const slides = document.querySelectorAll('.slide');
  let index = 0;

  function playSlide() {
    if (slides.length === 0) return;

    const current = slides[index];
    const texts = current.querySelectorAll('.text');

    // STEP 1: Activate current slide & show text
    current.classList.add('active');
    current.classList.remove('open');
    texts.forEach(t => t.classList.remove('hide'));

    // Duration settings (CSS ke sath sync)
    const doorDuration = 1600;
    const visibleTime = 4000;
    const imageTime = 3000;

    // STEP 2: Open doors
    setTimeout(() => {
      current.classList.add('open');
    }, visibleTime);

    // STEP 3: Close doors
    setTimeout(() => {
      current.classList.remove('open');
    }, visibleTime + imageTime);

    // STEP 4: Prepare next slide
    setTimeout(() => {
      current.classList.remove('active');

      index = (index + 1) % slides.length;
      const nextSlide = slides[index];
      const nextTexts = nextSlide.querySelectorAll('.text');

      nextSlide.classList.add('active');
      nextSlide.classList.remove('open');
      nextTexts.forEach(t => t.classList.remove('hide'));

    }, visibleTime + imageTime + doorDuration);

    // STEP 5: Open next slide doors
    setTimeout(() => {
      slides[index].classList.add('open');
    }, visibleTime + imageTime + doorDuration + 400);

    // LOOP
    setTimeout(() => {
      playSlide();
    }, visibleTime + imageTime + doorDuration + 400 + imageTime);
  }

  // START SLIDER
  playSlide();

});

// banar section end






// home about section start

document.addEventListener("DOMContentLoaded", () => {
  const cube = document.getElementById("autoCube");
  const section = document.querySelector(".cube-text-section");

  if (!cube || !section) return;

  let angle = 0;
  let isVisible = false;
  let lastRotationTime = 0;
  const ROTATION_DELAY = 2600; // milliseconds

  function animate(time) {
    // section visible nahi hai → rotate mat karo
    if (!isVisible) {
      lastRotationTime = time;
      requestAnimationFrame(animate);
      return;
    }

    // delay complete hone ke baad hi rotate
    if (time - lastRotationTime >= ROTATION_DELAY) {
      angle -= 90;
      cube.style.transform = `rotateY(${angle}deg)`;
      lastRotationTime = time;
    }

    requestAnimationFrame(animate);
  }

  // Intersection Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible = true;
          section.classList.add("section-visible");
          lastRotationTime = performance.now(); // timing reset
        } else {
          isVisible = false;
        }
      });
    },
    { threshold: 0.35 }
  );

  observer.observe(section);

  // animation loop start (sirf ek baar)
  requestAnimationFrame(animate);
});


// home about section end




// static images counter section start

document.addEventListener("DOMContentLoaded", function () {

  const impactSection = document.querySelector(".impact-stats");
  const counters = document.querySelectorAll(".impact-value");

  if (!impactSection || counters.length === 0) return;

  let counterStarted = false;

  /* ===============================
     COUNTER ANIMATION
     =============================== */
  function startCounters() {
    counters.forEach(counter => {

      const finalText = counter.innerText.trim();
      const isPercent = finalText.includes("%");
      const isPlus = finalText.includes("+");

      const target = parseInt(finalText.replace(/\D/g, ""));
      let current = 0;

      const duration = 1800; // total animation time
      const step = Math.max(1, Math.floor(target / (duration / 16)));

      function update() {
        current += step;

        if (current >= target) {
          counter.innerText = isPercent
            ? target + "%"
            : isPlus
            ? target + "+"
            : target;
        } else {
          counter.innerText = isPercent
            ? current + "%"
            : isPlus
            ? current + "+"
            : current;

          requestAnimationFrame(update);
        }
      }

      update();
    });
  }

  /* ===============================
     SCROLL REVEAL
     =============================== */
  const observer = new IntersectionObserver(
    function (entries, obs) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          impactSection.classList.add("active");

          if (!counterStarted) {
            startCounters();
            counterStarted = true;
          }

          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.35,
      rootMargin: "0px 0px -120px 0px"
    }
  );

  observer.observe(impactSection);

});


// static images counter section end




// product section start



document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.featured-section').forEach(section => {

    const mainImage   = section.querySelector('#main-image');
    const mainLink    = section.querySelector('.main-link');
    const sliderInner = section.querySelector('.small-slider-inner');
    const boxes       = [...section.querySelectorAll('.small-box')];

    if (!mainImage || !sliderInner || boxes.length === 0) return;

    // ✅ UNIQUE PRODUCTS (by data-index)
    const productsMap = new Map();

    boxes.forEach(box => {
      const index = parseInt(box.dataset.index, 10);
      if (!productsMap.has(index)) {
        productsMap.set(index, {
          img: box.querySelector('img').src,
          link: box.querySelector('a')?.href || '#'
        });
      }
    });

    const products = [...productsMap.values()];
    const total = products.length;
    const boxWidth = 220;
    let position = 0;

    function updateMain(index) {
      mainImage.style.opacity = 0;
      setTimeout(() => {
        mainImage.src = products[index].img;
        mainLink.href = products[index].link;
        mainImage.style.opacity = 1;
      }, 300);
    }

    function slide() {
      position++;

      sliderInner.style.transition = 'transform 0.5s ease';
      sliderInner.style.transform = `translateX(-${position * boxWidth}px)`;

      updateMain(position % total);

      // 🔁 infinite reset
      if (position >= total) {
        setTimeout(() => {
          sliderInner.style.transition = 'none';
          position = 0;
          sliderInner.style.transform = 'translateX(0)';
        }, 500);
      }
    }

    setInterval(slide, 3000);

    // ✅ click sync (all 6 work perfectly)
    boxes.forEach(box => {
      box.addEventListener('click', () => {
        const idx = parseInt(box.dataset.index, 10);
        position = idx;
        updateMain(idx);

        sliderInner.style.transition = 'transform 0.5s ease';
        sliderInner.style.transform = `translateX(-${position * boxWidth}px)`;
      });
    });

  });
});



// product section End








// service section start 

document.addEventListener("DOMContentLoaded", function () {
  const items = document.querySelectorAll(".service-item");
  const images = document.querySelectorAll(".service-image");

  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const index = item.getAttribute("data-index");

      items.forEach((i) => i.classList.remove("active"));
      images.forEach((img) => img.classList.remove("active"));

      item.classList.add("active");
      images[index].classList.add("active");
    });
  });
});


// service section end



// about section comapny start




