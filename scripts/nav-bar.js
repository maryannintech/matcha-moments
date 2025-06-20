import { renderRecipes } from "./recipe.js";
import { apiRecipesDetails } from "../data/recipes.js";
import { renderFavoriteRecipes } from "./recipe-list.js";

document.querySelector(".bxs-home-alt").addEventListener("click", () => {
  window.location.href = "index.html";
});

const openNavBarElement = document.querySelector(".js-open-nav-bar");
const recipeListElement = document.querySelector(".js-recipe-list");

document.querySelector(".bxs-menu-wide").addEventListener("click", () => {
  openNavBarElement.classList.remove("hide");
});

document.querySelector(".js-close-nav-bar").addEventListener("click", () => {
  openNavBarElement.classList.add("hide");
});

document
  .querySelector(".js-favorite-icon-nav-bar")
  .addEventListener("click", () => {
    renderFavoriteRecipes();
  });
