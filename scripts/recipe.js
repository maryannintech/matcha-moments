import { capitalizeFirstLetter } from "./utils/format-text.js";

export function renderRecipes(recipe) {
  const recipeCardHTML = `
   <div class="recipe-card js-recipe-card" data-recipe-id="${
     recipe.id
   }" style="background-image: url('${recipe.image}');">
        <div class="recipe-star-category">
        <div class="favorite-icon js-favorite-icon">
            ${
              recipe.favorite == "true"
                ? `<i class="bx bxs-star"></i>`
                : `<i class="bx bx-star"></i>`
            }
        </div>
        <p class="category js-category">iced drinks</p>
        </div>
        <p class="recipe-name js-recipe-name">${recipe.title}</p>
    </div>
  `;
  return recipeCardHTML;
}

export function renderRecipeDetailCard(recipe) {
  const recipeDetailHTML = `
      <div class="details js-details">
        <div class="recipe-image-info">
          <img
            src="${recipe.image}"
            alt="Recipe Image"
            class="recipe-image js-recipe-image"
          />
          <p class="name-recipe js-name-recipe">${recipe.title}</p>
          <p class="recipe-summary js-recipe-summary">
          ${
            recipe.summary
              ? recipe.summary.split(".")[0] // Split at the first link to avoid HTML tags
              : "No summary? Don't matcha-bout it, dive in!"
          }
          </p>
          <div class="recipe-summary-star js-recipe-summary-star">
             ${
               recipe.favorite
                 ? `<i class="bx bxs-star"></i>`
                 : `<i class="bx bx-star"></i>`
             }
            <p>save this recipe?</p>
          </div>
        </div>
      </div>
      <div
        class="recipe-instructions-equiptment js-recipe-instructions-equiptment"
      >
        <div class="ingredints-container">
          <p class="ingredients-text text">ingredients</p>
          <ul class="ingredients-ul">
            ${
              recipe.ingredients
                .map(
                  (ingredient) =>
                    `<li class="ingredients-li">${ingredient}</li>`
                )
                .join("") || "<li>No ingredients listed.</li>"
            } 
          </ul>
          <p class="tools-text text">tools</p>
          <ul class="tools-ul">
           ${
             recipe.equipment?.length
               ? recipe.equipment
                   .map((tool) => `<li class="tools-li">${capitalizeFirstLetter(tool)}</li>`)
                   .join("")
               : "<li>No tools listed.</li>"
           }
          </ul>
          <p class="instructions-text text">instructions</p>
          <ol class="instructions-ul">
          ${
            recipe.instructions
              ? recipe.instructions
                  .filter((step) => step.trim() !== "")
                  .map(
                    (step) => `<li class="instructions-li">${step.trim()}.</li>`
                  )
                  .join("")
              : "<li>No instructions available.</li>"
          }
          </ol>
        </div>
      </div>
  `;

  return recipeDetailHTML;
}
