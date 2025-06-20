import { apiRecipes, fetchRecipes } from "./data/recipes.js";
import { renderRecipeList } from "./scripts/recipe-list.js";
import "./scripts/nav-bar.js";

async function loadRecipes() {
  if (apiRecipes.length === 0) {
    fetchRecipes();
  }
}

loadRecipes();
renderRecipeList();
