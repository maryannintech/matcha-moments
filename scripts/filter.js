import { renderRecipes, renderUserRecipeCard } from "./recipe.js";
import { apiRecipesDetails, userRecipes} from "../data/recipes.js";
import { recipeCardClick } from "./recipe-list.js";
import { renderRecipeList } from "./recipe-list.js";

export function renderRecipesByCategory(category) {
  const recipeListContainer = document.querySelector(".recipes-container");
  const feedbackCategory = document.querySelector(".js-feedback-category");
  recipeListContainer.innerHTML = "";
  feedbackCategory.innerHTML = "";

  if (category === "all") {
    renderRecipeList();
    document.title = "all recipes | matcha moments";
    return;
  }

  const matchingRecipes = apiRecipesDetails.filter((recipe) => {
    const firstWord = recipe.category.split(" ")[0];
    return firstWord === category;
  });

  const userRecipesMatching = userRecipes.filter((recipe) => {
    const firstWord = recipe.category.split(" ")[0];
    return firstWord === category;
  });

  if (matchingRecipes.length === 0 && userRecipesMatching.length === 0) {
    feedbackCategory.innerHTML = `
      <p class="feedback-message">
        <span class="feedback-category-emphasis">Nothing here yet!</span>
        No recipes found in this category.
      </p>
    `;
    document.title = `${category} recipes | matcha moments`;
    return;
  }

  userRecipesMatching.forEach((recipe) => {
    recipeListContainer.innerHTML += renderRecipesCard(recipe, "user");
  });

  matchingRecipes.forEach((recipe) => {
    recipeListContainer.innerHTML += renderRecipesCard(recipe, "api");
  });

  recipeCardClick();
}

function renderRecipesCard(recipe, recipes) {
  const categoryRecipeCardHTML = recipes === "api"? renderRecipes(recipe) : renderUserRecipeCard(recipe);
  document.title = `${recipe.category} recipes | matcha moments`;
  return categoryRecipeCardHTML;
}
