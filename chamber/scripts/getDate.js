const today = new Date();
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

currentYear.innerHTML = today.getFullYear();
lastModified.innerHTML = document.lastModified;
