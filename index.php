<!doctype html>
<!--
    Created on : 9 nov 2021, 18:18:25
    Author     : Alejandro Calvo Toribio

    index       -> Página de inicio de la aplicación Mis Viajes
                -> Powered by BootStrap 5
                  -> Creado a partir del example Carousel y de los Components de Get Started
-->
<html lang="es">
  <head>

    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="author" content="Alejandro Calvo">
    <meta name="description" content="Index de mis viajes">
    <title>✈ Mis Viajes Web ✈</title>

    <!-- CSS -->
        <!-- Bootstrap 5 CSS -->
    <link href="./recursos/libs/bootstrap/assets/dist/css/bootstrap.min.css" rel="stylesheet">
        <!-- Mis CSS -->
    <link href="recursos/css/estilo.css"  rel="stylesheet">
    <link href="recursos/css/animate.css" rel="stylesheet">
    <link href="recursos/css/modal.css"   rel="stylesheet">
    
    <!-- JS -->
        <!-- JS: comportamiento "Entrar" del nav -->
        <script src="recursos/js/loginLogout.js" crossorigin="anonymous"></script>
    
  </head>
  <body>
    <header>
      <!-- Barra de navegación -->
      <nav class="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <!--Contenedor de los elementos de la navegación-->
        <div class="container-fluid">
          <!--Elemento principal de la web-->
          <a class="navbar-brand" href="#">
              <img src="recursos/img/logoWeb.png" alt="Logo Web" width="30" height="24" class="d-inline-block align-text-top"> Mis Viajes
          </a>
          <!--Botón hamburguesa que se va a mostrar en móviles-->
          <button type="button" class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#menuNav" aria-controls="menuNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span><!--Icono automático-->
          </button>

          <!--Contenido al que hace referencia al botón pero que conlas clases de BS aparecerá automáticamente si es más que móvil-->
          <div id="menuNav" class="collapse navbar-collapse">
            <!--Lista con todos los elementos de la Web (login a la derecha, separado en teléfonos)-->
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
              <li class="nav-item"><a class="nav-link active" href="#">Home</a></li>
              <li class="nav-item"><a class="nav-link" href="HTML/introduccion.html">Introducción</a></li>
              <li class="nav-item"><a class="nav-link" href="HTML/mapa.html">Mapa</a></li>
              <li class="nav-item"><a class="nav-link" href="HTML/destino.html">Destino</a></li>
              
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="dropdownNavBar" data-bs-toggle="dropdown" aria-expanded="false">Cultura</a>
                <ul class="dropdown-menu bg-dark" aria-labelledby="dropdownNavBar">
                    <li><a class="dropdown-item bg-dark" href="./HTML/cultura/paises.html">General</a></li>
                    <li><a class="dropdown-item bg-dark" href="./HTML/cultura/poblacion.html">Mapa Población</a></li>
                    <li><a class="dropdown-item bg-dark" href="./HTML/cultura/emisiones.html">Mapa Emisiones CO2</a></li>
                    <li><a class="dropdown-item bg-dark" href="./HTML/cultura/pib.html">Mapa PIB</a></li>
                        <!-- Aunque parezca reiterativo el bg-dark es para sobrescribir el focus del dropdown-item -->
                </ul>
              </li>
              
            </ul>
            <div class="d-flex">
              <a id="logInOut" class="nav-link" href="HTML/login.html">Entrar</a>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <main class="mx-5">

      <!-- MODAL privacidad-->
      <div id="modal_container_privacy" class="modal-container">
        <div class="modalPersonalizado">
          <a class="closeModal" href="#">&times;</a>
          <div id="contenidoModalIndex">
            <h1>Privacidad</h1>

            <h2>Datos recogidos</h2>

            <p>Le informamos que no llevamos a cabo ningún tipo 
              de recogida de datos a excepción de los que usted 
              introduce para registrarse en la página web. De este modo sólo 
              tenemos tu <b>nombre</b> de usuario (puede no ser real) y tu 
              <b>contraseña</b>. No recopilamos información sobre tu ubicación 
              o IP, preferencias, uso, etc.
            </p>

            <h2>Tratamiento de los datos</h2>

            <p>Pese a ser mínimo, tienes derecho a la revocación de los 
              mismos, por ello puedes dar de baja a tu usuario desde 
              <a href="./HTML/login.html" class="shadow-link">login</a>
            </p>

            <h2>Motivos</h2>

            <p>No eres un negocio, por lo que no queremos comerciar con tu 
              información. Podríamos recopilarlos para conocer 
              como usas la aplicación; pero preferimos preguntarte. Para 
              ello te proponemos que 
              <a href="mailto:alejandro.caltor@educa.jcyl.es"
                class="shadow-link" target="_blank">contactes</a> 
              con el administrador del sitio
            </p>
           </div>
        </div>
      </div>

      <!-- MODAL terms-->
      <div id="modal_container_terms" class="modal-container">
        <div class="modalPersonalizado">
          <a class="closeModal" href="#">&times;</a>
          <div id="contenidoModalIndex" class="text-center">
            <h1>Términos</h1>

            <h2>Aplicación</h2>

            <p>Estos términos y los de la política de privacidad son 
              aplicables desde el 26/12/2021 hasta que sean 
              modificados (con la debida información al usuario).
            </p>

            <h2>Edad Mínima</h2>

            <p>En estos momentos no existe edad mínima para el uso de la 
              aplicación Mis Viajes Web
            </p>

            <h2>Respeto</h2>

            <p>Eres lo más importante y por eso te respetaremos, pero, del 
              mismo modo, nos gustaría que todos los usuarios de la aplicación 
              se respetaran entre ellos. La infracción provacará la expulsión.
            </p>

            <h2>Licencia</h2>

            <p>La licencia de la web es Creative Commons: CC BY-NC</p>

            <img src="recursos/img/cc.png" alt="licencia"/>
          </div>
        </div>
      </div>
      
      
      <!-- Carousel -->
      
      <div id="carouselPrincipal" class="container-fluid carousel carousel-dark slide carousel-fade pb-3" data-bs-ride="carousel">
        <div class="carousel-indicators">
          <button type="button" data-bs-target="#carouselPrincipal" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide login"></button>
          <button type="button" data-bs-target="#carouselPrincipal" data-bs-slide-to="1" aria-label="Slide register"></button>
          <button type="button" data-bs-target="#carouselPrincipal" data-bs-slide-to="2" aria-label="Slide 3"></button>
          <button type="button" data-bs-target="#carouselPrincipal" data-bs-slide-to="3" aria-label="Slide 4"></button>
          <button type="button" data-bs-target="#carouselPrincipal" data-bs-slide-to="4" aria-label="Slide 5"></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active" data-bs-interval="5000">
            <img src="recursos/img/carousel1.jpg" class="d-block" alt="enlace a login">
            <div class="container">
              <div class="carousel-caption">
                <h1 class="animated bounceIn">Mis Viajes Web</h1>
                <p class="animated slideInLeft subtitulo">¡¡La aplicación que te permite disfrutar más de tus vacaciones!!</p>
                <a class="btn btn-lg animated slideInRight" href="HTML/login.html" id="entrarCarousel" role="button">Entrar</a>
              </div>
            </div>
          </div>
          <div class="carousel-item" data-bs-interval="5000">
            <img src="recursos/img/carousel2.jpg" class="d-block" alt="San Pierto -- Register">
            <div class="container">
              <div class="carousel-caption">
                <h1 class="animated bounceIn">Mis Viajes Web</h1>
                <p class="animated slideInLeft subtitulo">Si no estás registrado ...</p>
                <a class="btn btn-lg animated slideInRight" href="HTML/registro.html" role="button">Regístrate</a>
              </div>
            </div>
          </div>
          <div class="carousel-item" data-bs-interval="5000">
            <img src="recursos/img/carousel3.jpg" class="d-block" alt="Cascada -- Mapa">
            <div class="container">
              <div class="carousel-caption">
                <h1 class="animated bounceIn">Mis Viajes Web</h1>
                <p class="animated slideInLeft subtitulo">¡¡Sírvete de mapa para representar tus viajes!!</p>
                <a class="btn btn-lg animated slideInRight" href="HTML/mapa.html" role="button">Mapa</a>
              </div>
            </div>
          </div>
          <div class="carousel-item" data-bs-interval="5000">
            <img src="recursos/img/carousel4.jpg" class="d-block" alt="San Francisco -- Destino">
            <div class="container">
              <div class="carousel-caption">
                <h1 class="animated bounceIn">Mis Viajes Web</h1>
                <p class="animated slideInLeft subtitulo">¿No sabes dónde ir?</p>
                <a class="btn btn-lg animated slideInRight" href="HTML/destino.html" role="button">Destino</a>
              </div>
            </div>
          </div>
          <div class="carousel-item" data-bs-interval="5000">
            <img src="recursos/img/carousel5.jpg" class="d-block" alt="Taj Mahal -- Cultura">
            <div class="container">
              <div class="carousel-caption">
                <h1 class="animated bounceIn">Mis Viajes Web</h1>
                <p class="animated slideInLeft subtitulo">¿Quieres aprender un poco más del mundo que te rodea?</p>
                <a class="btn btn-lg animated slideInRight" href="HTML/cultura/paises.html" role="button">General</a>
                <a class="btn btn-lg animated slideInRight" href="HTML/cultura/poblacion.html" role="button">Población</a>
                <a class="btn btn-lg animated slideInRight" href="HTML/cultura/emisiones.html" role="button">Emisiones CO2</a>
                <a class="btn btn-lg animated slideInRight" href="HTML/cultura/pib.html" role="button">PIB</a>
              </div>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselPrincipal" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselPrincipal" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      
      
      <!-- Marketing messaging and featurettes
      ================================================== -->
      <!-- Wrap the rest of the page in another container to center all the content. -->
      
      <div class="container-fluid marketing">
        <hr class="featurette-divider">
        <!-- Three columns of text below the carousel -->
        <div class="row text-center">
          <div class="container-fluid">
            <h1>Funciones principales de Mis Viajes Web</h1>
          </div>
          <div class="col-lg-4 mb-3">
            <!-- <img src="recursos/img/circle1.png" class="bd-placeholder-img rounded-circle" width="140" height="140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 140x140" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#777"/><text x="50%" y="50%" fill="#777" dy=".3em"></text></img> -->
            <img src="recursos/img/circle1.png" class="rounded-circle" width="140" height="140" role="img"/>
            <h2>Mapa</h2>
            <p class="text-muted">Identifica en un mapa los países en los que has estado o quieres estar</p>
            <a class="btn" href="HTML/mapa.html">Mapa &raquo;</a>
          </div><!-- /.col-lg-4 -->

          <div class="col-lg-4 mb-3">
            <img src="recursos/img/circle2.jpg" class="rounded-circle" width="140" height="140"/>
            <h2>Destino</h2>
            <p class="text-muted">¿Eres indeciso? Mis Viajes te ayuda a elegir tu próxima aventura</p>
            <a class="btn" href="HTML/destino.html">Destino &raquo;</a>
          </div><!-- /.col-lg-4 -->
          
          <div class="col-lg-4 mb-3">
            <img src="recursos/img/circle3.jpg" class="rounded-circle" width="140" height="140"/>
            <h2>Cultura</h2>
            <p class="text-muted">
                ¿Quieres conocer más del mundo que te rodea? Entra en esta sección
            </p>
            <div class="dropdown">
              <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownCulturaButton" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Cultura
              </button>
              <div class="dropdown-menu btnDropDown" aria-labelledby="dropdownCulturaButton">
                <a class="dropdown-item btn" href="./HTML/cultura/paises.html">General &raquo;</a>
                <a class="dropdown-item btn" href="./HTML/cultura/poblacion.html">Mapa Población &raquo;</a>
                <a class="dropdown-item btn" href="./HTML/cultura/emisiones.html">Mapa Emisiones &raquo;</a>
                <a class="dropdown-item btn" href="./HTML/cultura/pib.html">Mapa PIB &raquo;</a>
              </div>
            </div>
            
          </div><!-- /.col-lg-4 -->
        </div><!-- /.row -->
        
        
        <!-- Featurettes -->

        <hr class="featurette-divider">

        <div class="row featurette text-justify">
          <div class="col-md-7">
            <h2 class="featurette-heading">Elige la opción <i>Mapa</i> para 
              navegar por el mundo que has conocido o deseas conocer 
              <span class="text-muted">La aplicación que cambiará tu ocio</span>
            </h2>
            
            <p class="lead">Diviértete dibujando tus viajes. Disfruta con tus 
              amigos compartiendo tus hazañas. ¡Que se mueran de envidia!
            </p>
          </div>
          <div class="col-md-5 text-center">
            <img src="recursos/img/featurettes1.png" class="featurette-image img-fluid mx-auto" width="250" height="250" role="img"/>
          </div>
        </div><!-- /.Featurette1-->

        <hr class="featurette-divider">

        <div class="row featurette text-justify">
          <div class="col-md-7 order-md-2">
            
            <h2 class="featurette-heading">¿Has viajado tanto que no sabes cuál 
              puede ser tu próximo destino? 
              <span class="text-muted">Deja que Mis Viajes lo descubra por ti</span>
            </h2>
              
            <p class="lead">Selecciona tus preferencias como el idioma, 
              continente, tipo de ocio, etc. Nuestra dilatada experiencia en 
              este mundo te indicará las mejores opciones para ti
            </p>
          </div>
            
          <div class="col-md-5 order-md-1 text-center">
            <img src="recursos/img/featurettes2.png" class="featurette-image img-fluid mx-auto" width="165" height="165" role="img"/>
          </div>
            
        </div><!-- /.Featurette2-->
      </div>
    </main>
    
    
    <hr class="featurette-divider text-justify">
    
    <!-- Footer -->
    <footer class="container">
      <p class="float-end">
        <a href="#" class="shadow-link">Back to top</a>
      </p>
      
      <p>&copy; 2021 Alejandro Calvo, Inc. &middot; 
        <a id="privacy" class="shadow-link">Privacy</a> 
          &middot; 
        <a id="terms" class="shadow-link">Terms</a>
      </p>
    </footer>
    
    <script>
        //Comportamiento de la página si estás loggeado o no
            //Final del navBar & Botón "Entrar" del carousel 1
        window.onload = setLogInOut_index_HTML(document.getElementById('logInOut'));
        
        //Aparición de los modales de privacidad y términos
            //Modal privacidad
        const PRIVACY = document.getElementById('privacy');
        const MODAL_PRIVACY = document.getElementById('modal_container_privacy');
        PRIVACY.addEventListener('click',function(){
            MODAL_PRIVACY.classList.add('show');
        });
        
            //Modal términos
        const TERMS = document.getElementById('terms');
        const MODAL_TERMS = document.getElementById('modal_container_terms');
        TERMS.addEventListener('click',function(){
            MODAL_TERMS.classList.add('show');
        });
        
        //listener cerrar ambos modales
        document.querySelectorAll('.closeModal').forEach(c => {
            c.addEventListener('click',function(){
                MODAL_PRIVACY.classList.remove('show');
                MODAL_TERMS.classList.remove('show');
            });
        });
    </script>
    
    <!-- Bootstrap JS -->
    <script src="./recursos/libs/bootstrap/assets/dist/js/bootstrap.bundle.min.js"></script>
  
  </body>
</html>
