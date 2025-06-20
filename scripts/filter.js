import { renderRecipes } from "./recipe.js";
import { apiRecipesDetails, allRecipes } from "../data/recipes.js";
import { recipeCardClick } from "./recipe-list.js";
import { renderRecipeList } from "./recipe-list.js";

export function renderRecipesByCategory(category) {
  const recipeListContainer = document.querySelector(".recipes-container");
  recipeListContainer.innerHTML = "";
  allRecipes.forEach((recipe) => {
    const firstWord = recipe.category.split(" ")[0];
    if (firstWord === category) {
      const categoryRecipeCardHTML = renderRecipes(recipe);
      recipeListContainer.innerHTML += categoryRecipeCardHTML;
    } else if (category === "all") {
      renderRecipeList();
    }
  });

  recipeCardClick();
}
