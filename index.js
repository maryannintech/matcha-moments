import { renderRecipeList, loadRecipes } from "./scripts/recipe-list.js";
import { userRecipes, apiRecipesDetails, apiRecipes } from "./data/recipes.js";
import { controlNavBar } from "./scripts/nav-bar.js";

window.addEventListener("DOMContentLoaded", () => {
  const hasFetched = localStorage.getItem("hasFetchedRecipes") === "true";
  const hasRecipes = apiRecipesDetails.length > 0;

  if (!hasFetched || !hasRecipes) {
    window.location.replace("welcome-page.html");
    return;
  }

  loadRecipes();
  renderRecipeList();
  controlNavBar();
});
