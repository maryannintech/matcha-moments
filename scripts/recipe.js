export function renderRecipes(recipe) {
  const recipeCardHTML = `
   <div class="recipe-card js-recipe-card" data-recipe-id="${
     recipe.id
   }" style="background-image: url('${
    recipe.image
  }');">
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
