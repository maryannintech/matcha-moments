import {
  fetchRecipeDetails,
  apiRecipesDetails,
  fetchRecipes,
  allRecipes,
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
const recipeListFormContainer = document.querySelector(
  ".js-form-container"
);
const feedbackCategory = document.querySelector(".js-feedback-category");

document.querySelectorAll(".filter-btn").forEach((filterBtn) => {
  filterBtn.addEventListener("click", () => {
    const filterId = filterBtn.dataset.filterId;
    renderRecipesByCategory(filterId);
  });
});

export function renderRecipeList() {
  allRecipes.forEach((recipe) => {
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
  let favoriteRecipes = [];
  feedbackCategory.innerHTML = "";
  if (recipeListContainer) {
    recipeListContainer.innerHTML = "";
    favoriteRecipes = returnFavoriteRecipes();
    favoriteRecipes.forEach((recipe) => {
      const favoriteRecipeCardHTML = renderRecipes(recipe);
      recipeListContainer.innerHTML += favoriteRecipeCardHTML;
    });
  } else if (recipeDetailListContainer) {
    recipeDetailListContainer.innerHTML = "";
    favoriteRecipes = returnFavoriteRecipes();
    favoriteRecipes.forEach((recipe) => {
      const favoriteRecipeCardHTML = renderRecipes(recipe);
      recipeDetailListContainer.innerHTML += favoriteRecipeCardHTML;
    });
  } else if (recipeListFormContainer) {
    recipeListFormContainer.innerHTML = "";
    favoriteRecipes = returnFavoriteRecipes();
    favoriteRecipes.forEach((recipe) => {
      const favoriteRecipeCardHTML = renderRecipes(recipe);
      recipeListFormContainer.innerHTML += favoriteRecipeCardHTML;
    });
  }

  if (favoriteRecipes.length === 0) {
    feedbackCategory.innerHTML = `
      <p class="feedback-message">
        <span class="feedback-category-emphasis">Nothing here yet!</span>
        No favorite recipes found
      </p>
    `;
  }

  document.title = "my favorites | matcha moments";
  recipeCardClick();
}

function returnFavoriteRecipes() {
  let favoriteRecipes = allRecipes.filter((recipe) => {
    return recipe.favorite;
  });
  return favoriteRecipes;
}
