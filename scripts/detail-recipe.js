import {
  apiRecipesDetails,
  fetchRecipeDetails,
} from "../data/recipes.js";
import { renderRecipeDetailCard } from "./recipe.js";

const params = new URLSearchParams(window.location.search);
const recipeId = Number(params.get("id"));


async function loadRecipeDetail() {
  if (apiRecipesDetails.length === 0) {
    await fetchRecipeDetails();
  }

  const recipe = apiRecipesDetails.find((r) => r.id === recipeId);
  console.log("Recipe found:", recipe);
  recipe ? renderRecipeDetail(recipe) : "Recipe not found";
}

loadRecipeDetail();

export function renderRecipeDetail(recipe) {
  const recipeDetailContainer = document.querySelector(
    ".js-recipe-details-container"
  );
  recipeDetailContainer.innerHTML = renderRecipeDetailCard(recipe);
  document.title = `${recipe.title} | matcha moments`;
}

console.log("Recipe details rendered:", apiRecipesDetails);
