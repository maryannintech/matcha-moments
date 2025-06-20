import {
  fetchRecipeDetails,
  apiRecipesDetails,
  fetchRecipes,
  allRecipes
} from "../data/recipes.js";
import { renderRecipes } from "./recipe.js";
import { renderRecipesByCategory } from "./filter.js";

export async function loadRecipes() {
  if (apiRecipesDetails.length === 0) {
    await fetchRecipes();
    await fetchRecipeDetails();
  }
  console.log("Loaded recipes:", apiRecipesDetails);
}

loadRecipes();

const recipeListContainer = document.querySelector(".recipes-container");
const recipeDetailListContainer = document.querySelector(
  ".js-recipe-details-container"
);

document.querySelectorAll(".filter-btn").forEach((filterBtn) => {
  filterBtn.addEventListener("click", () => {
    const filterId = filterBtn.dataset.filterId;
    renderRecipesByCategory(filterId);
  })
})

export function renderRecipeList() {
  apiRecipesDetails.forEach((recipe) => {
    const recipeCardHTML = renderRecipes(recipe);
    recipeListContainer.innerHTML += recipeCardHTML;
  });
  recipeCardClick();
}

export function recipeCardClick() {
  document.querySelectorAll(".js-recipe-card").forEach((recipeCard) => {
    recipeCard.addEventListener("click", () => {
      const recipeId = recipeCard.dataset.recipeId;
      window.location.href = `recipe.html?id=${recipeId}`;
    });
  });
}

export function renderFavoriteRecipes() {
  if (recipeListContainer) {
    recipeListContainer.innerHTML = "";
    allRecipes.forEach((recipe) => {
      if (recipe.favorite) {
        const favoriteRecipeCardHTML = renderRecipes(recipe);
        recipeListContainer.innerHTML += favoriteRecipeCardHTML;
      }
    });
  } else if (recipeDetailListContainer) {
    recipeDetailListContainer.innerHTML = "";
    allRecipes.forEach((recipe) => {
      if (recipe.favorite) {
        const favoriteRecipeCardHTML = renderRecipes(recipe);
        recipeDetailListContainer.innerHTML += favoriteRecipeCardHTML;
      }
    });
  }
  recipeCardClick();
}