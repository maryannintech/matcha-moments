import { apiRecipes } from "../data/recipes.js";
import { renderRecipes } from "./recipe.js";
import { renderRecipeDetail } from "./detail-recipe.js";

export function renderRecipeList() {
  const recipeListContainer = document.querySelector(".recipes-container");
  apiRecipes.forEach((recipe) => {
    const recipeCardHTML = renderRecipes(recipe);
    recipeListContainer.innerHTML += recipeCardHTML;
  });
  document.querySelectorAll(".js-recipe-card").forEach((recipeCard) => {
    recipeCard.addEventListener("click", () => {
      const recipeId = recipeCard.dataset.recipeId;
      console.log("Recipe card clicked:", recipeId);
    })
  })
}
