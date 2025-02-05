const searchBox = document.getElementById("search-box");
const photoContainer = document.getElementById("photo-container");
const searchButton = document.getElementById("search-button");

const API_KEY = window.API_KEY;

async function searchImage(query) {
  if (!API_KEY) {
    console.error("Error: API Key no encontrada.");
    return;
  }

  const url = `https://api.unsplash.com/search/photos?client_id=${API_KEY}&query=${query}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data); // Verifica si devuelve resultados
  } catch (error) {
    console.error("Error en la búsqueda:", error);
  }
}

async function searchImage() {
  const searchContent = searchBox.value.trim(); // Evita búsquedas vacías

  if (!searchContent) {
    photoContainer.innerHTML = "<p>🔎 Ingrese una búsqueda.</p>";
    return;
  }

  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?client_id=${API_KEY}&query=${searchContent}`
    );

    if (!response.ok) {
      throw new Error(
        `Error ${response.status}: No se pudo conectar a Unsplash`
      );
    }

    const data = await response.json();

    if (data.results.length === 0) {
      photoContainer.innerHTML = "<p>❌ No se encontraron imágenes.</p>";
      return;
    }

    const photo = data.results[Math.floor(Math.random() * data.results.length)];
    photoContainer.innerHTML = `<img src="${photo.urls.regular}" alt="${photo.alt_description}" style="max-width:100%;border-radius:8px;">`;
  } catch (error) {
    console.error("Error al buscar imágenes:", error);
    photoContainer.innerHTML =
      "<p>⚠️ Error al obtener imágenes. Intenta de nuevo.</p>";
  }
}

// Evento del botón
searchButton.addEventListener("click", searchImage);
