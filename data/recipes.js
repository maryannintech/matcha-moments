import { myApiKey } from "../secret.js";

export let allRecipes = localStorage.getItem("allRecipes")
  ? JSON.parse(localStorage.getItem("allRecipes"))
  : [];

export function saveAllRecipes(recipes) {
  localStorage.setItem("allRecipes", JSON.stringify(recipes));
}

function saveUserRecipes(recipes) {
  localStorage.setItem("allRecipes", JSON.stringify(recipes));
}

export let apiRecipes = localStorage.getItem("apiRecipes")
  ? JSON.parse(localStorage.getItem("apiRecipes"))
  : [];

function saveApiRecipes(recipe) {
  localStorage.setItem("apiRecipes", JSON.stringify(recipe));
}

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

function saveApiRecipesDetails(details) {
  localStorage.setItem("apiRecipesDetails", JSON.stringify(details));
}

export function updateFavoriteStatus(recipeId, isFavorite) {
  const recipe = apiRecipesDetails.find((r) => r.id === recipeId);
  if (recipe) {
    recipe.favorite = isFavorite;
    saveApiRecipesDetails(apiRecipesDetails);
  }

  const allRecipe = allRecipes.find((r) => r.id === recipeId);
  if (allRecipe) {
    allRecipe.favorite = isFavorite;
    saveAllRecipes(allRecipes);
  }

  if (!recipe && !allRecipe) {
    console.error(`Recipe with ID ${recipeId} not found in either list.`);
  }
}

export let apiRecipesDetails = localStorage.getItem("apiRecipesDetails")
  ? JSON.parse(localStorage.getItem("apiRecipesDetails"))
  : [];

export async function fetchRecipeDetails() {
  try {
    for (const recipe of apiRecipes) {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${recipe.id}/information?includeNutrition=false&apiKey=${myApiKey}`
      );
      const data = await response.json();

      const steps = data.analyzedInstructions?.[0]?.steps || [];

      const instructions = steps.map((step) => step.step);

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
      category = determineCategory(joinedIngredients);

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

function determineCategory(ingredients) {
  let category = "others";

  if (ingredients.includes("ice") || ingredients.includes("frozen")) {
    category = "ice drinks";
  } else if (
    ingredients.includes("hot water") ||
    ingredients.includes("boiling water")
  ) {
    category = "hot drinks";
  } else if (
    ingredients.includes("flour") ||
    ingredients.includes("baking powder")
  ) {
    category = "deserts";
  }
  return category;
}
