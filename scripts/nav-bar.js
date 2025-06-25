import { renderFavoriteRecipes, renderSearchResults } from "./recipe-list.js";
import { capitalizeFirstLetter } from "./utils/format-text.js";

document.querySelector(".bxs-home-alt").addEventListener("click", () => {
  window.location.href = "index.html";
});

const openNavBarElement = document.querySelector(".js-open-nav-bar");

document.querySelector(".bxs-menu-wide").addEventListener("click", () => {
  openNavBarElement.classList.remove("hide");
});

document
  .querySelector(".js-my-favorites-nav-bar")
  .addEventListener("click", () => {
    openNavBarElement.classList.add("hide");
    renderFavoriteRecipes();
  });

document.querySelector(".js-close-nav-bar").addEventListener("click", () => {
  openNavBarElement.classList.add("hide");
});

document
  .querySelector(".js-favorite-icon-nav-bar")
  .addEventListener("click", () => {
    renderFavoriteRecipes();
  });

document.querySelector(".js-logo-nav-bar").addEventListener("click", () => {
  window.location.href = "index.html";
});

document
  .querySelector(".js-upload-recipe-nav-bar")
  .addEventListener("click", () => {
    window.location.href = "form.html";
  });

const searchElement = document.querySelector(".js-search-bar");

searchElement.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    renderSearchResults(capitalizeFirstLetter(searchElement.value));
    searchElement.value = "";
  }
});

document.querySelector(".js-button-up").addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
