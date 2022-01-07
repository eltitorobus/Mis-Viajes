/* 
 * 
 * Created on : 25 diciembre 2021, 11:54:04
 *  Author     : Alejandro Calvo Toribio
 *  
 *  loginLogout.js  -> Página para dar modularidad al comportamiento del último
 *                      nav-link
 *                  -> Este nav-link puede ser "Entrar" (por defecto) que enlaza
 *                      a la página de login o, también, si el usuario ya ha 
 *                      iniciado sesión, puede ser un dropdown con "cerrar sesión"
 *                      o acceso al "área personal"
 *
 */

/*
* 
* @param   {input} LOG_IN_OUT --> parte final del NAV que puede ser "entrar"
*                                 o "área de usuario"
*                                 
*          {string}nombre     --> nombre del usuario que tiene la sesión iniciada
*          
* @returns {void}               
* 
* Esta función no devuelve nada porque lo único que hace es transformar el último
*   nav-link que es "entrar" en un dropdown-item con cerrar sesión o acceso al
*   área personal si se tiene la sesión iniciada
*   
*   1 DROPDOWN-ITEM
*       1 ÁREA PERSONAL -> Acceso a login (al tener la sesión iniciada se 
*                          modifica dinamicamente)
*       2 LOG OUT: xxxx -> Enlace con el nombre del usuario con la sesión iniciada
*                          que cierra la sesión de este y le lleva al index
* 
* Como es una función que se va a necesitar en todas las páginas se modulariza 
*   para ahorrar código
* 
* Cada una de las páginas llama a una función (las siguientes) con su nombre 
*   correspondiente y esta llamará a la función setAreaPersonal, para que 
*   modifique este campo
*/
function setAreaPersonal(LOG_IN_OUT, nombre){
    LOG_IN_OUT.href = "#";
    
    //Se usa ruta relativa para que no de problemas con la organización de carpetas
    const AREA_PERSONAL = 
    "<div class='nav-item dropdown'>"+
    "<a class='nav-link dropdown-toggle text-light p-0' href='#' id='dropdownEntrar'"+
       "data-bs-toggle='dropdown' aria-expanded='false'>Bienvenido: "+nombre+"</a>"+
      "<ul class='dropdown-menu bg-dark' aria-labelledby='dropdownEntrar'>"+
        "<li><a class='dropdown-item bg-dark' href='/HTML/login.html'>Área Personal</a></li>"+
        "<li><a class='dropdown-item bg-dark' href='#' id='logOutAP'>Log Out</a></li>"+
      "</ul>"+
    "</div>";
        
    LOG_IN_OUT.innerHTML = AREA_PERSONAL;
    
    //Listener para el área personal creado ahora
    const LOG_OUT_AP = document.getElementById('logOutAP');

    LOG_OUT_AP.addEventListener('click',function(){
        LOG_OUT_AP.setAttribute('href','#');
        sessionStorage.clear();
        location.href = "/index.html";
    });
}



/*
 *  FUNCIONES IDÉNTICAS PERO PROPIAS DE CADA PÁGINA POR PECULARIEDADES
 */



/*
* 
* @param   {input} LOG_IN_OUT --> parte final del NAV que puede ser "entrar"
*                                 o "área de usuario"
*          
* @returns {void}               
* 
* Esta función es llamada solo desde el INDEX, la función principal es que
*   se transforme el enlace "Entrar" de la navbar en el dropdown mediante la 
*   función previa.
* 
* El index tiene también un botón entrar en el carousel (foto1), por lo que 
*   esta función también cambia el texto de ese botón como "Área personal"
*/
function setLogInOut_index_HTML(LOG_IN_OUT){
    if(sessionStorage.getItem('nombre')){
        
        //Común a todo el NAVBAR --> Área Personal
        setAreaPersonal(LOG_IN_OUT, sessionStorage.getItem('nombre'));
        
        //Comportamiento interfaz "login" propio del index
          //Botón en primera plana del carousel se actualiza
            //Es lo mismo pero no es "Entrar" es "Área Personal"
        document.getElementById('entrarCarousel').innerHTML="Área Personal";
        

    } // No hay else, es lo de serie o está logado y cambia
}

