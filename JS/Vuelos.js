var UrlVuelos= 'http://20.216.41.245:90/G4_19/Controller/Vuelos.php?op=GetVuelos';
var UrlGetVuelos = 'http://20.216.41.245:90/G4_19/Controller/Vuelos.php?op=IdVuelos';
var UrlInsertVuelos= 'http://20.216.41.245:90/G4_19/Controller/Vuelos.php?op=InsertVuelos';
var UrlUpdateVuelos = 'http://20.216.41.245:90/G4_19/Controller/Vuelos.php?op=update_vuelos';
var UrlDeleteVuelos = 'http://20.216.41.245:90/G4_19/Controller/Vuelos.php?op=delete_vuelos';
$(document).ready(function(){

    CargarVuelos();
 

});

/*SI FUNCIONA :)*/ 
function CargarVuelos(){
    $.ajax({
        url: UrlVuelos,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var valores = '';


            for(i=0; i< MiItems.length; i++){
                valores += '<tr>'+
                '<td>'+ MiItems[i].CodigoVuelo +'</td>'+
                '<td>'+ MiItems[i].CiudadOrigen +'</td>'+
                '<td>'+ MiItems[i].CiudadDestino +'</td>'+
                '<td>'+ MiItems[i].FechaVuelo +'</td>'+
                '<td>'+ MiItems[i].CantidadPasajeros +'</td>'+
                '<td>'+ MiItems[i].TipoAvion +'</td>'+
                '<td>'+ MiItems[i].DistanciaKm +'</td>'+
                '<td>' +
                '<button class = "btn btn-info" onclick = "CargarVuelosID(' + MiItems[i].CodigoVuelo +')">Editar</button>' +
                '<td>' + 
                '<button class="btn btn-danger" onclick="EliminarVuelo('+MiItems[i].CodigoVuelo+')">Eliminar</button>'+
                '</td>'+
            '</tr>';
            
            $('#DataVuelos').html(valores);
            }
        }

    });
}


/*SI FUNCIONA :)*/ 
function AgregarVuelo(){
    var datovuelo= {
        CodigoVuelo: $('#Codigo').val(),
        CiudadOrigen: $('#CiudadDeOrigen').val(),
        CiudadDestino: $('#CiudadDeDestino').val(),
        FechaVuelo: $('#FechaDeVuelo').val(),
        CantidadPasajeros: $('#CantidadDePasajeros').val(),
        TipoAvion: $('#TipoDeAvion').val(),
        DistanciaKm: $('#DistanciaKm').val()

        
    };

    var datosvuelojson = JSON.stringify(datovuelo);

    $.ajax({
        url: UrlInsertVuelos,
        type: 'POST',
        data: datosvuelojson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log (reponse);
            alert('VUELO AGREGADO CORRECTAMENTE');
            window.location.reload()
         },

          error: function(textStatus, errorThrown ){
            alert('ERROR AL AGREGAR EL VUELO ' + textStatus + errorThrown);
         }
    });

    alert('Aviso');

}


/*SI FUNCIONA :c*/ 
function CargarVuelosID(CodigoVuelo){
    var datosvuelo = {
        CodigoVuelo: CodigoVuelo
    };
    var datosvuelosJson = JSON.stringify(datosvuelo);

    $.ajax({
        url: UrlGetVuelos,
        type: 'POST',
        data: datosvuelosJson,
        datatype: 'JSON',
        contenttype: 'application/json',
          success: function(reponse){
            var MiItems = reponse;

            $('#Codigo').val(MiItems[0].CodigoVuelo);
            $('#CiudadDeOrigen').val(MiItems[0].CiudadOrigen);
            $('#CiudadDeDestino').val(MiItems[0].CiudadDestino);
            $('#FechaDeVuelo').val(MiItems[0].FechaVuelo);
            $('#CantidadDePasajeros').val(MiItems[0].CantidadPasajeros);
            $('#TipoDeAvion').val(MiItems[0].TipoAvion);
            $('#DistanciaKm').val(MiItems[0].DistanciaKm);


           var btnActualizar = '<input type = "submit" id="btn_Actualizar" onclick = "ActualizarVuelo(' + MiItems[0].CodigoVuelo + ')"' +
            'value="Actualizar Vuelo" class="btn btn-primary">';
             $('#btnAgregarVuelos').html(btnActualizar);

          }
     });
}

/*SI FUNCIONA :c*/ 
function ActualizarVuelo(CodigoVuelo){
    var datosvuelo= {
        CodigoVuelo: CodigoVuelo,
        CiudadOrigen: $('#CiudadDeOrigen').val(),
        CiudadDestino: $('#CiudadDeDestino').val(),
        FechaVuelo: $('#FechaDeVuelo').val(),
        CantidadPasajeros: $('#CantidadDePasajeros').val(),
        TipoAvion: $('#TipoDeAvion').val(),
        DistanciaKm: $('#DistanciaKm').val()

        
    };
    var datosvuelosJson = JSON.stringify(datosvuelo);

    $.ajax({
        url: UrlUpdateVuelos,
        type: 'PUT',
        data: datosvuelosJson,
        datatype: 'JSON',
        contenttype: 'application/json',
             success: function(reponse){
                console.log(reponse);
                 alert("VUELO ACTUALIZADO");
                window.location.reload()
                 
            },

             error: function(textStatus, errorThrown ){
            alert('ERROR AL ACTUALIZAR EL VUELO ' + textStatus + errorThrown);
            } 
    });


alert('Aviso');




}

/*SI FUNCIONA :)*/ 
function EliminarVuelo(CodigoVuelo){

    var datosvuelo= {

        CodigoVuelo: CodigoVuelo

    }

    var datosvuelojson = JSON.stringify(datosvuelo);

    $.ajax({
        url: UrlDeleteVuelos,
        type: 'DELETE',
        data: datosvuelojson,
        datatype: 'JSON',   
        contenttype: 'application/json',
        succes: function(response){
            console.log(response);
        }

    });

    alert("VUELO ELIMINADO CORRECTAMENTE");
    CargarVuelos();


}



