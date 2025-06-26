import { myApiKey } from "../secret.js";

// user recipes
export let userRecipes = localStorage.getItem("userRecipes")
  ? JSON.parse(localStorage.getItem("userRecipes"))
  : [];

function saveUserRecipes(recipes) {
  localStorage.setItem("userRecipes", JSON.stringify(recipes));
}

export function addUserRecipe(recipe) {
  userRecipes.push(recipe);
  saveUserRecipes(userRecipes);

  console.log("User recipe added:", recipe);
}

export function deleteUserRecipe(recipeId) {
  userRecipes = userRecipes.filter((recipe) => recipe.id !== recipeId);
  saveUserRecipes(userRecipes);
}

export function updateUserRecipe(updatedRecipe) {
  const index = userRecipes.findIndex((recipe) => recipe.id === updatedRecipe.id);
  if (index !== -1) {
    userRecipes[index] = updatedRecipe;
    saveUserRecipes(userRecipes);
    console.log("User recipe updated:", updatedRecipe);
  } else {
    console.error(`Recipe with ID ${updatedRecipe.id} not found.`);
  }
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

// api recipes details
export let apiRecipesDetails = localStorage.getItem("apiRecipesDetails")
  ? JSON.parse(localStorage.getItem("apiRecipesDetails"))
  : [];

function saveApiRecipesDetails(details) {
  localStorage.setItem("apiRecipesDetails", JSON.stringify(details));
}

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
        category,
      };

      apiRecipesDetails.push(recipeDetails);
    }

    saveApiRecipesDetails(apiRecipesDetails);
  } catch (error) {
    console.error("Error fetching recipe details:", error);
  }
}

export function updateFavoriteStatus(recipeId, isFavorite) {
  const recipe = apiRecipesDetails.find((r) => r.id === recipeId);
  if (recipe) {
    recipe.favorite = isFavorite;
    saveApiRecipesDetails(apiRecipesDetails);
  }

  const findRecipe = apiRecipesDetails.find((r) => r.id === recipeId);
  if (findRecipe) {
    findRecipe.favorite = isFavorite;
    saveApiRecipesDetails(apiRecipesDetails);
  }

  const userRecipe = userRecipes.find((r) => r.id === recipeId);
  if (userRecipe) {
    userRecipe.favorite = isFavorite;
    saveUserRecipes(userRecipes);
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
