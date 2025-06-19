import {apiRecipes, fetchRecipes } from "./data/recipes.js";
import {renderRecipeList} from "./scripts/recipe-list.js"

if (apiRecipes.length === 0) {
    fetchRecipes();
}
renderRecipeList();