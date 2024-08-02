"use strict";
//////////////// SELECTORS /////////////////////
const navToggle = document.querySelector(".nav-toggle");
const navContainer = document.querySelector(".nav-links-container");
const navLinks = document.querySelector(".nav-links");

//////////////// NAVBAR /////////////////////
navToggle.addEventListener("click", () => {
  const linksHeight = navLinks.getBoundingClientRect().height;
  const navContainerHeight = navContainer.getBoundingClientRect().height;

  navContainer.style.height = navContainerHeight === 0 ? `${linksHeight}px` : 0;
  navToggle.classList.toggle("active", navContainerHeight === 0);
});

//////////////// STICKY NAV /////////////////////
const header = document.querySelector("header");
const nav = document.querySelector(".nav");
const navHeight = nav.getBoundingClientRect().height;

const handleNavFixed = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("fixed-nav");
  else nav.classList.remove("fixed-nav");
};

const headerObserver = new IntersectionObserver(handleNavFixed, {
  root: null,
  threshold: 0,
  rootMargin: "",
});
headerObserver.observe(header);

//////////////// SLIDER /////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const sliderContainer = document.querySelector(".slider-container");
  //   const slider = document.querySelector(".slider");
  const leftButton = document.querySelector(".left");
  const rightButton = document.querySelector(".right");
  const paginator = document.querySelector(".paginator-container");

  let curIndex = 0;
  const totalSlides = slides.length;

  slides.forEach((_, i) => {
    const button = document.createElement("button");
    button.dataset.index = i;
    if (i === 0) button.classList.add("active");
    paginator.appendChild(button);
  });

  const paginatorButtons = paginator.querySelectorAll("button");

  function updateSlider() {
    sliderContainer.style.transform = `translateX(${-100 * curIndex}%)`;
    paginatorButtons.forEach((button, index) => {
      button.classList.toggle("active", index === curIndex);
    });
  }

  function showNextSlide() {
    curIndex = (curIndex + 1) % totalSlides;
    updateSlider();
  }

  function showPreviousSlide() {
    curIndex = (curIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
  }

  function goToSlide(index) {
    curIndex = index;
    updateSlider();
  }

  rightButton.addEventListener("click", showNextSlide);
  leftButton.addEventListener("click", showPreviousSlide);

  paginatorButtons.forEach((button) => {
    button.addEventListener("click", () => {
      goToSlide(parseInt(button.dataset.index));
    });
  });

  setInterval(showNextSlide, 3000);
});
