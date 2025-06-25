import { loadRecipes } from "./recipe-list.js";

function getRandomLoadingText() {
  const matchaLoadingScreenTexts = [
    "Discovering your next matcha masterpiece",
    "Mixing up your next green creation",
    "Gathering matcha-inspired ingredients",
    "Baking bliss with matcha magic",
    "Whipping up delicious matcha ideas",
    "Your next matcha adventure is cooking",
    "Finding the perfect matcha dessert",
    "Compiling your favorite matcha treats",
    "Stirring in the green for your next dish",
    "Assembling vibrant matcha recipes",
    "Loading a world of matcha flavors",
    "Crafting culinary matcha dreams",
    "Unlocking new matcha sensations",
    "From powder to plate, soon!",
  ];

  const randomIndex = Math.floor(
    Math.random() * matchaLoadingScreenTexts.length
  );
  return matchaLoadingScreenTexts[randomIndex];
}

window.addEventListener("DOMContentLoaded", async () => {
  document.querySelector(".js-loading-text").innerHTML = getRandomLoadingText();
  await loadRecipes();
  localStorage.setItem("hasFetchedRecipes", "true");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 5000);
});
