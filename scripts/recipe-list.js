import { apiRecipes } from "../data/recipes.js";
import { renderRecipes } from "./recipe.js";

export function renderRecipeList() {
  const recipeListContainer = document.querySelector(".recipes-container");
  apiRecipes.forEach((recipe) => {
    const recipeCardHTML = renderRecipes(recipe);
    recipeListContainer.innerHTML += recipeCardHTML;
  })
}
