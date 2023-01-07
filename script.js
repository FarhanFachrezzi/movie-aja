const input = document.querySelector(".search");

console.log(input);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    update();
    console.log("wrok");
    // showAll(input.value);
    document.querySelector(".form").reset();
  }
});
async function update() {
  const movies = await getmovies();
  let card = ``;
  movies.forEach((el) => {
    card += showCard(el);
  });
  const row = document.querySelector(".movie-container");
  row.innerHTML = card;
  const genre = document.querySelectorAll(".genre");
  const rate = document.querySelectorAll(".rateLetter");
  for (let i = 0; i < genre.length; i++) {
    const id = genre[i].dataset.imdbid;
    const api = await genrataApi(id);
    console.log(api);
    genre[i].textContent = api.Genre;
    for (let index = 0; index < rate.length; index++) {
      rate[i].innerHTML = api.imdbRating;
    }
  }
}
async function getmovies() {
  const token = `http://www.omdbapi.com/?apikey=7df368ab&s=${input.value}`;
  const response = await fetch(token);
  const datas = await response.json();
  const data = await datas.Search;
  return data;
}

async function genrataApi(id) {
  const token = await `http://www.omdbapi.com/?apikey=7df368ab&i=${id}`;
  const response = await fetch(token);
  const datas = response.json();
  return datas;
}

function showCard(el) {
  return ` <div class="col-lg-3">
  <div class="card bg-transparent" >
    <img src="${el.Poster}" class="card-img-top" alt="..." />
  </div>
  <span class="rate"><h5 class="rateLetter">${"s"}</h5></span>
  <h4 class="judulCard">${el.Title}</h4>
  <p class="genre" data-imdbid=${el.imdbID}>${"s"}</p>
</div>`;
}
