//Archivo que sirve para dar modularidad. Son las funciones para el mapa principal

/*
 * 1) Qué color se va a dar atendiendo al parámetro (color en CONST.js)
 * 1B)Qué opacidad se le va a dar
 *        Si ya ha sido seleccionado -> Más oscuro
 *        Si no ha sido seleccionado -> Más claro
 * 2) El método que settea el parámetro recibido de la función previa
 * 3) Método que settea los listeners para cada "polígono"
 * 4) Acción de mostrar un popUp en el click
 * 5) Leyendas
 *     A) Color -> Lo que representa (abajo a la izquierda)
 *     B) Dinámica -> Qué país es, bandera y qué característica (arriba derecha)
 */


/*
* 
* @param {int []} ids     --> ID's de los países que han sido visitados por el user
* @returns {string}(color)--> Devuelve el color con el que se va a "pintar"
*                     
*/
function setColor(ids) {
    if(visitados.includes(ids)) return COLOR_VISITADO;
    else if(vividos.includes(ids)) return COLOR_VIVIDO;
    else if(deseos.includes(ids)) return COLOR_DESEO;
}

/*
* 
* @param {int []} ids     --> ID's de los países que han sido visitados por el user
* @returns {string}(color)--> Devuelve opacidad osucra (visitado) o clara (no visitado)
*                     
*/
function setOpacity(ids){
    if(visitados.includes(ids) || vividos.includes(ids) ||
            deseos.includes(ids)) return 0.7;
    return 0.1;
}

/*
* 
* @param {feature} feature  --> "Polígono" (país) que se va a pintar
* @returns {setStyle.Anonym$0}
*                           --> No devuelve nada, la propia acción de pintar 
*                                 (se va pintando feature a feature)
*
*/
function setStyle(feature) { 
    return { 
        weight: 1,                  //Tamaño de las formas
        opacity: 1,                 //Opacidad toda la forma
        color: '#FFFFFF',           //Color de toda la forma
        dashArray: '2',             //Borde continuo 1 o no
        fillColor: setColor(feature.properties.ID), 
        fillOpacity: setOpacity(feature.properties.ID)
            //Relleno interior y opacidad de forma dinámica
    }; 
}

/*
 * 
 * @param {feature} feature --> No se utiliza porque layer tiene "target" y es
 *                                  necesitario para poner poner los listeners
 *                                  de: click, contextmenu, hover y hoverout 
 * @param {layer} layer     --> "Polígono" con todas las característica, incluso
 *                                  "target" (el referenciado por el listener)
 * @returns {void}          --> No devuelve nada, simplemente se settean los
 *                                  polígonos con los listeners
 */
function onEachFeature(feature, layer) { //No se usa feature, sino layer porque layer tiene target.
    //feature se ejecutaría siempre, incluso cuando carga los 195
    layer.on({
    mouseover: setHover,
    mouseout: setHoverOut,
    click: insertOrDeleteCountry,
    contextmenu: zoomToFeature
    });
}

/*
 * Funciones de los listeners
 */

/*
* 
* Función del botón secundario del ratón
* 
* @param {layer} layer --> capa del click que contiene la feature
* @returns {undefined}-->No devuelve, se sitúa centrado en la feature con animación
*/
function zoomToFeature(layer) {
    map.flyToBounds(layer.target.getBounds());
}


/*
* 
* @param {layer} layer--> capa del click que contiene la feature
* @returns {undefined}--> no devuelve nada
*                     --> el HOVER tiene otro style
*                     --> tiene un update para el control personalizado
*                     
*/
function setHover(layer) {
    let seleccionado = layer.target;
    //let ids = layer.target.feature.properties.ID;
    seleccionado.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '1',
        fillOpacity: 0.5
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge)
        seleccionado.bringToFront();

    //Solo para control personalizado -> Le asigno una capa con las propiedades del país
    info.update(seleccionado.feature.properties);
}

/*
* 
* @param {type} layer --> capa del click que contiene la feature
* @returns {undefined}--> no devuelve nada
*                     --> al quitar el HOVER vuelve al style previo
*                     --> tiene un update para el control personalizado
*                     
*/
function setHoverOut(layer) {
    geojson.resetStyle(layer.target);
    //Solo para control personalizado
    info.update();
}


/*
 * 
 * El listener más importante --> Click. Atendiendo a si ya ha sido visitado o no
 *    el usuario puede visitarlo o borrarlo --> Llamará a dos funciones diferentes
 *    atendiendo a esto
 */

