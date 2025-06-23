import { renderRecipeList } from "./scripts/recipe-list.js";
import { allRecipes, saveAllRecipes, userRecipes, apiRecipesDetails } from "./data/recipes.js";
import "./scripts/nav-bar.js";

if (allRecipes.length === 0 && apiRecipesDetails.length > 0) {
  allRecipes = [...apiRecipesDetails];
  saveAllRecipes(allRecipes);
}

renderRecipeList();



console.log("userRecipes:", userRecipes);