/*
* 
* @param   {input} LOG_IN_OUT --> parte final del NAV que puede ser "entrar"
*                                 o "área de usuario"
*          
* @returns {void}               
* 
* Esta función es llamada solo desde la página "introduccion", la función principal es que
*   se transforme el enlace "Entrar" de la navbar en el dropdown mediante la 
*   función previa.
* 
* En esta página no se necesita ninguna funcionalidad extra
*   Si hay sesión, se cambia el navbar-item "Entrar"
*/
function setLogInOut_introduccion_HTML(LOG_IN_OUT){
    //Común a todo el NAVBAR --> Área Personal
    if(sessionStorage.getItem('nombre'))
        setAreaPersonal(LOG_IN_OUT, sessionStorage.getItem('nombre'));
}

/*
* 
* @param   {input} LOG_IN_OUT --> parte final del NAV que puede ser "entrar"
*                                 o "área de usuario"
*          
* @returns {void}               
* 
* Esta función es llamada solo desde la página "login", la función principal es que
*   se transforme el enlace "Entrar" de la navbar en el dropdown mediante la 
*   función previa.
* 
* Es en esta página donde más funciones extra tiene, puesto que "login" se 
*   transforma en "área personal".
*   
* Lo primero, settea el dropdown común a todo el sitio web
* 
* En lugar de "Entrar" como título, se establece "Hola xxxx" (xxx -> usuario)
* 
* Si el usuario tiene la sesión iniciada no va a salir "nombre" y "pass" con el
*   botón "entrar" para que el usuario entre, sino que todo ello se oculta y se
*   muestran, por el contrario, 3 enlaces a "cerrar sesión", "cambiar"(pass) y
*   borrar (usuario).
*   
* Si el usuario hace click en el 1º (cerrar sesión) simplemente se cierra la 
*   sesión y se le redirige al index (exactamente igual que en la 2ª opción del
*   dropdown-item común a todo el sitio web)
* 
* Si el usuario hace click en el 2º (cambiar pass) se muestra el campo PASS y 2
*   campos que han estado ocultos hasta este momento "confirmar" y el botón de 
*   cambiar contraseña
*   
*   Cuando introduzca la nueva contraseña y la confirmación y pulse en cambiar
*       se llamará a la función changePass de la propia página
*       @see login.html
*
* Si el usuario hace click en el 3º (borrar user) se muestra el botón para 
*   confirmar el borrado del usuario con un texto dinámico con el propio nombre
*   del usuario
*   
*   Cuando el usuario pulse en ¿Borrar xxxx?, se llamará a la función 
*   deleteUser de la propia página
*       @see login.html
*       
*/
function setLogInOut_login_HTML(LOG_IN_OUT){
    //Declaración de las variables a utilizar
    const ELEMENTOS_USER_LOGGEADO = document.getElementById('loggeado');
    
    const TITULO  = document.getElementById('titulo');
    const MENSAJE = document.getElementById('mensaje');
    
    const DIV_INPUT_USUARIO = document.getElementById('divInputUsuario');
    const DIV_INPUT_PASS = document.getElementById('divInputPass');
    const DIV_INPUT_CONFIRMAR = document.getElementById('divInputConfirmar');
    
    const DIV_LOGIN_BUTTON = document.getElementById('divLoginButton');
    const DIV_CHANGE_PASS_BUTTON = document.getElementById('divChangeButton');
    const DIV_DEL_USER_BUTTON = document.getElementById('divDeleteButton');
    
    const DEL_USER_BUTTON = document.getElementById('delUserButton');
    
    const CERRAR_SESION = document.getElementById('cerrar');
    const CAMBIAR_PASS  = document.getElementById('cambiar');
    const BORRAR_USUARIO= document.getElementById('borrar');
    
    
    if(sessionStorage.getItem('nombre')){
        //Común a todo el NAVBAR --> Área Personal
        let nombre = sessionStorage.getItem('nombre');
        setAreaPersonal(LOG_IN_OUT, nombre);
       
        //Propio del login
          //Si está loggeado puede cerrar sesión, cambiar pass y borrar usuario
        ELEMENTOS_USER_LOGGEADO.classList.remove('oculto');
        
            //Mensaje personal
        TITULO.innerHTML = "Hola <b>"+nombre+"</b>";
        
            //no puede iniciar sesión --> Ocultar inputs y botón
        DIV_INPUT_USUARIO.classList.add('oculto');
        DIV_INPUT_PASS.classList.add('oculto');
        DIV_INPUT_CONFIRMAR.classList.add('oculto'); //Redundante
        DIV_LOGIN_BUTTON.classList.add('oculto'); 
        
        
          //FUNCIONALIDAD
            //Si pulsa cerrar sesión --> Se cierra y se va al index
        CERRAR_SESION.addEventListener('click',function(){
            sessionStorage.clear();
            location.href="/index.html";
        });

            //Si se pulsa en cambiar pass --> Se muestran los dos inputs y el botón con otro texto
                //Puede ser que el usuario haya pulsado borrar antes, se oculta 
        
        CAMBIAR_PASS.addEventListener('click',function(){
            //Borrar lo que no es cambiar
            DIV_DEL_USER_BUTTON.classList.add('oculto');
            
            //Mostar lo que es cambiar pass
            MENSAJE.innerHTML = "Introduce la nueva contraseña";
            MENSAJE.classList.remove('alert-danger','alert-success');
            MENSAJE.classList.add('alert-primary');
            
            DIV_INPUT_PASS.classList.remove('oculto');
            DIV_INPUT_CONFIRMAR.classList.remove('oculto');
            
            //Se muestra el botón de cambiar contraseña
            DIV_CHANGE_PASS_BUTTON.classList.remove('oculto');
        });
        
            //Si se pulsa en borrar --> Se borra y mensaje
                //Puede ser que haya pulsado cambiar antes, se oculta todo
        
        //Listener
        BORRAR_USUARIO.addEventListener('click',function(){
            //Ocultar lo que no es borrar
            MENSAJE.innerHTML = "";
            DIV_INPUT_PASS.classList.add('oculto');
            DIV_INPUT_CONFIRMAR.classList.add('oculto');
            DIV_CHANGE_PASS_BUTTON.classList.add('oculto');
        
            //Mostar lo que es borrar
            DIV_DEL_USER_BUTTON.classList.remove('oculto');
            DEL_USER_BUTTON.value = "¿Borrar a "+nombre+"?";
        });
            
    }else{} //Ejecución normal
}


