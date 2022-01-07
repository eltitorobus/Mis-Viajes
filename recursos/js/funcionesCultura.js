//Archivo que sirve para dar modularidad. Son las funciones para los mapas de cultura

/*
 * Funciones Comunes a todos los mapas
 */

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
* @param {layer} layer--> capa del click que contiene la feature
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
 * Funciones particulares de cada mapa
 *      Son las mismas pero se modifica o el color o el dato a mostrar
 *      
 *      1) Qué color se va a dar atendiendo al parámetro
 *      2) El método que settea el parámetro recibido de la función previa
 *      3) Método que settea los listeners para cada "polígono"
 *      4) Acción de mostrar un popUp en el click
 *      5) Leyendas
 *          A) Color -> Lo que representa (abajo a la izquierda)
 *          B) Dinámica -> Qué país es, bandera y qué característica (arriba derecha)
 */









/*
* 
* @param {int} poblacion    --> Población del país
* @returns {string} (color) --> Devuelve el color con el que se va a "pintar"
*                     
*/
function setColorPopulation(poblacion) {
    return poblacion > 100000000 ? '#800026' : 
           poblacion > 50000000 ? '#BD0026' : 
           poblacion > 20000000 ? '#E31A1C' : 
           poblacion > 10000000 ? '#FC4E2A' : 
           poblacion > 5000000 ? '#FD8D3C' : 
           poblacion > 2000000 ? '#FEB24C' : 
           poblacion > 1000000 ? '#FED976' : 
        '#FFEDA0'; 
}

/*
* 
* @param {feature} feature  --> "Polígono" (país) que se va a pintar
* @returns {setStylePopulation.Anonym$0}
*                           --> No devuelve nada, la propia acción de pintar 
*                                 (se va pintando feature a feature)
*                                 
*/
function setStylePopulation(feature) { 
    return { 
        weight: 1,                  //Tamaño de las formas
        opacity: 1,                 //Opacidad toda la forma
        color: '#FFFFFF',           //Color de toda la forma
        dashArray: '2',             //Borde continuo 1 o no
        fillColor: setColorPopulation(feature.properties.POBLACION), 
        fillOpacity: 0.7
    }; 
}

/*
 * 
 * @param {feature} feature --> No se utiliza porque layer tiene "target" y es
 *                                  necesitario para poner poner un listener de click 
 * @param {layer} layer     --> "Polígono" con todas las característica, incluso
 *                                  "target" (en el que se ha hecho click)
 * @returns {void}          --> No devuelve nada, simplemente se settean los
 *                                  polígonos con los listeners
 */
function onEachFeaturePopulation(feature, layer) {
    layer.on({
        mouseover: setHover,
        mouseout: setHoverOut,
        click: showCountryNamePopulation
    });
}

/*
 * 
 * @param {layer} layer --> "Polígono" en el que se ha hecho click
 * @returns {void}      --> No devuelve nada, añade al listener un popUp con info
 */
function showCountryNamePopulation (layer){
    layer.target.bindPopup(
            "País: "+layer.target.feature.properties.NOMBRE_FORMAL+
            "<br />Población: "+layer.target.feature.properties.POBLACION).openPopup();
}




//Las dos leyendas, la de color y la dinámica



/*
 * No recibe parámetros
 * @returns {setColourLegendPopulation.legend}  (leyenda)
 *          -->Crea un div con una leyenda color<->población y la devuelve
 *                  esa leyenda se añadirá al mapa en el html
 */
