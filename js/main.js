function getCharacters(url = "https://www.swapi.tech/api/people/") {
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      renderCharacters(data.results);
      setupPaginacion(data);
    })
    .catch((err) => console.error(err));
}

function renderCharacters(characters) {
  const listContainer = document.getElementById("personajes");
  listContainer.innerHTML = "";

  characters.forEach((character) => {
    const divElement = document.createElement("div");
    divElement.classList.add("info-personaje");

    divElement.innerHTML = `
          <a href="detail.html?id=${character.uid}">
        <h2>${character.name}</h2>
      </a>
    `;
    listContainer.appendChild(divElement);
  });
}

function setupPaginacion(data) {
  const paginationContainer = document.getElementById("paginacion");
  paginationContainer.innerHTML = "";

  //data.next y data.previous para página anterior y siguiente.
  if (data.previous) {
    const previousBtn = document.createElement("button");
    previousBtn.textContent = "Anterior";
    previousBtn.addEventListener("click", () => {
      getCharacters(data.previous);
    });
    paginationContainer.appendChild(previousBtn);
  }

  if (data.next) {
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Siguiente";
    nextBtn.addEventListener("click", () => {
      getCharacters(data.next);
    });
    paginationContainer.appendChild(nextBtn);
  }
}

window.addEventListener("DOMContentLoaded", () => {
  getCharacters();
});
