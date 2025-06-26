import "./nav-bar.js";
import { addUserRecipe, userRecipes, updateUserRecipe } from "../data/recipes.js";
import { controlNavBar } from "./nav-bar.js";

const feedbackMessage = document.querySelector(".js-feedback-category");
feedbackMessage.innerHTML = "";
const recipeForm = document.querySelector(".js-upload-recipe-form");
controlNavBar();

recipeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const recipeName = document.querySelector(".js-recipe-name-input").value;
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

  const recipe = {
    id: crypto.randomUUID(),
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
    favorite: false,
    category: recipeCategory || "others",
  };

  addUserRecipe(recipe);
  recipeForm.reset();
  window.location.href = "index.html";
});


