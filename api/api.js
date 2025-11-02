
document.addEventListener("DOMContentLoaded", () => {
  obtenerDatos();
});

async function obtenerDatos() {
  const container = document.getElementById("cards-container");

  try {
    container.innerHTML = "<p>Cargando datos...</p>";

    const respuesta = await fetch("https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,cca2");

    const datos = await respuesta.json();
    
    try {
      localStorage.setItem('paisesAPI', JSON.stringify(datos));
    } catch (e) {
      console.warn('No se pudo guardar en localStorage:', e);
    }

    

    container.innerHTML = "";

    const aleatorios = datos.sort(() => Math.random() - 0.5).slice(0, 12);

    aleatorios.forEach((pais) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${pais.flags.png}" alt="${pais.flags.alt}">
        <h3>${pais.name.common}</h3>
        <p><strong>Capital:</strong> ${pais.capital?.[0] || "Sin datos"}</p>
        <p><strong>Región:</strong> ${pais.region}</p>
        <p><strong>Población:</strong> ${pais.population.toLocaleString()}</p>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    container.innerHTML = `<p>Error al cargar los datos: ${error.message}</p>`;
  }
}
