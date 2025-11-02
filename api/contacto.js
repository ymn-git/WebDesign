document.addEventListener('DOMContentLoaded', () => {
  const datos = JSON.parse(localStorage.getItem('paisesAPI') || '[]');
  const select = document.getElementById('pais');
  if (!select) return;

  select.innerHTML = '<option value="">Seleccionar país</option>';

  datos
    .map(p => ({ nombre: p?.name?.common, codigo: p?.cca2 }))
    .filter(x => x.nombre)
    .sort((a, b) => new Intl.Collator('es').compare(a.nombre, b.nombre))
    .forEach(({ nombre, codigo }) => {
      const opt = document.createElement('option');
      opt.value = codigo || nombre.toLowerCase().replace(/\s+/g, '-');
      opt.textContent = nombre;
      select.appendChild(opt);
    });

  // Debug opcional: si no hay opciones además de la por defecto, mostrar aviso en consola
  if (select.options.length === 1) {
    console.info('No se encontraron países en localStorage (clave: paisesAPI).');
  }
});
