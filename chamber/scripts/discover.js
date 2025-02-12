document.addEventListener("DOMContentLoaded", () => {
  const lastVisitEl = document.getElementById("lastVisit");
  const lastVisit = localStorage.getItem("lastVisit");

  const now = new Date();
  localStorage.setItem("lastVisit", now.toISOString());

  if (!lastVisit) {
    lastVisitEl.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const lastVisitDate = new Date(lastVisit);
    const timeDifference = now - lastVisitDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (daysDifference < 1) {
      lastVisitEl.textContent = "Back so soon! Awesome!";
    } else if (daysDifference === 1) {
      lastVisitEl.textContent = "You last visited yesterday.";
    } else {
      lastVisitEl.textContent = `You last visited ${daysDifference} days ago.`;
    }
  }
});

const cards = document.querySelector(".discover-grid");

const displayPlaces = (places) => {
  places.forEach((member) => {
    let card = document.createElement("div");
    card.className = "discover-card";
    const figure = document.createElement("figure");
    const img = document.createElement("img");
    img.src = member.image;
    img.alt = member.title;
    figure.appendChild(img);
    const title = document.createElement("h2");
    title.textContent = member.title;
    const address = document.createElement("address");
    address.textContent = member.address;
    const description = document.createElement("p");
    description.textContent = member.description;

    const cardContent = document.createElement("div");
    cardContent.className = "discover-content";
    cardContent.appendChild(title);
    cardContent.appendChild(address);
    cardContent.appendChild(description);

    const button = document.createElement("button");
    button.textContent = "Learn More";
    cardContent.appendChild(button);

    card.appendChild(figure);
    card.appendChild(cardContent);

    cards.appendChild(card);
  });
};

const getPlacesData = async () => {
  try {
    const res = await fetch("./data/places.json");
    const data = await res.json();
    displayPlaces(data);
  } catch (err) {
    throw new Error("Error loading JSON file");
  }
};

getPlacesData();
