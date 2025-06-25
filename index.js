import { renderRecipeList, loadRecipes } from "./scripts/recipe-list.js";
import { userRecipes, apiRecipesDetails, apiRecipes } from "./data/recipes.js";
import { controlNavBar } from "./scripts/nav-bar.js";

window.addEventListener("DOMContentLoaded", () => {
  const hasFetched = localStorage.getItem("hasFetchedRecipes") === "true";
  if (!hasFetched) {
    window.location.href = "welcome-page.html";
    return;
  }

  loadRecipes();
  renderRecipeList();
  controlNavBar();
});
