import {
  apiRecipesDetails,
  fetchRecipeDetails,
  updateFavoriteStatus,
  userRecipes,
  deleteUserRecipe,
  updateUserRecipe,
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
  const recipeDetailContainer = document.querySelector(
    ".js-recipe-details-container"
  );
  document.querySelectorAll(".js-delete-recipe-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const recipeId = button.dataset.recipeId;
      const confirmation = confirm(
        "Are you sure you want to delete this recipe?"
      );
      if (confirmation) {
        deleteUserRecipe(recipeId);
        window.location.href = "index.html";
      }
    });
  });

  document.querySelectorAll(".js-edit-recipe-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const recipeId = button.dataset.recipeId;
      const recipe = userRecipes.find((r) => r.id === recipeId);
      recipeDetailContainer.innerHTML = renderEditForm(recipe);
      const uploadRecipeForm = document.querySelector(".js-upload-recipe-form");

      document.querySelectorAll(".js-cancel-form-btn").forEach((button) => {
        button.addEventListener("click", () => {
          uploadRecipeForm.reset();
          window.location.href = "recipe.html?id=" + recipeIdRaw;
        });
      });

      uploadRecipeForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const recipeName = document.querySelector(
          ".js-recipe-name-input"
        ).value;
        const recipeImageLink = document.querySelector(
          ".js-recipe-image-input"
        ).value;
        const recipeCategory = document.querySelector(
          ".js-recipe-category-input"
        ).value;
        const recipeIngredients = document.querySelector(
          ".js-recipe-ingredients-input"
        ).value;
        const recipeInstructions = document.querySelector(
          ".js-recipe-instructions-input"
        ).value;
        const recipeEquipment = document.querySelector(
          ".js-recipe-equipment-input"
        ).value;
        const recipeSummary = document.querySelector(
          ".js-recipe-summary-input"
        ).value;

        const updatedRecipe = {
          ...recipe,
          title: recipeName,
          image: recipeImageLink || "./images/default-recipe-img.png",
          summary: recipeSummary,
          equipment: recipeEquipment
            .split(",")
            .map((tool) => tool.trim())
            .filter(Boolean),
          ingredients: recipeIngredients
            .split(",")
            .map((i) => i.trim())
            .filter(Boolean),
          instructions: recipeInstructions
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
          category: recipeCategory || "others",
        };

        updateUserRecipe(updatedRecipe);
        uploadRecipeForm.reset();
        window.location.href = "index.html";
      });
    });
  });
}

function renderEditForm(recipe) {
  const formHTML = `
       <form class="js-upload-recipe-form">
          <p class="form-title">Upload your recipe</p>
          <label for="recipe-name-input">Recipe Name: </label>
          <input
            type="text"
            id="recipe-name-input"
            name="recipe-name"
            class="js-recipe-name-input"
            required
            minlength="5"
            maxlength="50"
            placeholder="Enter recipe name"
            value="${recipe.title}"
          />
          <label for="recipe-image-input">Recipe Image:</label>
          <small class="form-note">
            Use a public image link (e.g., Imgur, Postimages) ending in .jpg,
            .jpeg, or .png. Make sure your image is accessible.
            <span class="note-warning"
              >Matcha Moments isn’t responsible for third-party content.</span
            >
          </small>
          <input
            type="text"
            id="recipe-image-input"
            name="recipe-image"
            class="recipe-image-input js-recipe-image-input"
            placeholder="Paste image link (URL)"
            pattern=".*\.(jpg|jpeg|png)$"
            value="${recipe.image || "./images/default-recipe-img.png"}"
          />

          <label for="recipe-category-input">Category</label>
          <select
            id="recipe-category-input"
            name="recipe-category"
            class="js-recipe-category-input"
            value="${recipe.category || "others"}"
            required
          >
            <option value="ice drinks" ${
              recipe.category === "ice drinks" ? "selected" : ""
            }>ice drink</option>
            <option value="hot drinks" ${
              recipe.category === "hot drinks" ? "selected" : ""
            }>hot drink</option>
            <option value="deserts" ${
              recipe.category === "deserts" ? "selected" : ""
            }>desert</option>
            <option value="others" ${
              recipe.category === "others" ? "selected" : ""
            }>others</option>
          </select>
          <label for="recipe-ingredients-input">Ingredients:</label>
          <textarea
            id="recipe-ingredients-input"
            name="recipe-ingredients"
            class="js-recipe-ingredients-input"
            required
            minlength="10"
            maxlength="500"
            placeholder="Enter ingredients with measurements, separated by commas"
          >${
            Array.isArray(recipe.ingredients)
              ? recipe.ingredients.join(", ")
              : recipe.ingredients
          }</textarea>
          <label for="recipe-equipment-input">Equipment:</label>
          <textarea
            id="recipe-equipment-input"
            name="recipe-equipment"
            class="js-recipe-equipment-input"
            required
            minlength="10"
            maxlength="500"
            placeholder="Enter equipment needed, separated by commas"
          >${recipe.equipment}</textarea>
          <label for="recipe-instructions-input">Instructions:</label>
          <textarea
            id="recipe-instructions-input"
            name="recipe-instructions"
            class="js-recipe-instructions-input"
            required
            minlength="20"
            maxlength="1000"
            placeholder="Enter step-by-step instructions for your recipe, seperated by commas"
          >${
            Array.isArray(recipe.instructions)
              ? recipe.instructions.join(", ")
              : recipe.instructions
          }</textarea>
          <label for="recipe-summary-input">Recipe summary:</label>
          <textarea
            id="recipe-summary-input"
            name="recipe-summary"
            maxlength="100"
            placeholder="Enter a short summary of your recipe"
            class="recipe-summary-input js-recipe-summary-input"
          >${recipe.summary}</textarea>
          <button
            type="submit"
            class="upload-recipe-btn form-btn js-upload-recipe-btn"
          >
            Update Recipe
          </button>
          <button
          type="button"
            class="cancel-form-btn form-btn js-cancel-form-btn"
          >
            Cancel
          </button>
        </form>
  `;

  return formHTML;
}
