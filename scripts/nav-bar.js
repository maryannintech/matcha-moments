import { renderFavoriteRecipes } from "./recipe-list.js";

document.querySelector(".bxs-home-alt").addEventListener("click", () => {
  window.location.href = "index.html";
});

const openNavBarElement = document.querySelector(".js-open-nav-bar");

document.querySelector(".bxs-menu-wide").addEventListener("click", () => {
  openNavBarElement.classList.remove("hide");
});

document.querySelector(".js-my-favorites-nav-bar").addEventListener("click", () => {
  openNavBarElement.classList.add("hide");
  renderFavoriteRecipes();
})

document.querySelector(".js-close-nav-bar").addEventListener("click", () => {
  openNavBarElement.classList.add("hide")
});

document
  .querySelector(".js-favorite-icon-nav-bar")
  .addEventListener("click", () => {
    renderFavoriteRecipes();
  });

document.querySelector(".js-logo-nav-bar").addEventListener("click", () => {
  window.location.href = "index.html";
})
