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

export function renderRecipeList() {
  const recipeListContainer = document.querySelector(".recipes-container");
  apiRecipesDetails.forEach((recipe) => {
    const recipeCardHTML = renderRecipes(recipe);
    recipeListContainer.innerHTML += recipeCardHTML;
  });
  document.querySelectorAll(".js-recipe-card").forEach((recipeCard) => {
    recipeCard.addEventListener("click", () => {
      const recipeId = recipeCard.dataset.recipeId;
      window.location.href = `recipe.html?id=${recipeId}`;
    });
  });
}
