import { renderRecipeList } from "./scripts/recipe-list.js";
import { allRecipes, saveAllRecipes, userRecipes, apiRecipesDetails, syncAllRecipes } from "./data/recipes.js";
import "./scripts/nav-bar.js";

window.addEventListener("DOMContentLoaded", () => {
  syncAllRecipes();
  renderRecipeList(); 
});