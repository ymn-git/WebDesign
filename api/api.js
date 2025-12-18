document.addEventListener("DOMContentLoaded", () => {
  obtenerDatos();
});

async function obtenerDatos() {
  const container = document.getElementById("cards-container");

  try {
    container.innerHTML = "<p>Cargando datos...</p>";

    const respuesta = await fetch("https://restcountries.com/v3.1/all?fields=name,capital,region,population,flags,cca2");
    const datosAPI = await respuesta.json();

    // Recuperar lo que ya está en localStorage
    const existentes = JSON.parse(localStorage.getItem("paisesAPI") || "[]");

    // Combinar evitando duplicados por nombre común
    const mapa = new Map();
    [...existentes, ...datosAPI].forEach(p => {
      if (p && p.name && p.name.common) {
        mapa.set(p.name.common, p);
      }
    });

    const combinados = Array.from(mapa.values());

    // Guardar de nuevo en localStorage
    localStorage.setItem("paisesAPI", JSON.stringify(combinados));

    container.innerHTML = "";

    // Elegir 12 aleatorios del conjunto combinado
    const aleatorios = combinados.sort(() => Math.random() - 0.5).slice(0, 12);

    aleatorios.forEach((pais) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${pais.flags?.png || ""}" alt="${pais.flags?.alt || "Sin bandera"}">
        <h3>${pais.name.common}</h3>
        <p><strong>Capital:</strong> ${pais.capital?.[0] || "Sin datos"}</p>
        <p><strong>Región:</strong> ${pais.region || "Sin datos"}</p>
        <p><strong>Población:</strong> ${pais.population ? pais.population.toLocaleString() : "Sin datos"}</p>
        <p><strong>Código ISO:</strong> ${pais.cca2 || "No cargado"}</p>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    container.innerHTML = `<p>Error al cargar los datos: ${error.message}</p>`;
  }
}