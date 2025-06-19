import { apiRecipes } from "../data/recipes.js";
import { renderRecipes } from "./recipe.js";


async function loadRecipes() {
  if (apiRecipes.length === 0) {
    await fetchRecipes(); 
  }
  console.log("Recipes loaded:", apiRecipes);
}

loadRecipes();

export function renderRecipeList() {
  const recipeListContainer = document.querySelector(".recipes-container");
  apiRecipes.forEach((recipe) => {
    const recipeCardHTML = renderRecipes(recipe);
    recipeListContainer.innerHTML += recipeCardHTML;
  });
  document.querySelectorAll(".js-recipe-card").forEach((recipeCard) => {
    recipeCard.addEventListener("click", () => {
      const recipeId = recipeCard.dataset.recipeId;
      window.location.href = `recipe.html?id=${recipeId}`;
    })
  })
}
