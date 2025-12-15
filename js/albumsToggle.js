document.addEventListener('DOMContentLoaded', function () {
  // Selecciona todas las secciones de discografía, excepto las que explícitamente tengan la clase "extras"
  var containers = Array.from(document.querySelectorAll('.discografia')).filter(function(el){
    return !el.classList.contains('extras');
  });
  if (!containers.length) return;

  containers.forEach(function (container) {
    // Crear un id único para el app container
    var appId = 'albums-app-' + Math.floor(Math.random() * 1000000);
    var appDiv = document.createElement('div');
    appDiv.id = appId;
    appDiv.className = 'albums-toggle-wrapper';

    // Insertar el control *fuera* de la sección (antes de la sección)
    container.parentNode.insertBefore(appDiv, container);

    // Template: dropdown select
    appDiv.innerHTML = '<div class="albums-controls"><label for="albums-filter-' + appId + '" class="filter-label">Filtrar por:</label><select id="albums-filter-' + appId + '" class="albums-filter"><option value="" selected disabled>Selecciona un tipo</option><option value="all">Todos</option><option value="estudio">Estudio</option><option value="en-vivo">En vivo</option><option value="recopilacion">Recopilación</option></select></div>';

    // Inicializar Vue app para controlar la UI (solo gestiona el estado del select)
    var app = Vue.createApp({
      data: function () { return { selected: 'all' }; },
      mounted: function () {
        var self = this;
        var select = document.getElementById('albums-filter-' + appId);
        // Si el usuario mantiene el placeholder (valor vacío), mostrar todos inicialmente
        select.addEventListener('change', function () { self.setFilter(select.value); });
      },
      methods: {
        setFilter: function (type) {
          this.selected = type;
          var lis = container.querySelectorAll('ul.list-group li');
          lis.forEach(function (li) {
            // placeholder ('') o 'all' => mostrar todo
            if (type === '' || type === 'all') {
              li.classList.remove('d-none');
              return;
            }
            var className = 'album-' + (type === 'en-vivo' ? 'en-vivo' : (type === 'recopilacion' ? 'recopilacion' : 'estudio'));
            if (li.classList.contains(className)) li.classList.remove('d-none'); else li.classList.add('d-none');
          });
        }
      }
    });

    app.mount('#' + appId);
  });
});
