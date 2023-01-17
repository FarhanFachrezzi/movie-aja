const input = document.querySelector(".search");
const row = document.querySelector(".movie-container");
console.log(input);
input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    update();
    // showAll(input.value);
    document.querySelector(".form").reset();
  }
});
document.addEventListener("click", async function (e) {
  if (e.target.classList.contains("buttonDetail")) {
    const id = e.target.dataset.imdbidmodal;
    const dataApi = await getApiDesc(id);
    const modalDesc = showModalDesc(dataApi);

    const modalBody = document.querySelector(".modal-body");
    modalBody.innerHTML = modalDesc;
  }
});

async function update() {
  const movies = await getmovies();
  let card = ``;
  for (let i = 0; i < movies.length; i++) {
    card += await showCard(movies[i]);
  }
  row.innerHTML = card;
}

async function getmovies() {
  const token = `http://www.omdbapi.com/?apikey=7df368ab&s=${input.value}`;
  const response = await fetch(token);
  const datas = await response.json();
  const data = await datas.Search;
  return data;
}

async function genrataApi(id) {
  const token = `http://www.omdbapi.com/?apikey=7df368ab&i=${id}`;
  const response = await fetch(token);
  const datas = response.json();
  return datas;
}
async function getApiDesc(id) {
  const token = `http://www.omdbapi.com/?apikey=7df368ab&i=${id}`;
  const response = await fetch(token);
  const datas = response.json();
  return datas;
}

async function apigenre(el) {
  const genRate = await genrataApi(el);
  const genre = await genRate.Genre;
  return genre;
}
async function rate(el) {
  const genRate = await genrataApi(el);
  const rate = await genRate.imdbRating;
  return rate;
}
async function showCard(el) {
  return ` <div class="col-lg-3">
  <div class="card bg-transparent" >
    <img src="${el.Poster}" class="card-img-top" alt="..." />
  </div>
  <span class="rate"><h5 class="rateLetter">${await rate(el.imdbID)}</h5></span>
  <h4 class="judulCard">${el.Title}</h4>
  <p class="genre" data-imdbid=${el.imdbID}>${await apigenre(el.imdbID)}</p>
  <button class="buttonDetail"  data-imdbidmodal=${el.imdbID} data-bs-toggle="modal" data-bs-target="#exampleModal">read more</button>
</div>`;
}

function showModalDesc(id) {
  return `<p>Director : ${id.Director} </p>
  <p>Released : ${id.Released}</p>
  <p>Country : ${id.Country}</p> 
  <p>Plot : ${id.Plot}</p>
  `;
}
