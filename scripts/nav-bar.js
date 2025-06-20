document.querySelector(".bxs-home-alt").addEventListener("click", () => {
  window.location.href = "index.html";
});

const openNavBarElement = document.querySelector(".js-open-nav-bar");

document.querySelector(".bxs-menu-wide").addEventListener("click", () => {
  openNavBarElement.classList.remove("hide");
});

document.querySelector(".js-close-nav-bar").addEventListener("click", () => {
  openNavBarElement.classList.add("hide");
});