function setColourLegendPopulation(){
    let legend = L.control({position: 'bottomleft'});

    legend.onAdd = function (map) {
        
    let div = L.DomUtil.create('div', 'info legend');
        div.innerHTML +='<i style="background: #800026"></i> > 50 Millones Habs<br>';
        div.innerHTML +='<i style="background: #BD0026"></i> > 20 Millones Habs<br>';
        div.innerHTML +='<i style="background: #E31A1C"></i> > 10 Millones Habs<br>';
        div.innerHTML +='<i style="background: #FD8D3C"></i> > 5  Millones Habs<br>';
        div.innerHTML +='<i style="background: #FEB24C"></i> > 2  Millones Habs<br>';
        div.innerHTML +='<i style="background: #FED976"></i> > 1  Millones Habs<br>';

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
function setLegendPopulation(){

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    info.update = function (props) {
        this._div.innerHTML = '<h4>Población Mundial</h4>';
        if(props){
            this._div.innerHTML += '<span class="infoText">';
            this._div.innerHTML += '<b>'+props.NOMBRE+'</b> ('+props.CONTINENTE+') ';

            this._div.innerHTML += "<img src='../../recursos/img/banderas/"+
                    props.NOMBRE+".png' width='25px' height='25px' />";

            this._div.innerHTML += "<br />Población: "+props.POBLACION+"</span>";
        }else{
            this._div.innerHTML += '<span class="infoText">¡Sitúate encima de un país!</span>';
        }
    }

    info.addTo(map); //No devuelve, lo settea directamente
}






/*
 * 
 * ECOLOGY -- EMISIONES
 * 
 */





/*
* 
* @param {int} emisiones    --> Emisiones del país
* @returns {string} (color) --> Devuelve el color con el que se va a "pintar"
*                     
*/
function setColorEcology(emisiones) {
    return emisiones > 15 ? '#08210F' : 
           emisiones > 10 ? '#134f23' : 
           emisiones > 5  ? '#155E29' : 
           emisiones > 3  ? '#008F39' : 
           emisiones > 2  ? '#70B578' : 
           emisiones > 1 ? '#B8DABA' : 
        '#DBEDDC'; 
}

/*
* 
* @param {feature} feature  --> "Polígono" (país) que se va a pintar
* @returns {setStyleEcology.Anonym$0}
*                           --> No devuelve nada, la propia acción de pintar 
*                                 (se va pintando feature a feature)
*                     
*/
function setStyleEcology(feature) { 
    return { 
        weight: 1,                  //Tamaño de las formas
        opacity: 1,                 //Opacidad toda la forma
        color: '#FFFFFF',           //Color de toda la forma
        dashArray: '2',             //Borde continuo 1 o no
        fillColor: setColorEcology(feature.properties.EMISIONES), 
        fillOpacity: 0.7
    }; 
}

/*
 * 
 * @param {feature} feature --> No se utiliza porque layer tiene "target" y es
 *                                  necesitario para poner poner un listener de click 
 * @param {layer} layer     --> "Polígono" con todas las característica, incluso
 *                                  "target" (en el que se ha hecho click)
 * @returns {void}          --> No devuelve nada, simplemente se settean los
 *                                  polígonos con los listeners
 */
function onEachFeatureEcology(feature, layer) {
    layer.on({
        mouseover: setHover,
        mouseout: setHoverOut,
        click: showCountryNameEcology
    });
}

/*
 * 
 * @param {layer} layer --> "Polígono" en el que se ha hecho click
 * @returns {void}      --> No devuelve nada, añade al listener un popUp con info
 */
function showCountryNameEcology(layer){
    layer.target.bindPopup(
            "País: "+layer.target.feature.properties.NOMBRE_FORMAL+
            "<br />Emisiones: "+layer.target.feature.properties.EMISIONES).openPopup();
}



//Las dos leyendas, la de color y la dinámica




/*
 * 
 * @returns {void}
 * 
 *      --> Este método no recibe ni devuelve nada, simplemente encapsula para
 *      dejar más limpieza en la página que lo carga (emisiones.html)
 *      
 *      --> Crea un div con un título
 *          --> Se actualiza constantemente, si en algún momento, a través del
 *              hover recibe propiedades de una feature o layer, se actualiza,
 *              mostrándolas
 */
function setLegendEcology(){

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); 
        this.update();
        return this._div;
    };

    info.update = function (props) {
        this._div.innerHTML = '<h4>Emisiones Mundiales por población</h4>';
        if(props){
            this._div.innerHTML += '<span class="infoText">';
            this._div.innerHTML += '<b>'+props.NOMBRE+'</b> ('+props.CONTINENTE+') ';

            this._div.innerHTML += "<img src='../../recursos/img/banderas/"+
                    props.NOMBRE+".png' width='25px' height='25px' />";

            this._div.innerHTML += "<br />Emisiones: "+props.EMISIONES+"</span>";
        }else{
            this._div.innerHTML += '<span class="infoText">¡Sitúate encima de un país!</span>';
        }
    }

    info.addTo(map);
}

/*
 * No recibe parámetros
 * @returns {setColourLegendEcology.legend}( leyenda)
 *          -->Crea un div con una leyenda color<->población y la devuelve
 *                  esa leyenda se añadirá al mapa en el html
 */
function setColourLegendEcology(){
    let legend = L.control({position: 'bottomleft'});

    legend.onAdd = function (map) {
        
    let div = L.DomUtil.create('div', 'info legend');
        div.innerHTML +='<i style="background: #08210F"></i> > 15 <br>';
        div.innerHTML +='<i style="background: #134f23"></i> 10-15<br>';
        div.innerHTML +='<i style="background: #155E29"></i> 5-10 <br>';
        div.innerHTML +='<i style="background: #008F39"></i> 3-5  <br>';
        div.innerHTML +='<i style="background: #70B578"></i> 2-5  <br>';
        div.innerHTML +='<i style="background: #B8DABA"></i> 1-2  <br>';
        div.innerHTML +='<i style="background: #DBEDDC"></i> < 1  <br>';

    return div;
    };
    return legend;
}







