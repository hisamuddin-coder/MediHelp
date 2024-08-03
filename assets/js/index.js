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
//////////////// animation section /////////////////////
const about = document.getElementById("about");
const aboutContent = document.querySelector(".about-content");
const aboutShowcase = document.querySelector(".about-showcase");

const handleAbout = (entries, observer) => {
  const [entry] = entries;
  /*
  if (entry.isIntersecting) {
    aboutContent.classList.add("in-view");
    aboutShowcase.classList.add("in-view");
    // Unobserve the element once it is in view
    observer.unobserve(entry.target);
  } else {
    aboutContent.classList.remove("in-view");
    aboutShowcase.classList.remove("in-view");
  }*/
  entry.isIntersecting
    ? (aboutContent.classList.add("in-view"),
      aboutShowcase.classList.add("in-view"),
      observer.unobserve(entry.target))
    : (aboutContent.classList.remove("in-view"),
      aboutShowcase.classList.remove("in-view"));
};

const aboutObserver = new IntersectionObserver(handleAbout, {
  root: null,
  threshold: 0.2,
});

aboutObserver.observe(about);
//////////////// SLIDER /////////////////////
document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelectorAll(".slide");
  const sliderContainer = document.querySelector(".slider-container");
  const leftButton = document.querySelector(".btn-left");
  const rightButton = document.querySelector(".btn-right");
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

//////////////// TABBED COMPONENT  /////////////////////

const tabs = document.querySelectorAll(".tab");
const tabContainer = document.querySelector(".tabs");
const tabContents = document.querySelectorAll(".tab-content");
const tabBtnRight = document.querySelector(".tab-btn-right");
const tabBtnLeft = document.querySelector(".tab-btn-left");

let curTabIndex = 0;
const totalTabs = tabs.length;

function updateTab() {
  tabs.forEach((tab, index) =>
    tab.classList.toggle("active", index === curTabIndex)
  );
  tabContents.forEach((content) => content.classList.remove("active"));
  const activeContent = document.querySelector(
    `.tab-content-${curTabIndex + 1}`
  );
  if (activeContent) {
    activeContent.classList.add("active");
  }
}

tabContainer.addEventListener("click", (e) => {
  const clickedTab = e.target.closest(".tab");
  if (clickedTab) {
    curTabIndex = Array.from(tabs).indexOf(clickedTab);
    updateTab();
  }
});

tabBtnRight.addEventListener("click", () => {
  curTabIndex = (curTabIndex + 1) % totalTabs;
  updateTab();
});

tabBtnLeft.addEventListener("click", () => {
  curTabIndex = (curTabIndex - 1 + totalTabs) % totalTabs;
  updateTab();
});

updateTab();
