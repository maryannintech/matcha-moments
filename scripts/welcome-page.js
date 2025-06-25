import { loadRecipes } from "./recipe-list.js";

window.addEventListener("DOMContentLoaded", async () => {
  await loadRecipes();
  localStorage.setItem("hasFetchedRecipes", "true");
  setTimeout(() => {
    window.location.href = "index.html";
  }, 4000);
});