/*
 * 
 * PIB -- Economía
 * 
 */





/*
* 
* @param {int} pib          --> PIB del país
* @returns {string} (color) --> Devuelve el color con el que se va a "pintar"
*                     
*/
function setColorPIB(pib) {
    return pib > 5000000 ? '#21164F' :
           pib > 3000000 ? '#281B77' : 
           pib > 1000000 ? '#2C25DC' : 
           pib > 500000  ? '#272AFF' : 
           pib > 350000  ? '#6C4FFF' :  
           pib > 100000  ? '#B494FF' : 
        '#E8DBFF'; 
}

/*
* 
* @param {feature} feature  --> "Polígono" (país) que se va a pintar
* @returns {setStylePIB.Anonym$0}
*                           --> No devuelve nada, la propia acción de pintar 
*                                 (se va pintando feature a feature)
*                     
*/
function setStylePIB(feature) { 
    return { 
        weight: 1,                  //Tamaño de las formas
        opacity: 1,                 //Opacidad toda la forma
        color: '#FFFFFF',           //Color de toda la forma
        dashArray: '2',             //Borde continuo 1 o no
        fillColor: setColorPIB(feature.properties.PIB), 
        fillOpacity: 0.7
    }; 
}

/*
 * 
 * @param {feature} feature --> No se utiliza porque layer tiene "target" y es
 *                                  necesitario para poner poner un listener de click 
 * @param {layer} layer     --> "Polígono" con todas las característica, incluso
 *                                  "target" (en el que se ha hecho click)
 * @returns {void}          --> No devuelve nada, simplemente se settean los
 *                                  polígonos con los listeners
 */
function onEachFeaturePIB(feature, layer) {
    layer.on({
        mouseover: setHover,
        mouseout: setHoverOut,
        click: showCountryNamePIB
    });
}

/*
 * 
 * @param {layer} layer --> "Polígono" en el que se ha hecho click
 * @returns {void}      --> No devuelve nada, añade al listener un popUp con info
 */
function showCountryNamePIB(layer){
    layer.target.bindPopup(
            "País: "+layer.target.feature.properties.NOMBRE_FORMAL+
            "<br />PIB: "+layer.target.feature.properties.PIB).openPopup();
}




//Las dos leyendas, la de color y la dinámica



/*
 * 
 * @returns {void}
 * 
 *      --> Este método no recibe ni devuelve nada, simplemente encapsula para
 *      dejar más limpieza en la página que lo carga (emisiones.html)
 *      
 *      --> Crea un div con un título
 *          --> Se actualiza constantemente, si en algún momento, a través del
 *              hover recibe propiedades de una feature o layer, se actualiza,
 *              mostrándolas
 */
function setLegendPIB(){

    info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info');
        this.update();
        return this._div;
    };

    info.update = function (props) {
        this._div.innerHTML = '<h4>PIB por País</h4>';
        if(props){
            this._div.innerHTML += '<span class="infoText">';
            this._div.innerHTML += '<b>'+props.NOMBRE+'</b> ('+props.CONTINENTE+') ';

            this._div.innerHTML += "<img src='../../recursos/img/banderas/"+
                    props.NOMBRE+".png' width='25px' height='25px' />";
            
            this._div.innerHTML += '<br />PIB: '+props.PIB+' $';
        }else{
            this._div.innerHTML += '<span class="infoText">¡Sitúate encima de un país!</span>';
        }
    }
    info.addTo(map);
}


/*
 * No recibe parámetros
 * @returns {setColourLegendPIB.legend}( leyenda)
 *          -->Crea un div con una leyenda color<->población y la devuelve
 *                  esa leyenda se añadirá al mapa en el html
 */
function setColourLegendPIB(){
    let legend = L.control({position: 'bottomleft'});

    legend.onAdd = function (map) {
        
    let div = L.DomUtil.create('div', 'info legend');
        div.innerHTML +='<i style="background: #21164F"></i> > 5.000.000 $<br>';
        div.innerHTML +='<i style="background: #281B77"></i> > 3.000.000 $<br>';
        div.innerHTML +='<i style="background: #2C25DC"></i> > 1.000.000 $<br>';
        div.innerHTML +='<i style="background: #272AFF"></i> > 500.000 $<br>';
        div.innerHTML +='<i style="background: #6C4FFF"></i> > 350.000 $<br>';
        div.innerHTML +='<i style="background: #B494FF"></i> > 100.000 $<br>';
        div.innerHTML +='<i style="background: #E8DBFF"></i> < 100.000 $<br>';

    return div;
    };
    return legend;
}
