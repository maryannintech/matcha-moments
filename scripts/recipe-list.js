import {
  fetchRecipeDetails,
  apiRecipesDetails,
  fetchRecipes,
  apiRecipes,
  userRecipes,
} from "../data/recipes.js";
import { renderRecipes, renderUserRecipeCard } from "./recipe.js";
import { renderRecipesByCategory } from "./filter.js";

export async function loadRecipes() {
  if (apiRecipesDetails.length === 0) {
    await fetchRecipes();
    await fetchRecipeDetails();
  }
  console.log("Loaded recipes:", apiRecipesDetails);
}

loadRecipes();

const recipeListContainer = document.querySelector(".recipes-container");
const recipeDetailListContainer = document.querySelector(
  ".js-recipe-details-container"
);
const recipeListFormContainer = document.querySelector(".js-form-container");
const feedbackCategory = document.querySelector(".js-feedback-category");

document.querySelectorAll(".filter-btn").forEach((filterBtn) => {
  filterBtn.addEventListener("click", () => {
    const filterId = filterBtn.dataset.filterId;
    renderRecipesByCategory(filterId);
  });
});

export function renderRecipeList() {
  userRecipes.forEach((recipe) => {
    const recipeCardHTML = renderUserRecipeCard(recipe);
    recipeListContainer.innerHTML += recipeCardHTML;
  });

  apiRecipesDetails.forEach((recipe) => {
    const recipeCardHTML = renderRecipes(recipe);
    recipeListContainer.innerHTML += recipeCardHTML;
  });

  recipeCardClick();
}

export function recipeCardClick() {
  document.querySelectorAll(".js-recipe-card").forEach((recipeCard) => {
    const bg = recipeCard.dataset.bg;
    if (bg) {
      recipeCard.style.backgroundImage = `url('${bg}')`;
      recipeCard.style.backgroundSize = "cover";
      recipeCard.style.backgroundPosition = "center";
    }
    recipeCard.addEventListener("click", () => {
      const recipeId = recipeCard.dataset.recipeId;
      window.location.href = `recipe.html?id=${recipeId}`;
    });
  });
}

function renderRecipesTo(userRecipes, apiRecipes, container) {
  if (!container) return;
  container.innerHTML = "";
  userRecipes.forEach((recipe) => {
    container.innerHTML += renderUserRecipeCard(recipe);
  });
  apiRecipes.forEach((recipe) => {
    container.innerHTML += renderRecipes(recipe);
  });

  if (userRecipes.length + apiRecipes.length === 0) {
    container.innerHTML = `
      <p class="feedback-message">
        <span class="feedback-category-emphasis">Nothing here yet!</span>
        No recipes found
      </p>
    `;
  }
}

export function renderFavoriteRecipes() {
  feedbackCategory.innerHTML = "";

  const favoriteUserRecipes = userRecipes.filter((r) => r.favorite);
  const favoriteApiRecipes = apiRecipesDetails.filter((r) => r.favorite);

  renderRecipesTo(favoriteUserRecipes, favoriteApiRecipes, recipeListContainer);
  renderRecipesTo(
    favoriteUserRecipes,
    favoriteApiRecipes,
    recipeDetailListContainer
  );
  renderRecipesTo(
    favoriteUserRecipes,
    favoriteApiRecipes,
    recipeListFormContainer
  );

  document.title = "my favorites | matcha moments";
  recipeCardClick();
}

export function renderSearchResults(searchTerm) {
  const searchUserRecipes = userRecipes.filter((recipe) => {
    return (
      recipe.title.includes(searchTerm) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.includes(searchTerm.toLowerCase())
      )
    );
  });

  const searchApiRecipes = apiRecipesDetails.filter((recipe) => {
    return (
      recipe.title.includes(searchTerm) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.includes(searchTerm.toLowerCase())
      )
    );
  });

  renderRecipesTo(searchUserRecipes, searchApiRecipes, recipeListContainer);

  renderRecipesTo(
    searchUserRecipes,
    searchApiRecipes,
    recipeDetailListContainer
  );

  renderRecipesTo(searchUserRecipes, searchApiRecipes, recipeListFormContainer);

  recipeCardClick();
  feedbackCategory.innerHTML = `
    <p class="feedback-message">
      <span class="feedback-category-emphasis">Search results for "${searchTerm}"</span>
    </p>
  `;
  document.title = `Search results for "${searchTerm}" | matcha moments`;
}
