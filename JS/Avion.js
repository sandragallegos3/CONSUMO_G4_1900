var UrlAviones = 'http://20.216.41.245:90/G4_19/controller/Avion.php?op=get_aviones';
var UrlInsertAviones = 'http://20.216.41.245:90/G4_19/controller/Avion.php?op=insert_aviones';
var UrlGatAvion = 'http://20.216.41.245:90/G4_19/controller/Avion.php?op=get_idaviones';
var UrlUpdateAvion = "http://20.216.41.245:90/G4_19/controller/Avion.php?op=update_aviones";
var UrlDeleteAvion = "http://20.216.41.245:90/G4_19/controller/Avion.php?op=delete_aviones";
$(document). ready(function(){
    CargarAviones();
});

function CargarAviones(){
    $.ajax({
        url: UrlAviones,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var valores = '';


            for(i=0; i< MiItems.length; i++){
                valores += '<tr>'+
                '<td>'+ MiItems[i].NumeroAvion  +'</td>'+
                '<td>'+ MiItems[i].TipoAvion  +'</td>'+
                '<td>'+ MiItems[i].HorasVuelo  +'</td>'+
                '<td>'+ MiItems[i].CapacidadPasajeros  +'</td>'+
                '<td>'+ MiItems[i].FechaPrimerVuelo  +'</td>'+
                '<td>'+ MiItems[i].PaisConstruccion  +'</td>'+
                '<td>'+ MiItems[i].CantidadVuelos  +'</td>'+
                '<td>' +
                '<button class = "btn btn-info" onclick = "CargarAvionID(' + MiItems[i].NumeroAvion +')">Editar</button>' +
                '<td>' + 
                '<button class="btn btn-danger" onclick="DeleteAvion('+MiItems[i].NumeroAvion+')">Eliminar</button>'+
                '</td>'+
            '</tr>';
            
            $('#DataAvion').html(valores);
            }
        }

    });
}


function AgregarAvion(){
    var datoAvion= {
        NumeroAvion: $('#NumeroAvion').val(),
        TipoAvion: $('#TipoAvion').val(),
        HorasVuelo: $('#HorasVuelo').val(),
        CapacidadPasajeros: $('#CapacidadPasajeros').val(),
        FechaPrimerVuelo: $('#FechaPrimerVuelo').val(),
        PaisConstruccion: $('#PaisConstruccion').val(),
        CantidadVuelos: $('#CantidadVuelos').val()

        
    };

    var datosavionjson = JSON.stringify(datoAvion);

    $.ajax({
        url: UrlInsertAviones,
        type: 'POST',
        data: datosavionjson,
        datatype: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log (reponse);
            alert('AVIÓN AGREGADO CORRECTAMENTE');
            window.location.reload()
         },

          error: function(textStatus, errorThrown ){
            alert('ERROR AL AGREGAR EL AVIÓN ' + textStatus + errorThrown);
         }
    });

    alert('Aviso');

}


function CargarAvionID(NumeroAvion){
    var datosCArgarAvion = {
        NumeroAvion: NumeroAvion
    };
    var DatosAvionJson = JSON.stringify(datosCArgarAvion);

    $.ajax({
        url: UrlGatAvion,
        type: 'POST',
        data: DatosAvionJson,
        datatype: 'JSON',
        contenttype: 'application/json',
          success: function(reponse){
            var MiItems = reponse;

            $('#NumeroAvion').val(MiItems[0].NumeroAvion);
            $('#TipoAvion').val(MiItems[0].TipoAvion);
            $('#HorasVuelo').val(MiItems[0].HorasVuelo);
            $('#CapacidadPasajeros').val(MiItems[0].CapacidadPasajeros);
            $('#FechaPrimerVuelo').val(MiItems[0].FechaPrimerVuelo);
            $('#PaisConstruccion').val(MiItems[0].PaisConstruccion);
            $('#CantidadVuelos').val(MiItems[0].CantidadVuelos);


           var btnActualizar = '<input type = "submit" id="btn_Actualizar" onclick = "UpdateAvion(' + MiItems[0].NumeroAvion + ')"' +
            'value="Actualizar Avion" class="btn btn-primary">';
             $('#btnAgregarAvion').html(btnActualizar);

          }
     });
}



function UpdateAvion(NumeroAvion){
    var DatosAvion= {
        NumeroAvion: NumeroAvion,
        TipoAvion: $('#TipoAvion').val(),
        HorasVuelo: $('#HorasVuelo').val(),
        CapacidadPasajeros: $('#CapacidadPasajeros').val(),
        FechaPrimerVuelo: $('#FechaPrimerVuelo').val(),
        PaisConstruccion: $('#PaisConstruccion').val(),
        CantidadVuelos: $('#CantidadVuelos').val()
        
    };
    var DatosAvionJson = JSON.stringify(DatosAvion);

    $.ajax({
        url: UrlUpdateAvion,
        type: 'PUT',
        data: DatosAvionJson,
        datatype: 'JSON',
        contenttype: 'application/json',
             success: function(reponse){
                console.log(reponse);
                 alert("AVIÓN ACTUALIZADO");
                window.location.reload()
                 
            },

             error: function(textStatus, errorThrown ){
            alert('ERROR AL ACTUALIZAR EL AVIÓN' + textStatus + errorThrown);
            } 
    });


alert('Aviso');

}

function DeleteAvion(NumeroAvion){

    var DatosAvion= {

        NumeroAvion: NumeroAvion

    }

    var DatosAvionjson = JSON.stringify(DatosAvion);

    $.ajax({
        url: UrlDeleteAvion,
        type: 'DELETE',
        data: DatosAvionjson,
        datatype: 'JSON',   
        contenttype: 'application/json',
        succes: function(response){
            console.log(response);
        }

    });

    alert("AVIÓN ELIMINADO CORRECTAMENTE");
    window.location.reload()


}