/*
* 
* @param   {input} LOG_IN_OUT --> parte final del NAV que puede ser "entrar"
*                                 o "área de usuario"
*          
* @returns {void}               
* 
* En esta página no se necesita ninguna funcionalidad extra
* 
* Si hay sesión, se cambia el navbar-item "Entrar"
*       
*/
function setLogInOut_registro_HTML(LOG_IN_OUT){
    //Común a todo el NAVBAR --> Área Personal
    if(sessionStorage.getItem('nombre'))
        setAreaPersonal(LOG_IN_OUT, sessionStorage.getItem('nombre'));
}


/*
* 
* @param   {input} LOG_IN_OUT --> parte final del NAV que puede ser "entrar"
*                                 o "área de usuario"
*          
* @returns {void}               
* 
* En esta página no se necesita ninguna funcionalidad extra
* 
* Como es obligatorio tener sesión iniciada, no se comprueba
*       
*/
function setLogInOut_mapa_HTML(LOG_OUT){
    //Común a todo el NAVBAR --> Área Personal
    setAreaPersonal(LOG_OUT, sessionStorage.getItem('nombre'));
}

/*
* 
* @param   {input} LOG_IN_OUT --> parte final del NAV que puede ser "entrar"
*                                 o "área de usuario"
*          
* @returns {void}               
* 
* En esta página no se necesita ninguna funcionalidad extra
* 
* Como es obligatorio tener sesión iniciada, no se comprueba
* 
*/
function setLogInOut_destino_HTML(LOG_OUT){
    //Común a todo el NAVBAR --> Área Personal
    setAreaPersonal(LOG_OUT, sessionStorage.getItem('nombre'));
}






/* Para todas las secciones de cultura */




/*
* 
* @param   {input} LOG_IN_OUT --> parte final del NAV que puede ser "entrar"
*                                 o "área de usuario"
*          
* @returns {void}               
* 
* En estas páginas no se necesita ninguna funcionalidad extra
* 
* Si hay sesión, se cambia el navbar-item "Entrar"
*       
*/
function setLogInOut_cultura_HTML(LOG_IN_OUT){
    //Común a todo el NAVBAR --> Área Personal
    if(sessionStorage.getItem('nombre'))
        setAreaPersonal(LOG_IN_OUT, sessionStorage.getItem('nombre'));
}