import { myApiKey } from "../secret.js";

export let apiRecipes = localStorage.getItem("apiRecipes")
  ? JSON.parse(localStorage.getItem("apiRecipes"))
  : [];

function saveApiRecipes(recipe) {
  localStorage.setItem("apiRecipes", JSON.stringify(recipe));
}

function saveApiRecipesDetails(details) {
  localStorage.setItem("apiRecipesDetails", JSON.stringify(details));
}

export let apiRecipesDetails = localStorage.getItem("apiRecipesDetails")
  ? JSON.parse(localStorage.getItem("apiRecipesDetails"))
  : [];


export async function fetchRecipes() {
  try {
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=matcha&number=10&apiKey=${myApiKey}`
    );
    const data = await response.json();
    const results = data.results || [];
    apiRecipes = data.results.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        favorite: false,
      };
    });

    saveApiRecipes(apiRecipes);
    console.log("Fetched and saved recipes:", apiRecipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
  }
}

export async function fetchRecipeDetails() {
  try {
    for (const recipe of apiRecipes) {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipe.id}/information?apiKey=${myApiKey}`
      );
      const data = await response.json();

      const recipeDetails = {
        id: data.id,
        title: data.title,
        image: data.image,
        summary: data.summary,
        ingredients: data.extendedIngredients.map((ingredient) => ingredient.original),
        instructions: data.instructions,
        favorite: false,
      };

      apiRecipesDetails.push(recipeDetails);
    }

    saveApiRecipesDetails(apiRecipesDetails);
    console.log("Fetched and saved recipe details:", apiRecipesDetails);
  } catch (error) {
    console.error("Error fetching recipe details:", error);
  }
}

export let userRecipes = [{}];
