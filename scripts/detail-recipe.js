import {
  apiRecipesDetails,
  fetchRecipeDetails,
  updateFavoriteStatus,
  userRecipes,
  deleteUserRecipe,
} from "../data/recipes.js";
import {
  renderRecipeDetailCard,
  renderRecipes,
  renderUserRecipeCard,
  renderUserRecipeDetailCard,
} from "./recipe.js";
import { controlNavBar } from "./nav-bar.js";

const params = new URLSearchParams(window.location.search);
const recipeIdRaw = params.get("id");
const recipeId = isNaN(Number(recipeIdRaw)) ? recipeIdRaw : Number(recipeIdRaw);

async function loadRecipeDetail() {
  if (apiRecipesDetails.length === 0) {
    await fetchRecipeDetails();
  }

  const recipe = apiRecipesDetails.find((r) => r.id === recipeId);
  const userRecipe = userRecipes.find((r) => r.id === recipeId);
  if (recipe) {
    renderRecipeDetail(recipe, apiRecipesDetails);
  } else if (userRecipe) {
    renderRecipeDetail(userRecipe, userRecipes);
  } else {
    console.error(`Recipe with ID ${recipeId} not found.`);
    document.querySelector(".js-recipe-details-container").innerHTML =
      "<p>Recipe not found.</p>";
  }
}

loadRecipeDetail();

export function renderRecipeDetail(recipe, recipes) {
  controlNavBar();
  const recipeDetailContainer = document.querySelector(
    ".js-recipe-details-container"
  );
  recipeDetailContainer.innerHTML =
    recipes === apiRecipesDetails
      ? renderRecipeDetailCard(recipe)
      : renderUserRecipeDetailCard(recipe);

  document.title = `${recipe.title} | matcha moments`;
  editAndDeleteRecipe();
  document.querySelectorAll(".js-favorite-icon").forEach((icon) => {
    icon.addEventListener("click", () => {
      const recipeId =
        typeof recipe.id === "number"
          ? Number(icon.dataset.favoriteId)
          : icon.dataset.favoriteId;
      const foundRecipe = recipes.find((r) => r.id === recipeId);
      if (foundRecipe) {
        foundRecipe.favorite = !foundRecipe.favorite;
        icon.classList.toggle("bxs-star");
        icon.classList.toggle("bx-star");
        updateFavoriteStatus(recipeId, foundRecipe.favorite);
        recipes === "apiRecipesDetails"
          ? renderRecipes(foundRecipe)
          : renderUserRecipeCard(foundRecipe);
      } else {
        console.error(`Recipe with ID ${recipeId} not found.`);
      }
    });
  });
}

function editAndDeleteRecipe() {
  document.querySelectorAll(".js-delete-recipe-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const recipeId = button.dataset.recipeId;
      console.log(`Delete button clicked for recipe ID: ${recipeId}`);
      const confirmation = confirm(
        "Are you sure you want to delete this recipe?"
      );
      if (confirmation) {
        deleteUserRecipe(recipeId);
        window.location.href = "index.html";
      }
    });
  });

  /*
  if (editButton) {
    editButton.addEventListener("click", () => {
      window.location.href = `form.html?id=${recipe.id}`;
    });
  }

  if (deleteButton) {
    deleteButton.addEventListener("click", () => {
      const confirmation = confirm(
        "Are you sure you want to delete this recipe?"
      );
      if (confirmation) {
        // Logic to delete the recipe
        console.log(`Recipe with ID ${recipe.id} deleted.`);
        window.location.href = "index.html";
      }
    });
  }
    */
}
