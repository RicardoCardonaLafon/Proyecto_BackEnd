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

function loadSelects(){

$.ajax(
    {
        url:'loadCities.php',
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
        url:'loadTypes.php',
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

function search(all) {

    var search = $("#serachResult");

    search.html("");

    $.ajax(
        {
        url:'search.php',
        type:'GET',
        data:{ showAll:all,
        city:$("#selectCiudad option:selected").text(),
        type:$("#selectTipo option:selected").text(),
        minValue:$("#rangoPrecio").data("from"),
        maxValue:$("#rangoPrecio").data("to")
        },

        success: function (data) {
        search.html(data);
        }

        }

    );

    }

$(document).ready(function() {

    loadSelects();
    inicializarSlider();

    $("#formulario").on("submit",function (e) {
        e.preventDefault();
        search(false);
    });

    $("#mostrarTodos").click(function () {
        search(true);
    });

});