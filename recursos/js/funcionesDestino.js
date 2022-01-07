/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 


25/12/2021 20:23*/


/*
* 
* @returns void
* @params  --
* 
* Función del listener "click" del botón que tiene la opción de país nuevo o visitado
* 
* De entrada newOrNot no existe salvo que sea pulsado alguna vez el botón
* Desde esa primera vez alternará valor con nulo de nuevo, mostrando una clase
*      activa para la nueva posición 
*/
function changeToggleButton(){
        if(newOrNot==null){
          NUEVO.classList.remove('active');
          REPITO.classList.add('active');
          newOrNot = "nuevoPais";
        }else{
          REPITO.classList.remove('active');
          NUEVO.classList.add('active');
          newOrNot = null;
        }
    }



function buscarListener(){
    //Recopilamos los valores
    //1) Nombre e id del usuario
    let nombre, id_usuario;
    if(sessionStorage.getItem('nombre')){
        nombre     = sessionStorage.getItem('nombre');
        id_usuario = sessionStorage.getItem('id_usuario');
    }
      
    //2) newOrNot está creado previamente y obtiene el valor de su listener
    
    //3) Creación de las variables que servirán para llamar a la API
    let hemisferio = null, continente = null, idioma = null, covid = 0;
    let playa, montaña, cultural, safari, exotico, ong, peligroso, turistico;
    
    //3.1) Obtener el valor de los que puede ser que no estén mostrados
        //Sólo si están mostrados, se adquiere, sino null
    if(RADIO_CONTINENTE_TRUE.checked)
      continente = SELECT_CONTINENTE.options[SELECT_CONTINENTE.selectedIndex].text;
    if(RADIO_IDIOMA_TRUE.checked)
      idioma = SELECT_IDIOMA.options[SELECT_IDIOMA.selectedIndex].text;
    if(RADIO_COVID_TRUE.checked)
      covid = SELECT_COVID.options[SELECT_COVID.selectedIndex].value;

    //3.2) Similar el campo de hemisferio, pero diferente
        //No adquiere el valor de un desplegable, sino del radio activo
    if(document.getElementById('hNorte').checked)
      hemisferio = "Norte";
    else if(document.getElementById('hSur').checked)
      hemisferio = "Sur";
    else
      hemisferio = null;
    
    //3.3) Recopilación de los campos "check" activos o no 1 = activo; 0 = no activo
    if(document.getElementById('playa').checked)
      playa = 1;
    else
      playa = 0;
    
    if(document.getElementById('montaña').checked)
      montaña = 1;
    else 
      montaña= 0;
    
    if(document.getElementById('cultural').checked)
      cultural = 1;
    else
      cultural = 0;
    
    if(document.getElementById('safari').checked)
      safari = 1;
    else
      safari = 0;
    
    if(document.getElementById('exotico').checked)
      exotico = 1;
    else
      exotico = 0;
    
    if(document.getElementById('ong').checked)
      ong = 1;
    else
      ong = 0;
    
    if(document.getElementById('peligroso').checked)
      peligroso = 1;
    else
      peligroso = 0;
    
    if(document.getElementById('turistico').checked)
      turistico = 1;
    else
      turistico = 0;
      
    //Una vez recopilados los datos, pedimos el resultado a la API
    $.ajax({
      type: "GET",
      url: "../APIs/Destino.php",
      data: { "newOrNot": newOrNot,
              "hemisferio": hemisferio,
              "continente": continente,
              "idioma": idioma,
              "playa": playa,
              "montaña": montaña,
              "cultural": cultural,
              "safari": safari,
              "exotico": exotico,
              "ong": ong,
              "peligroso": peligroso,
              "turistico": turistico,
              "covid": covid,
              "id_usuario": id_usuario
          },
      success: function(response){
        const resultado = document.getElementById("resultado");
          
        if (response && response.paises != 0){
            //Si hay respuesta (países) --> Crear un select con todos ellos y con 
                //listener para el click
            textoResultado  = "Listado de países ";
            textoResultado += "<select id='paises' class='w-100 form-control' newDesire='newDesire'>";
            textoResultado += "<option disabled selected>Selecciona tu próximo destino</option>";
                //option "Selecciona tu próximo destino" --> Por si sólo hay 1 resultado
                //disabled porque así le puedo poner listener sin problema
                
            for (var i = 0; i < response.length; i++) {
              textoResultado += "<option class='paisesOption' value='"+
                      response[i].id+"'>"+response[i].nombre+"</option>";
            }

            textoResultado += "</select>";

            //Se le da formato al recién creado "select"
            RESULTADO.classList.remove('alert-primary','bg-primary','alert-danger','text-light');
            RESULTADO.classList.add("alert-success", "text-center");
            RESULTADO.innerHTML = textoResultado;

            //Se le añade un listener. Si se pulsa se selecciona como deseo
            const SELECT_RESULTADO = document.getElementById("paises");
            SELECT_RESULTADO.addEventListener('change',function(pais){ // no me deja modularidad
                if(newOrNot!=null){ // No se puede marcar como deseo algo visitado
                RESULTADO.innerHTML = "<p class='alert-primary'>"+
                   "Al ser un país que ya has visitado, no se actualizará como futuro destino"+
                   "<br>Aunque, sin lugar a dudas, <b>"+pais.target[pais.target.selectedIndex].text+
                   "</b> es un destino increíble para repetir</p>";
                }else{
                    const MODAL = document.getElementById('modal_container');
                    const MODAL_TITULO = document.getElementById('tituloModal');
                    const MODAL_BTN_ACEPTAR = document.getElementById('btn_aceptar');
                    const MODAL_BTN_CANCELAR = document.getElementById('btn_cancelar');
                    const MODAL_X_CERRAR = document.getElementById('cerrarModal');
                    const MODAL_BANDERA = document.getElementById('bandera');
                    //Mostramos el modal
                    MODAL.classList.add('show');
                    
                    //Le damos texto
                    MODAL_TITULO.innerHTML = "¿Deseas ir a <b>"
                           +pais.target[pais.target.selectedIndex].text+"</b>?  "+
                           "<img src='../recursos/img/banderas/"+
                            pais.target[pais.target.selectedIndex].text+".png'"+
                            "width='25px' height='25px' />";
                    
                    //Listeners para cerrar el modal (Cancelar y X)
                    MODAL_BTN_CANCELAR.addEventListener("click",function(){
                        MODAL.classList.remove('show');
                    });
                    MODAL_X_CERRAR.addEventListener('click',function(){
                        MODAL.classList.remove('show');
                    });
                    
                    /*Se coloca la bandera del país
                    MODAL_BANDERA.src = "../recursos/img/banderas/"+
                            pais.target[pais.target.selectedIndex].text+".png";*/
                    
                    //Listener para confirmar que se desea ir al país
                    MODAL_BTN_ACEPTAR.addEventListener('click',function(){
                        $.ajax({
                            type: "POST",
                            url: "../APIs/Destino.php",
                            data: { "id_pais":pais.target[pais.target.selectedIndex].value,
                                    "id_usuario": id_usuario
                                },
                            success: function(response){
                                if (response.success == "1")
                                    window.location.href="mapa.html";
                                else
                                    RESULTADO.innerHTML = "<p class='alert-danger text-center'>"+
                                    "Se ha producido un error en la actualización</p>";

                            },
                            error: function(error){
                                RESULTADO.innerHTML = "<p class='alert-danger text-center'>"+
                                    "Se ha producido un error inesperado</p>";
                            }
                        });//AJAX
                    });//Listener btn_aceptar
                }//else
            });//Listener del select creado dinamicamente
        }else{
            RESULTADO.classList.remove('alert-primary','alert-success','bg-primary','text-light');
            RESULTADO.innerHTML = "<p class='alert-danger text-center'>"+
              "No hay ningún país que concuerde</p>";
          }
        },
        error: function(error){
            RESULTADO.classList.remove('alert-primary','alert-success','bg-primary','text-light');
            RESULTADO.innerHTML = "<p class='alert-danger text-center'>"+
              "Se ha producido un error inesperado</p>";
        }
    });
}