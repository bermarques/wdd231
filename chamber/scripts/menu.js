const hamburgerElement = document.querySelector("#hamburgerBtn");
const navElement = document.querySelector("#animated");

hamburgerElement.addEventListener("click", () => {
  hamburgerElement.classList.toggle("open");
  navElement.classList.toggle("open");
});
