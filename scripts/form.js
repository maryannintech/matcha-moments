import "./nav-bar.js";
import { allRecipes, addUserRecipe } from "../data/recipes.js";


const feedbackMessage = document.querySelector(".js-feedback-category");
feedbackMessage.innerHTML = "";
const recipeForm = document.querySelector(".js-upload-recipe-form");
const recipeName = document.querySelector(".js-recipe-name-input").value;
const recipeImageLink = document.querySelector(".js-recipe-image-input").value;
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
const recipeSummary = document.querySelector(".js-recipe-summary-input").value;

recipeForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const recipe = {
    id: crypto.randomUUID(),
    title: recipeName,
    image: convertDriveLink(recipeImageLink),
    summary: recipeSummary,
    equipment: recipeEquipment.split(",").map((tool) => tool.trim()),
    ingredients: recipeIngredients
      .split(",")
      .map((ingredient) => ingredient.trim()),
    instructions: recipeInstructions
      .split(".")
      .map((step) => step.trim())
      .filter((step) => step.length > 0),
    favorite: false,
    category: recipeCategory,
  };

  addUserRecipe(recipe);
  recipeForm.reset();

  feedbackMessage.textContent = `Recipe added successfully! Go to the home page to see it.`;
  setTimeout(() => {
    feedbackMessage.textContent = "";
  }, 3000);
});

const convertDriveLink = (url) => {
  const match = url.match(/\/d\/(.*?)\//);
  if (match && match[1]) {
    return `https://drive.google.com/uc?export=view&id=${match[1]}`;
  }
  return url;
};
