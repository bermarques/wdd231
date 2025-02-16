const urlImage = "https://image.tmdb.org/t/p/w154/";
const modal = document.querySelector("#modal");

const formattedDate = (date) =>
  new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const displayModal = async (movie) => {
  modal.innerHTML = "";
  modal.innerHTML = `
        <button id="close-modal">❌</button>
        <h2>${movie.title}</h2>
        <p>${movie.overview}</p>
    `;

  modal.showModal();

  const closeModal = document.querySelector("#close-modal");
  closeModal.addEventListener("click", () => {
    modal.close();
  });
};

const handleStorage = (movie, id) => {
  let localStorageItems =
    JSON.parse(window.localStorage.getItem("movieCatalogueFavorites")) || [];

  if (localStorageItems.some((item) => item.id === movie.id)) {
    localStorageItems = localStorageItems.filter(
      (item) => item.id !== movie.id
    );
    localStorage.setItem(
      "movieCatalogueFavorites",
      JSON.stringify(localStorageItems)
    );
    document.getElementById(id).textContent = "⭐";
    return;
  }
  const movieData = {
    id: movie.id,
    title: movie.title,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    vote_average: movie.vote_average,
    overview: movie.overview,
  };
  localStorageItems.push(movieData);
  localStorage.setItem(
    "movieCatalogueFavorites",
    JSON.stringify(localStorageItems)
  );
  document.getElementById(id).textContent = "❌";
};

const displayCards = (movies) => {
  const grid = document.querySelector("#movie-grid");
  let localStorageItems =
    JSON.parse(window.localStorage.getItem("movieCatalogueFavorites")) || [];

  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.onclick = () => displayModal(movie);
    card.className = "movie-card";
    const findItem = () =>
      localStorageItems.find((item) => item.id === movie.id);

    const favorite = document.createElement("span");
    favorite.className = "favorite";
    favorite.textContent = findItem() ? "❌" : "⭐";
    favorite.title = "Add to favorite";
    favorite.id = movie.id;
    favorite.onclick = (e) => {
      e.stopPropagation();
      handleStorage(movie, movie.id);
    };
    card.appendChild(favorite);
    const img = document.createElement("img");
    img.src = urlImage + movie.poster_path;
    img.alt = movie.title;
    img.loading = "lazy";

    card.appendChild(img);
    const movieInfo = document.createElement("div");
    movieInfo.className = "movie-info";
    const title = document.createElement("h3");
    title.textContent = movie.title;
    movieInfo.appendChild(title);
    const score = document.createElement("span");
    score.className = "score";
    score.textContent = `${Math.round(movie.vote_average * 10)}/100`;
    movieInfo.appendChild(score);
    const date = document.createElement("p");
    date.textContent = formattedDate(movie.release_date);
    movieInfo.appendChild(date);
    card.appendChild(movieInfo);
    grid.appendChild(card);
  });
};
const getPopular = async () => {
  try {
    const response = await fetch("./data/popular.json");
    const data = await response.json();
    displayCards(data.results);
  } catch (err) {
    throw new Error("Error loading JSON file");
  }
};

getPopular();
