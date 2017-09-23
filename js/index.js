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

function Busqueda_Personalizada() {

    /*var search = $("#serachResult");

    search.html("");*/

    $.ajax(
        {
        url:'buscador.php',
        type:'GET',
        data:{oper:'Personalizada',
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

function Mostrar_Todo() {

    /*var search = $("#serachResult");

    search.html("");*/

    $.ajax(
        {
        url:'buscador.php',
        type:'GET',
        data:{oper:'Todo',
        city:$("#selectCiudad option:selected").text(),
        type:$("#selectTipo option:selected").text(),      
        minValue:$("#rangoPrecio").data("from"),
        maxValue:$("#rangoPrecio").data("to")
        },

        success: function (data) {
            var _Registro = "";
            j=0;
            jQuery.each(JSON.parse(data), function (i,val) {
                if (j <= 9){
                    if (j%2 == 0) {
                        _Registro = _Registro + "<p>" + val + ": ";
                    } else {
                        _Registro = _Registro + val + "</p>";
                    }    
                    j=j+1;    
                } else {
                    _Registro= '<div>' + _Registro + "</div><div class='divider''></div>";
                    $(".img").append("<img src='img/home.jpg' style='height: 1%;margin-right:10px'>");
                    $(".itemMostrado").append(_Registro);
                    _Registro = "<p>" + val + ": ";
                    j = 1;
                    
                }
                
            }); 
            
        }

        }
    );
}

$(document).ready(function() {

    loadSelects();
    inicializarSlider();

    $("#formulario").on("submit",function (e) {
        e.preventDefault();
        //search(false);
    });

    $("#mostrarTodos").click(function () {
        Mostrar_Todo();
    });
    
    $("#submitButton").click(function () {
        Busqueda_Personalizada();
    });

});