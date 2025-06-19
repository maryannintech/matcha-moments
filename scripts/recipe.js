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

export function renderRecipeDetails(recipe) {
  const recipeDetailHTML = `
     <div class="recipe-details-container js-recipe-details-container">
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
              ? recipe.summary
              : "No summary? Don't matcha-bout it, dive in!"
          }
          </p>
          <div class="recipe-summary-star js-recipe-summary-star">
             ${
               recipe.favorite == "true"
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
            } } 
          </ul>
          <p class="tools-text text">tools</p>
          <ul class="tools-ul">
           ${
             recipe.equipment?.length
               ? recipe.equipment
                   .map((tool) => `<li class="tools-li">${tool}</li>`)
                   .join("")
               : "<li>No tools listed.</li>"
           }
          </ul>
          <p class="instructions-text text">instructions</p>
          <ol class="instructions-ul">
           ${
             recipe.instructions?.length
               ? recipe.instructions
                   .map((step) => `<li class="instructions-li">${step}</li>`)
                   .join("")
               : "<li>No instructions available.</li>"
           }
          </ol>
        </div>
      </div>
    </div>
  `;

  return recipeDetailHTML;
}
