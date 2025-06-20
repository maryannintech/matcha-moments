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
        `https://api.spoonacular.com/recipes/${recipe.id}/information?includeNutrition=false&apiKey=${myApiKey}`
      );
      const data = await response.json();

      const steps = data.analyzedInstructions?.[0]?.steps || [];

      // Extract instructions
      const instructions = steps.map((step) => step.step);

      // Collect equipment from all steps
      const equipmentSet = new Set();
      steps.forEach((step) => {
        step.equipment?.forEach((tool) => {
          equipmentSet.add(tool.name);
        });
      });

      const ingredients = data.extendedIngredients.map((i) =>
        i.original.toLowerCase()
      );

      // Category logic
      let category = "others";
      const joinedIngredients = ingredients.join(" ");
      if (
        joinedIngredients.includes("ice") ||
        joinedIngredients.includes("frozen")
      ) {
        category = "iced drinks";
      } else if (
        joinedIngredients.includes("hot water") ||
        joinedIngredients.includes("boiling water")
      ) {
        category = "hot drinks";
      } else if (
        joinedIngredients.includes("flour") ||
        joinedIngredients.includes("baking powder")
      ) {
        category = "deserts";
      }

      const recipeDetails = {
        id: data.id,
        title: data.title,
        image: data.image,
        summary: data.summary,
        ingredients,
        instructions,
        equipment: Array.from(equipmentSet),
        favorite: false,
        category, // newly added
      };

      apiRecipesDetails.push(recipeDetails);
    }

    saveApiRecipesDetails(apiRecipesDetails);
  } catch (error) {
    console.error("Error fetching recipe details:", error);
  }
}
export let userRecipes = [{}];
