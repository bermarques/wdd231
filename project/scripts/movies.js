const urlImage = "https://image.tmdb.org/t/p/w154/";

const displayCards = (movies) => {
  const grid = document.querySelector("#movie-grid");
  movies.forEach((movie) => {
    const card = document.createElement("div");
    card.className = "movie-card";

    const favorite = document.createElement("span");
    favorite.className = "favorite";
    favorite.textContent = "⭐";
    favorite.title = "Add to favorite";
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
    date.textContent = movie.release_date;
    movieInfo.appendChild(date);
    card.appendChild(movieInfo);
    grid.appendChild(card);
  });
};

const getNowPlaying = async () => {
  const response = await fetch("./data/nowPlaying.json");
  const data = await response.json();
  displayCards(data.results);
};

getNowPlaying();
