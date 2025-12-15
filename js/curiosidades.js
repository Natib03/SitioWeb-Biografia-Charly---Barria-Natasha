document.addEventListener('DOMContentLoaded', function () {
  // Inicializa la galería Venobox en los enlaces con clase .venobox
  new VenoBox({
    selector: '.venobox',
    spinner: 'circle-fade',
    share: false,
    infinigall: true
  });
});