/*
* 
* @param {layer} layer--> capa del click que contiene la feature
* @returns {undefined}--> no devuelve nada
*                     --> si el país ha sido visitado
*                           --> Abre modal de borrar
*                           --> Llama a la API para borrar si el user confirma
*                     --> si no se ha visitado
*                           --> Abre modal de visitar
*                           --> Llama a la API para (visitar,vivir,desear) si
*                                   el user confirma
*/
function insertOrDeleteCountry(layer){
                                
    //Valores de la feature que necesito
    let pais = layer.target.feature.properties.NOMBRE;
    let id   = layer.target.feature.properties.ID;
    
    //Referencias a los objetos HTML
    const MODAL_INSERT = document.getElementById('modal_container');
    const MODAL_DELETE = document.getElementById('modal_container_delete');

    const MODAL_TEXT_INSERT = document.getElementById('tituloModal');
    const MODAL_TEXT_DELETE = document.getElementById('tituloModal_delete');
    
    //listener cerrar ambos modales (con la X roja)
    document.querySelectorAll('.closeModal').forEach(c => {
        c.addEventListener('click',function(){
            MODAL_INSERT.classList.remove('show'); // No haría falta ni esta línea ni la de abajo
            MODAL_DELETE.classList.remove('show');
            location.reload(); //Cambiado a ultima hora por error
        });
    });

        
    /*Si el id del país está en cualquier array
        --> Modal para borrar
        --> Listener con la función de borrar (que llamará a la API)
            --> Es una función anónima que llama a una función porque sino se
                  ejecuta directamente sin confirmar
    */
    if(visitados.includes(id) || vividos.includes(id) || deseos.includes(id)){
        MODAL_DELETE.classList.add('show');
        MODAL_TEXT_DELETE.innerHTML = "¿Desea borrar su estancia en <b>"+pais+"</b>?";
        MODAL_TEXT_DELETE.innerHTML += "<img src='../recursos/img/banderas/"+
                            pais+".png' width='25px' height='25px' />";
        
        //Listener del botón del modal
        document.getElementById("borrarButton").addEventListener("click", function(){
            deleteCountry(id, id_usuario);
        });
    
    /*Si no está el id del país (no ha sido visitado) 
        --> Modal para insertar
        --> Listener con la función de insertar (que llamará a la API)
            --> Es una función anónima que llama a una función porque sino se
                  ejecuta directamente sin confirmar
    */
    }else{
        MODAL_INSERT.classList.add('show');
        MODAL_TEXT_INSERT.innerHTML = "¿Has estado o deseas estar en <b>"+pais+"</b>? ";
        MODAL_TEXT_INSERT.innerHTML += "<img src='../recursos/img/banderas/"+
                            pais+".png' width='25px' height='25px' />";
        //listener para los botones del modal insert
            //Se crea aquí para tener acceso al resto de valores
        document.querySelectorAll('.visitadoListener').forEach(c => {
            c.addEventListener("click",function(){
                if(this.value >= 1 && this.value <= 3) 
                    insertCountry(id, id_usuario, this.value);
            });
        });
    }
}










//NOTA DE DESARROLLO --> Se ha implementado a última hora que el error se muestre
//      en un modal de error, antes era en un alert. No ha sido lo suficientemente
//      probado.




/*
    Función que llama a la API para insertar --> POST
        --> Si devuelve lo esperado (success)
            --> Se actualiza la página para que se muestre instantáneamente
                --> Se puede mirar llamar a setStyle pero da problemas y es más sencillo así
        --> Si no se devuelve lo esperado, se muestra un mensaje de error
*/
function insertCountry(id, id_usuario, visitado){
    /*Por no mostrar un alert y seguir el estilo de la web, se reutiliza el modal
        del delete para mostrar un posible mensaje de error*/
    const MODAL_INSERT = document.getElementById('modal_container');
    const MODAL_ERROR =  document.getElementById('modal_container_error');
    const MODAL_TEXT_ERROR = document.getElementById('tituloModal_error');
    const MODAL_CLOSE =  document.getElementById('closeModalError');
    
    
    $.ajax({
        type: "POST",
        url: '../APIs/Paises.php',
        data: { "id_pais": id,
                "id_usuario": id_usuario,
                "visitado": visitado
            },
        success: function(response){
            if (response.success){
                /*switch(visitado){ case 1: visitados.push(id)}; // etc
                setStyle(layer.target.feature);
                MODAL_INSERT.classList.remove('show');
                
                //Habría que añadir el layer como parámetro recibido --> Línea 241
                        //Habría que enviar el layer en la llamada   --> Línea 212
                        // Habría que quitar el reload de los modales
                */
                location.reload();
            }
            else{
                //Se cierra el modal que estaba abierto
                MODAL_INSERT.classList.remove('show');
                //Se abre el modal de error
                MODAL_ERROR.classList.add('show');
                //Se muestra el error
                MODAL_TEXT_ERROR.innerHTML="No se ha podido marcar el país como visitado";
                
                //Se pone el listener para cerrar el modal
                MODAL_CLOSE.addEventListener('click',function(){
                    location.reload(); // Para reiniciar todo a ver si se soluciona
                });
            }
        },
        error: function(response){
            //Se cierra el modal que estaba abierto
            MODAL_INSERT.classList.remove('show');
            //Se abre el modal de error
            MODAL_ERROR.classList.add('show');
            //Se muestra el error
            MODAL_TEXT_ERROR.innerHTML="Error inesperado";

            //Se pone el listener para cerrar el modal
            MODAL_CLOSE.addEventListener('click',function(){
                location.reload(); // Para reiniciar todo a ver si se soluciona
            });
        }
    });
}



