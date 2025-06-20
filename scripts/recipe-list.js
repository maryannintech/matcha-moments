import {
  apiRecipes,
  fetchRecipes,
  fetchRecipeDetails,
  apiRecipesDetails,
} from "../data/recipes.js";
import { renderRecipes } from "./recipe.js";

async function loadRecipes() {
  if (apiRecipesDetails.length === 0) {
    await fetchRecipeDetails();
  }
}

loadRecipes();

export function renderRecipeList() {
  const recipeListContainer = document.querySelector(".recipes-container");
  apiRecipesDetails.forEach((recipe) => {
    console.log("Recipe details:", recipe);
    const recipeCardHTML = renderRecipes(recipe);
    recipeListContainer.innerHTML += recipeCardHTML;
  });
  document.querySelectorAll(".js-recipe-card").forEach((recipeCard) => {
    recipeCard.addEventListener("click", () => {
      const recipeId = recipeCard.dataset.recipeId;
      window.location.href = `recipe.html?id=${recipeId}`;
    });
  });

  document.querySelectorAll(".js-favorite-icon").forEach((favoriteIcon) => {
    console.log("Favorite icon:", favoriteIcon);
  });
}
