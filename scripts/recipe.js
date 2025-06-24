import { capitalizeFirstLetter } from "./utils/format-text.js";
import "./nav-bar.js";

export function renderRecipes(recipe) {
  const recipeCardHTML = `
   <div class="recipe-card js-recipe-card" data-recipe-id="${
     recipe.id
   }" style="background-image: url('${recipe.image}');">
        <div class="recipe-star-category">
         ${
           recipe.favorite
             ? `<i class="bx js-favorite-icon bxs-star favorite-star-recipe-list" data-favorite-id=${recipe.id}></i>`
             : `<i class="bx js-favorite-icon bx-star" data-favorite-id=${recipe.id}></i>`
         }
        <p class="category js-category">${recipe.category}</p>
        </div>
        <p class="recipe-name js-recipe-name">${recipe.title}</p>
    </div>
  `;
  return recipeCardHTML;
}

export function renderUserRecipeDetailCard(recipe) {
  const userRecipeDetailHTML = `
   <div class="details js-details">
        <div class="recipe-image-info">
          <img
            src="${recipe.image || "./images/test-image.jpg"}"
            alt="Recipe Image"
            class="recipe-image js-recipe-image"
          />
          <p class="name-recipe js-name-recipe">${recipe.title}</p>
          <p class="recipe-summary js-recipe-summary">
          ${
            recipe.summary
              ? recipe.summary
              : "No summary? Don't matcha-bout it, dive in!"
          }
          </p>
          <div class="recipe-summary-star js-recipe-summary-star">
             ${
               recipe.favorite
                 ? `<i class="bx js-favorite-icon bxs-star favorite-star" data-favorite-id=${recipe.id}></i>`
                 : `<i class="bx js-favorite-icon bx-star" data-favorite-id=${recipe.id}></i>`
             }
            <p>save this recipe?</p>
          </div>
        </div>
          <div class="delete-edit-btns">
         <div class="delete-recipe-btn js-delete-recipe-btn">
          <i class='bx  bxs-trash'  ></i> 
         <p>delete recipe</p>
         </div>
        <div class="edit-recipe-btn js-edit-recipe-btn">
          <i class='bx  bxs-edit-alt'  ></i> 
          <p>edit recipe</p>
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
                    `<li class="ingredients-li">${capitalizeFirstLetter(
                      ingredient
                    )}</li>`
                )
                .join("") || "<li>No ingredients listed.</li>"
            } 
          </ul>
          <p class="tools-text text">tools</p>
          <ul class="tools-ul">
           ${
             recipe.equipment?.length
               ? recipe.equipment
                   .map(
                     (tool) =>
                       `<li class="tools-li">${capitalizeFirstLetter(
                         tool
                       )}</li>`
                   )
                   .join("")
               : "<li>No tools listed.</li>"
           }
          </ul>
          <p class="instructions-text text">instructions</p>
          <ol class="instructions-ul">
          ${
            recipe.instructions?.length
              ? recipe.instructions.map((step) => `<li class="instructions-li">${step.trim()}</li>`)
                  .join("")
              : "<li>No instructions available.</li>"
          }
          </ol>
        </div>
      </div>
  `;

  return userRecipeDetailHTML;
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
              ? recipe.summary.split(".")[0]
              : "No summary? Don't matcha-bout it, dive in!"
          }
          </p>
          <div class="recipe-summary-star js-recipe-summary-star">
             ${
               recipe.favorite
                 ? `<i class="bx js-favorite-icon bxs-star favorite-star" data-favorite-id=${recipe.id}></i>`
                 : `<i class="bx js-favorite-icon bx-star" data-favorite-id=${recipe.id}></i>`
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
                   .map(
                     (tool) =>
                       `<li class="tools-li">${capitalizeFirstLetter(
                         tool
                       )}</li>`
                   )
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
                    (step) => `<li class="instructions-li">${step.trim()}</li>`
                  )
                  .join("")
              : "<li>No instructions available.</li>"
          }
          </ol>
          <p class="credits-recipe">
        Powered by
        <a href="https://spoonacular.com" target="_blank">Spoonacular API</a>
      </p>
        </div>
      </div>
  `;

  return recipeDetailHTML;
}

export function renderUserRecipeCard(recipe) {
  const userRecipeCardHTML = `
    <div class="recipe-card js-recipe-card" data-recipe-id="${
      recipe.id
    }" style="background-image: url('${recipe.image}');">
      <div class="recipe-star-category">
        ${
          recipe.favorite
            ? `<i class="bx js-favorite-icon bxs-star favorite-star-recipe-list" data-favorite-id=${recipe.id}></i>`
            : `<i class="bx js-favorite-icon bx-star" data-favorite-id=${recipe.id}></i>`
        }
        <p class="category js-category">${recipe.category}</p>
      </div>
      <p class="recipe-name js-recipe-name">${recipe.title}</p>
      <p class="your-recipe-text">your recipe</p>
    </div>
  `;
  return userRecipeCardHTML;
}
