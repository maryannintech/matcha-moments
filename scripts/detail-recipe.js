import {
  apiRecipesDetails,
  fetchRecipeDetails,
  updateFavoriteStatus
} from "../data/recipes.js";
import { renderRecipeDetailCard, renderRecipes } from "./recipe.js";

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

  document.querySelectorAll(".js-favorite-icon").forEach((icon) => {
    icon.addEventListener("click", () => {
      const recipeId = Number(icon.dataset.favoriteId);
      const recipe = apiRecipesDetails.find((r) => r.id === recipeId);
      if (recipe) {
        recipe.favorite = !recipe.favorite;
        icon.classList.toggle("bxs-star");
        icon.classList.toggle("bx-star");
        updateFavoriteStatus(recipeId, recipe.favorite);
        renderRecipeDetail(recipe);
      } else {
        console.error(`Recipe with ID ${recipeId} not found.`);
      }
    })
  })
}

console.log("Recipe details rendered:", apiRecipesDetails);
