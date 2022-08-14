
var UrlPasajeros = 'http://20.216.41.245:90/G4_19/controller/Pasajeros.php?op=GetPasajeros';
var UrlInsertPasajero = 'http://20.216.41.245:90/G4_19/controller/Pasajeros.php?op=insert_pasajeros';
var UrlGetPasajero = 'http://20.216.41.245:90/G4_19/controller/Pasajeros.php?op=get_idpasajeros';
var UrlUpdatePasajero = 'http://20.216.41.245:90/G4_19/controller/Pasajeros.php?op=update_pasajeros';
var UrlDeletePasajero = 'http://20.216.41.245:90/G4_19/controller/Pasajeros.php?op=delete_pasajeros';

$(document).ready(function(){
    CargarPasajeros();
});

function CargarPasajeros(){
    $.ajax({
        url: UrlPasajeros,
            type: 'GET',
                datatype: 'JSON',
                    success: function (reponse){
                        var MiItems = reponse;
                        var Valores = '';

                        for (i=0; i < MiItems.length; i++){
                            Valores +=  '<tr>' +
                            '<td>' + MiItems[i].CodigoPasajero + '</td>' +
                            '<td>' + MiItems[i].Nombres + '</td>' +
                            '<td>' + MiItems[i].Apellidos + '</td>' +
                            '<td>' + MiItems[i].FechaRegistro + '</td>' +
                            '<td>' + MiItems[i].Nacionalidad + '</td>' +
                            '<td>' + MiItems[i].NumeroTelefono + '</td>' +
                            '<td>' + MiItems[i].Email + '</td>' +
    '<td>' +
    '<button class = "btn btn-info" onclick = "CargarPasajero(' + MiItems[i].CodigoPasajero +')">Editar</button>' +
    '<td>' +
    '<td>' +
    '<button class = "btn btn-danger" onclick = "EliminarPasajero(' + MiItems[i].CodigoPasajero +')">Eliminar</button>' +
    '<td>' +
                            '</tr>';

                            $('#DataPasajeros').html(Valores);

                        }
                    }
    });
}

function AgregarPasajero (){
    var datosPasajero = {

        CodigoPasajero:$('#CodigoPasajero').val(),
        Nombres:$('#Nombres').val(),
        Apellidos:$('#Apellidos').val(),
        FechaRegistro:$('#FechaRegistro').val() ,
        Nacionalidad:$('#Nacionalidad').val(),
        NumeroTelefono:$('#NumeroTelefono').val(),
        Email:$('#Email').val()
    };

    var datosPasajeroJson = JSON.stringify(datosPasajero);

    $.ajax({
        url: UrlInsertPasajero,
            type: 'POST',
                data: datosPasajeroJson,
                    datatype: 'JSON',
                        contenttype: 'application/json',
                            success: function(reponse){
                                console.log (reponse);
                                alert('Pasajero se agrego correctamente :) ');
                            },
                            error: function(textStatus, errorThrown ){
                                alert('Ocurrio un error al agregar pasajero :( ' + textStatus + errorThrown);
                            }
    });

    alert('Aviso');
}

function CargarPasajero (CodigoPasajero){
    var datosPasajero = {
        CodigoPasajero: CodigoPasajero
    };
    var datosPasajeroJson = JSON.stringify(datosPasajero);

    $.ajax({
        url: UrlGetPasajero,
            type: 'POST',
                data: datosPasajeroJson,
                    datatype: 'JSON',
                        contenttype: 'application/json',
                            success: function(reponse){
                                var MiItems = reponse;
                                $('#CodigoPasajero').val(MiItems[0].CodigoPasajero);
                                $('#Nombres').val(MiItems[0].Nombres);
                                $('#Apellidos').val(MiItems[0].Apellidos);
                                $('#FechaRegistro').val(MiItems[0].FechaRegistro);
                                $('#Nacionalidad').val(MiItems[0].Nacionalidad);
                                $('#NumeroTelefono').val(MiItems[0].NumeroTelefono);
                                $('#Email').val(MiItems[0].Email);

                                var btnActualizar = '<input type = "submit" id="btn_Actualizar" onclick = "ActualizarPasajero(' + MiItems[0].CodigoPasajero + ')"' +
                                'value="Actualizar Pasajero" class="btn btn-primary"></input>';
                                $('#btnAgregarPasajero').html(btnActualizar);

                            }
                        });
}

function ActualizarPasajero(CodigoPasajero){
    var datosPasajero = {
        CodigoPasajero: CodigoPasajero,
        Nombres:$('#Nombres').val(),
        Apellidos:$('#Apellidos').val(),
        FechaRegistro:$('#FechaRegistro').val() ,
        Nacionalidad:$('#Nacionalidad').val(),
        NumeroTelefono:$('#NumeroTelefono').val(),
        Email:$('#Email').val()
    };
    var datosPasajeroJson = JSON.stringify(datosPasajero);

    $.ajax({
        url: UrlUpdatePasajero,
        type: 'PUT',
            data: datosPasajeroJson,
                datatype: 'JSON',
                    contenttype: 'application/json',
                        success: function(reponse){
                            console.log(reponse);
                            alert("Pasajero actualizado :) ");
                        },
                        error: function(textStatus, errorThrown ){
                            alert('Error al actualizar pasajero :( ' + textStatus + errorThrown);
                        } 
    });
    alert('Aviso');

}

function EliminarPasajero(CodigoPasajero){
    var datosPasajero = {
        CodigoPasajero: CodigoPasajero
    };
    var datosPasajeroJson = JSON.stringify(datosPasajero);

    $.ajax({
        url: UrlDeletePasajero,
        type: 'DELETE',
            data: datosPasajeroJson,
                datatype: 'JSON',
                    contenttype: 'application/json',
                        success: function(reponse){
                            console.log(reponse); 
                            alert("Pasajero eliminado :) ");     
                        },
                        error: function(textStatus, errorThrown ){
                            alert('Error al eliminar pasajero :( ' + textStatus + errorThrown);
                        }                
    });
    alert('Aviso');
    CargarPasajeros(); 
}


