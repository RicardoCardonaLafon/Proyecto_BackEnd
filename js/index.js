$(document).ready(function() {
    $('select').material_select(); 
});


/*
  Creación de una función personalizada para jQuery que detecta cuando se detiene el scroll en la página
*/
$.fn.scrollEnd = function(callback, timeout) {
  $(this).scroll(function(){
    var $this = $(this);
    if ($this.data('scrollTimeout')) {
      clearTimeout($this.data('scrollTimeout'));
    }
    $this.data('scrollTimeout', setTimeout(callback,timeout));
  });
};
/*
  Función que inicializa el elemento Slider
*/

function inicializarSlider(){
  $('#rangoPrecio').ionRangeSlider({
    type: 'double',
    grid: false,
    min: 0,
    max: 100000,
    from: 200,
    to: 80000,
    prefix: '$',

  });
}


/*
  Función que reproduce el video de fondo al hacer scroll, y deteiene la reproducción al detener el scroll
*/
/* NO ESTÁ EL VIDEO EN EL CODIGO DE PARTIDA
function playVideoOnScroll(){
  var ultimoScroll = 0,
      intervalRewind;
  var video = document.getElementById('vidFondo');
  $(window)
    .scroll((event)=>{
      var scrollActual = $(window).scrollTop();
      if (scrollActual > ultimoScroll){
       video.play();
     } else {
        //this.rewind(1.0, video, intervalRewind);
        video.play();
     }
     ultimoScroll = scrollActual;
    })
    .scrollEnd(()=>{
      video.pause();
    }, 10)
}
*/

//Cargando Ciudades y demas parametros para la busqueda personalizada

function loadSelects(){

$.ajax(
    {
    url:'/loadCities.php',
    type:'GET',
    data:{},
    success: function (data) {
        var SeelctCiudades = $("#selectCiudad");
        SeelctCiudades.html("");
        SeelctCiudades.append( "<option value='' disabled>Elige una ciudad</option>");
        SeelctCiudades.append( "<option value='' selected >Todas</option>");
        jQuery.each(JSON.parse(data), function (i,val) {
            SeelctCiudades.append("<option value=''>"+ val +"</option>")
        });
        SeelctCiudades.material_select();
        }

    }

);

$.ajax(
    {
        url:'/loadTypes.php',
        type:'GET',
        data:{},
        success: function (data) {
            var SeelctTypes = $("#selectTipo");
            SeelctTypes.html("");
            SeelctTypes.append( "<option value='' disabled>Elige un tipo</option>");
            SeelctTypes.append( "<option value='' selected >Todos</option>");
            jQuery.each(JSON.parse(data), function (i,val) {
            SeelctTypes.append("<option value=''>"+ val +"</option>")
            });
            SeelctTypes.material_select();
        }

    }

);

}

inicializarSlider();
loadSelects();
//------------------------------------
//playVideoOnScroll();
//NO VINO EL ARCHIVO DE VIDEO
//------------------------------------

//A partir de aqui empieza el codigo de la logica de negocio del sitio
$('#mostrarTodos').on('click',function(){

  $.ajax({
    url:'buscador.php',
    type: 'GET',
    data:{'oper':'ofertas','city':'All','type':'all','min':0,'max':100000}

  }).done(function(resp){
    var jsn=JSON.parse(resp)
    $('#searchResult').empty()
    for (item of jsn) {
      var card= `<div class='offertItem card row '>
          <div class='col l5  '>
            <img class='col l12'src='img/home.jpg'>
          </div>
          <div class='col l7'>
            <div class='card-content'>
              <p>  <strong>Direccion:</strong>${item.Direccion}</p>
              <p>  <strong>Ciudad:</strong> ${item.Ciudad}</p>
              <p>  <strong>Telefono:</strong>${item.Telefono}</p>
              <p>  <strong>Codigo_Postal:</strong>${item.Codigo_Postal}</p>
              <p>  <strong>Tipo: </strong>${item.Tipo}</p>
              <p>  <strong>Precio:</strong>${item.Precio}</p>
            </div>
            <div class='card-action'>
              <a href='#'>Ver m&aacutes</a>
            </div>
          </div>
        </div>`;
      $('#searchResult').append(card)
    }
  })
})

//Busqueda personalizada
$('#submitButton').on('click',function(event){
  event.preventDefault()
  var rango= $('#rangoPrecio').val().split(';')
  $.ajax({
    url:'buscador.php',
    type: 'GET',
    data:{'oper':'personalizada','city':$('#selectCiudad').val(),'type':$('#selectTipo').val(),'min':$(rango)[0],'max':$(rango)[1]}

  }).done(function(resp){
    var jsn=JSON.parse(resp)
    $('#searchResult').empty()
    for (item of jsn) {
      var card= `<div class='offertItem card row '>
          <div class='col l5  '>
            <img class='col l12'src='img/home.jpg'>
          </div>
          <div class='col l7'>
            <div class='card-content'>
              <p>  <strong>Direccion:</strong>${item.Direccion}</p>
              <p>  <strong>Ciudad:</strong> ${item.Ciudad}</p>
              <p>  <strong>Telefono:</strong>${item.Telefono}</p>
              <p>  <strong>Codigo_Postal:</strong>${item.Codigo_Postal}</p>
              <p>  <strong>Tipo: </strong>${item.Tipo}</p>
              <p>  <strong>Precio:</strong>${item.Precio}</p>
            </div>
            <div class='card-action'>
              <a href='#'>Ver m&aacutes</a>
            </div>
          </div>
        </div>`;
      $('#searchResult').append(card)
    }
  })
})
