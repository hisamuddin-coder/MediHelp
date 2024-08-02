"use strict";
//////////////// SELECTORS /////////////////////
const navToggle = document.querySelector(".nav-toggle");
const navContainer = document.querySelector(".nav-links-container");
const navLinks = document.querySelector(".nav-links");

navToggle.addEventListener("click", () => {
  const linksHeight = navLinks.getBoundingClientRect().height;
  const navContainerHeight = navContainer.getBoundingClientRect().height;

  navContainer.style.height = navContainerHeight === 0 ? `${linksHeight}px` : 0;
  navToggle.classList.toggle("active", navContainerHeight === 0);
});
