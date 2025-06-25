import { renderRecipeList } from "./scripts/recipe-list.js";
import { userRecipes, apiRecipesDetails } from "./data/recipes.js";
import "./scripts/nav-bar.js";

window.addEventListener("DOMContentLoaded", () => {
  renderRecipeList(); 
});