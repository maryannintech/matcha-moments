import { apiRecipesDetails, apiRecipes, fetchRecipeDetails } from "../data/recipes.js";
import { renderRecipeDetailCard } from "./recipe.js";

const params = new URLSearchParams(window.location.search);
const recipeId = params.get("id");

if (apiRecipesDetails.length === 0) {
  fetchRecipeDetails();
}

if (apiRecipes.length > 0 && recipeId) {
    const recipe = apiRecipesDetails.find((recipe) => recipe.id === recipeId);
    if (recipe) {
        renderRecipeDetail(recipe);
    } else {
        console.error("Recipe not found:", recipeId);
    }
} 

export function renderRecipeDetail(recipe) {
  const recipeDetailContainer = document.querySelector(
    ".js-recipe-details-container"
  );
  recipeDetailContainer.innerHTML = renderRecipeDetailCard(recipe);
  document.title = `${recipe.title} | matcha moments`;
}

console.log("Recipe details rendered:", apiRecipesDetails);