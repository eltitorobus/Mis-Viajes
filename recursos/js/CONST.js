/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Other/javascript.js to edit this template
 */

/*
 * 
 * CONSTANTES
 * 
 * 
 */
    // COLORES DEL SCRIPT
    const COLOR_VISITADO = '#F7D515';
    const COLOR_VIVIDO = '#41CBAF';
    const COLOR_DESEO = '#F45E2E';
    
    // Nombres a escribir
    const VISITADO = 'Visitado';
    const VIVIDO = 'Vivido';
    const DESEADO = 'Deseado';

    
    /*
     * 
     * 
     * 
     * 
     * 
     * 
     * Mapas
     * 
     * 
     * 
     * 
     * 
     * 
     * 
     */
/*
 * 
 * TOKEN necesario para su utilización. Gratuito hasta 50k usuarios
 * 
 */
//TOKEN para el acceso a los mapas --> pk.eyJ1IjoiYnVydXNvaWwiLCJhIjoiY2t2eXp6cnl0MDExNzJwcHE4czRxcTFtayJ9.l27yfXFzGJUP7ZicRWBcJg


/*
 * 
 * Mapas de tipo satélite
 * 
 */

const SAT_US = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', {
	maxZoom: 20,
	attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
}),
      WORLD_PHYSICAL = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: US National Park Service',
	maxZoom: 8
}),
      TOPOGRAPHY_US = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
	maxZoom: 20,
	attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
}),
      GEOPORTAIL_FRANCE = L.tileLayer('https://wxs.ign.fr/{apikey}/geoportail/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&STYLE={style}&TILEMATRIXSET=PM&FORMAT={format}&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}', {
	attribution: '<a target="_blank" href="https://www.geoportail.gouv.fr/">Geoportail France</a>',
	bounds: [[-75, -180], [81, 180]],
	minZoom: 2,
	maxZoom: 18,
	apikey: 'choisirgeoportail',
	format: 'image/png',
	style: 'normal'
}),
      WORLD_AT_NIGHT = L.tileLayer('https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}', {
	attribution: 'Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
	bounds: [[-85.0511287776, -179.999999975], [85.0511287776, 179.999999975]],
	minZoom: 1,
	maxZoom: 8,
	format: 'jpg',
	time: '',
	tilematrixset: 'GoogleMapsCompatible_Level'
}),
      HISTORICAL = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 16
}),
      NONE = L.tileLayer();

let BASEMAPS = {
    "Satélite": SAT_US,
    "Topográfico": TOPOGRAPHY_US,
    "Geoportrail": GEOPORTAIL_FRANCE,
    "Físico": WORLD_PHYSICAL,
    "Noche": WORLD_AT_NIGHT,
    "Histórico": HISTORICAL,
    "Sin Mapa": NONE
};





