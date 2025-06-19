import { apiRecipesDetails, apiRecipes, fetchRecipeDetails } from "../data/recipes.js";
import { renderRecipeDetailCard } from "./recipe.js";

if (apiRecipesDetails.length === 0) {
  fetchRecipeDetails();
}

export function renderRecipeDetail(recipe) {
  const recipeDetailContainer = document.querySelector(
    ".js-recipe-details-container"
  );
  recipeDetailContainer.innerHTML = renderRecipeDetailCard(recipe);
}

console.log("Recipe details rendered:", apiRecipesDetails);