/*
    Función que llama a la API para borrar --> DELETE
        --> Si devuelve lo esperado (success)
            --> Se actualiza la página para que se muestre instantáneamente
                --> Se puede mirar llamar a setStyle pero da problemas y es más sencillo así
        --> Si no se devuelve lo esperado, se muestra un mensaje de error
*/
function deleteCountry(id, id_usuario){
   /*Por no mostrar un alert y seguir el estilo de la web, se reutiliza el modal
        del delete para mostrar un posible mensaje de error*/
    const MODAL_DELETE = document.getElementById('modal_container_delete');
    const MODAL_ERROR =  document.getElementById('modal_container_error');
    const MODAL_TEXT_ERROR = document.getElementById('tituloModal_error');
    const MODAL_CLOSE =  document.getElementById('closeModalError');
    
    
    $.ajax({
        type: "DELETE",
        url: '../APIs/PAISES.php',
        data: { "id": id,
                "id_usuario": id_usuario
            },
        success: function(response){
            if (response.success){
                location.reload();
            }
            else if(response.error){ // Para que no se corte por un undefined
                //Se cierra el modal que estaba abierto
                MODAL_DELETE.classList.remove('show');
                //Se abre el modal de error
                MODAL_ERROR.classList.add('show');
                //Se muestra el error
                MODAL_TEXT_ERROR.innerHTML=response.error;
                
                //Se pone el listener para cerrar el modal
                MODAL_CLOSE.addEventListener('click',function(){
                    location.reload(); // Para reiniciar todo a ver si se soluciona
                });
            }else{
                //Se cierra el modal que estaba abierto
                MODAL_DELETE.classList.remove('show');
                //Se abre el modal de error
                MODAL_ERROR.classList.add('show');
                //Se muestra el error
                MODAL_TEXT_ERROR.innerHTML="Error inesperado";
                
                //Se pone el listener para cerrar el modal
                MODAL_CLOSE.addEventListener('click',function(){
                    location.reload(); // Para reiniciar todo a ver si se soluciona
                });
            }
        }
    });
}


/*
 * No recibe parámetros
 * @returns {setColourLegend.legend}  (leyenda)
 *          -->Crea un div con una leyenda color<->estado de la visita
 *                   y la devuelve para añadirla al mapa en el html
 */
 function setColourLegend(){
    let legend = L.control({position: 'bottomleft'});

    legend.onAdd = function (map) {

    let div = L.DomUtil.create('div', 'info legend');
        div.innerHTML +='<i style="background:'+COLOR_VISITADO+'"></i>'+VISITADO+'<br>';
        div.innerHTML +='<i style="background:'+COLOR_VIVIDO+'"></i>'+VIVIDO+'<br>';
        div.innerHTML +='<i style="background:'+COLOR_DESEO+'"></i>'+DESEADO+'<br>';

    return div;
    };
    return legend;
}

/*
 * 
 * @returns {void}
 * 
 *      --> Este método no recibe ni devuelve nada, simplemente encapsula para
 *      dejar más limpieza en la página que lo carga (poblacion.html)
 *      
 *      --> Crea un div con un título
 *          --> Se actualiza constantemente, si en algún momento, a través del
 *              hover recibe propiedades de una feature o layer, se actualiza,
 *              mostrándolas
 */
function setLegend(){

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    info.update = function (props) {
        this._div.innerHTML = '<h4>¡¡Viajar es divertido!!</h4>';
        if(props){
            this._div.innerHTML += '<span class="infoText">';
            this._div.innerHTML += '<b>'+props.NOMBRE_FORMAL+'</b> ('+props.CONTINENTE+') ';

            this._div.innerHTML += "<img src='../recursos/img/banderas/"+
                    props.NOMBRE+".png' width='25px' height='25px' /> <br />";

            if(visitados.includes(props.ID)){
                this._div.innerHTML += '<span class="infoText">Has visitado ese país</span>';
            }else if(vividos.includes(props.ID)){
                this._div.innerHTML += '<span class="infoText">Has vivido en ese país</span>';
            }else if(deseos.includes(props.ID)){
                this._div.innerHTML += '<span class="infoText">Deseas estar en ese país</span>';
            }else{
                this._div.innerHTML += '<span class="infoText">Nunca has estado en ese país</span>';
            }
        }else{
            this._div.innerHTML += '<span class="infoText">¡Sitúate encima de un país!</span>';
        }
    }

    info.addTo(map); //No devuelve, lo settea directamente
}