<?php
    /*
     * API Para que la página de destino reciba datos de la BBDD
     * 
     * Sólo va a recibir (GET) e insertar (POST) no necesita ni PUT ni DELETE
     */

    //Para enviar los datos por JSON
        //Todo va a ser siempre echo json_encode(array[],true);
    header("Content-Type: application/json");
    
    //Incluir el PHP que conectará con la BBDD
    include_once "../BBDD/DBPaises.php";
    
    //Switch que evalúa el request que se hace desde la web
    switch($_SERVER['REQUEST_METHOD']){
        case 'GET': //Recibir
            if(isset($_GET['newOrNot'])     && isset($_GET['hemisferio']) && 
                isset($_GET['continente']) && isset($_GET['idioma'])     && 
                isset($_GET['playa'])      && isset($_GET['montaña'])    && 
                isset($_GET['cultural'])   && isset($_GET['safari'])     && 
                isset($_GET['exotico'])    && isset($_GET['ong'])        && 
                isset($_GET['peligroso'])  && isset($_GET['turistico'])  && 
                isset($_GET['covid'])      && isset($_GET['id_usuario']) ){
                
                
                //Llamada al método estático para recibir países con todos los datos
                    //Devuelve los países atendiendo al filtro que venga de la web
                $paises = DBPaises::getPaisesFiltrados($_GET['id_usuario'], 
                  $_GET['playa'], $_GET['montaña'],$_GET['safari'], 
                  $_GET['cultural'], $_GET['ong'], $_GET['exotico'], 
                  $_GET['turistico'], $_GET['peligroso'], $_GET['covid'], 
                  $_GET['hemisferio'], $_GET['continente'], $_GET['idioma'],
                        $_GET['newOrNot']);
                
                //Si no está vacío, lo devuelves, si no se settea a 0 los países
                if(!empty($paises))
                    echo json_encode($paises,true);
                else
                    echo json_encode(array('paises' => 0),true);
                
                //echo json_encode($response, true);
            }
        break;
        case 'POST': //Insertar
            //Método copiado de la API Pais, no se le llama a ella porque será más limpio así
            if(isset($_POST['id_pais']) && isset($_POST['id_usuario']) ){
                
                $id_pais    = $_POST['id_pais'];
                $id_usuario = $_POST['id_usuario'];
                $visitado   = 3; // Siempre va a ser deseo
                
                //Siempre que el id_pais y el id_usuario no estén vacíos
                if(!empty($id_pais) && !empty($id_usuario)
                    && !is_null($id_pais) && !is_null($id_usuario)){
                    
                    //Llamada al método estático para insertar el registro en paisesVisitados
                        //Para insertar se necesita el país, el usuario y que tipo de visita
                    if(DBPaises::insertPais($id_usuario,$id_pais,$visitado) == 1)
                        echo json_encode(array("success" => 1),true); // OK
                    else
                        echo json_encode(array("error" => "No ha sido posible"
                            . " actualizar"),true); // NO OK
                }
            }
        break;
        case 'PUT': break;//unreachable
        case 'DELETE': break;//unreachable
    }
?>