import {
  fetchRecipeDetails,
  apiRecipesDetails,
  fetchRecipes,
} from "../data/recipes.js";
import { renderRecipes } from "./recipe.js";

export async function loadRecipes() {
  if (apiRecipesDetails.length === 0) {
    await fetchRecipes();
    await fetchRecipeDetails();
  }
  console.log("Loaded recipes:", apiRecipesDetails);
}

loadRecipes();

const recipeListContainer = document.querySelector(".recipes-container");

export function renderRecipeList() {
  apiRecipesDetails.forEach((recipe) => {
    const recipeCardHTML = renderRecipes(recipe);
    recipeListContainer.innerHTML += recipeCardHTML;
  });
  recipeCardClick();
}

function recipeCardClick() {
  document.querySelectorAll(".js-recipe-card").forEach((recipeCard) => {
    recipeCard.addEventListener("click", () => {
      const recipeId = recipeCard.dataset.recipeId;
      window.location.href = `recipe.html?id=${recipeId}`;
    });
  });
}

export function renderFavoriteRecipes() {
  recipeListContainer.innerHTML = "";
  apiRecipesDetails.forEach((recipe) => {
    if (recipe.favorite) {
      const favoriteRecipeCardHTML = renderRecipes(recipe);
      recipeListContainer.innerHTML += favoriteRecipeCardHTML;
    }
  });

  recipeCardClick();
}

export function renderRecipesByCategory(category) {
  recipeListContainer.innerHTML = "";
  apiRecipesDetails.forEach((recipe) => {
    if (recipe.category === category) {
      const categoryRecipeCardHTML = renderRecipes(recipe);
      recipeListContainer.innerHTML += categoryRecipeCardHTML;
    }
  });

  recipeCardClick();
}
