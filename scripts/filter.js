import { renderRecipes } from "./recipe.js";

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
