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
    //así se crea el div base
    const divElement = document.createElement("div");
    divElement.classList.add("info-personaje");

    //así se hace una llamada individual al personaje para obtener más datos
    fetch(character.url)
      .then((res) => res.json())
      .then((detailData) => {
        const properties = detailData.result.properties;
        //se añaden las propiedades que se quieran mostrar

        //así se genera el HTML con varias características
        divElement.innerHTML = `
          <a href="detail.html?id=${character.uid}">
        <h2>${character.name}</h2>
      </a>
      <p>Año de nacimiento: ${properties.birth_year}</p>
      <p>Género: ${properties.gender}</p>
      <p>Altura: ${properties.height} cm</p>
      <p>Peso: ${properties.mass}</p>
      <p>Color de ojos: ${properties.eye_color}</p>
    `;
        // así se añade el div al contenedor
        listContainer.appendChild(divElement);
      })
      .catch((err) => console.error(err));
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
