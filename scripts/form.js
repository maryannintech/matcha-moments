import "./nav-bar.js";
import { allRecipes } from "../data/recipes.js";

const recipeForm = document.querySelector(".js-upload-recipe-form");
recipeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    console.log("Form submitted");
})