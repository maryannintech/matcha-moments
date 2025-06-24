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
    recipeCard.addEventListener("click", () => {
      const recipeId = recipeCard.dataset.recipeId;
      window.location.href = `recipe.html?id=${recipeId}`;
    });
  });
}

export function renderFavoriteRecipes() {
  feedbackCategory.innerHTML = "";
  let favoriteUserRecipes = userRecipes.filter((recipe) => recipe.favorite);
  let favoriteApiRecipes = apiRecipesDetails.filter((recipe) => recipe.favorite);

  if (recipeListContainer) {
    recipeListContainer.innerHTML = "";

    // Render user recipe favorites with renderUserRecipeCard
    favoriteUserRecipes.forEach((recipe) => {
      const cardHTML = renderUserRecipeCard(recipe);
      recipeListContainer.innerHTML += cardHTML;
    });

    // Render API recipe favorites with renderRecipes
    favoriteApiRecipes.forEach((recipe) => {
      const cardHTML = renderRecipes(recipe);
      recipeListContainer.innerHTML += cardHTML;
    });
  } else if (recipeDetailListContainer) {
    recipeDetailListContainer.innerHTML = "";

    favoriteUserRecipes.forEach((recipe) => {
      const cardHTML = renderUserRecipeCard(recipe);
      recipeDetailListContainer.innerHTML += cardHTML;
    });

    favoriteApiRecipes.forEach((recipe) => {
      const cardHTML = renderRecipes(recipe);
      recipeDetailListContainer.innerHTML += cardHTML;
    });
  } else if (recipeListFormContainer) {
    recipeListFormContainer.innerHTML = "";

    favoriteUserRecipes.forEach((recipe) => {
      const cardHTML = renderUserRecipeCard(recipe);
      recipeListFormContainer.innerHTML += cardHTML;
    });

    favoriteApiRecipes.forEach((recipe) => {
      const cardHTML = renderRecipes(recipe);
      recipeListFormContainer.innerHTML += cardHTML;
    });
  }

  if (favoriteUserRecipes.length + favoriteApiRecipes.length === 0) {
    feedbackCategory.innerHTML = `
      <p class="feedback-message">
        <span class="feedback-category-emphasis">Nothing here yet!</span>
        No favorite recipes found
      </p>
    `;
  }

  document.title = "my favorites | matcha moments";
  recipeCardClick();
}
