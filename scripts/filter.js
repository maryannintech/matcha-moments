import { renderRecipes } from "./recipe.js";

export function filterRecipes(recipes, filter) {
  const newArray = [];
  recipes.forEach((recipe) => {
    if (recipe.category === filter) {
      newArray.push(recipe);
    }
  });
  
}
