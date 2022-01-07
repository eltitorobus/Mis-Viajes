<?php
    /*
     * API Para que la página de destino reciba datos de la BBDD
     * 
     * Sólo va a recibir (GET), insertar (POST) y eliminar, no necesita PUT
     */

    //Para enviar los datos por JSON
        //Todo va a ser siempre echo json_encode(array[],true);
    header("Content-Type: application/json");
    
    //Incluir el PHP que conectará con la BBDD
    include_once "../BBDD/DBPaises.php";
    
    //Switch que evalúa el request que se hace desde la web
    switch($_SERVER['REQUEST_METHOD']){
        case 'GET'://Recibir
            if(isset($_GET['id_usuario']) && !is_null($_GET['id_usuario'])){
                //Si existe el id_usuario y no está vacío método estático para 
                    //consultar los países visitados atendiendo al id del usuario
                $response = DBPaises::getPaisesVisitados($_GET['id_usuario']);
                
                //Si está vacío --> No hay países
                if(empty($response)){
                    $response = array("SinPaises"=>"0");
                }
                
                //Se envía una JSON con los países o con "Sin países => 0"
                echo json_encode($response, true);
            }
            
            //Llamada desde "Cultura"
            else if(isset($_GET['continente']) && !is_null($_GET['continente'])){
                $response = DBPaises::getPaisesContinente($_GET['continente']);
                
                //Si está vacío --> Error
                if(empty($response)){
                    $response = array("Error"=>"Error en la búsqueda");
                }
                
                //Se devuelve la respuesta
                echo json_encode($response, true);
            }
            
            //Llamada desde "Cultura --> 2"
            else if(isset($_GET['pais']) && !is_null($_GET['pais'])){
                $response = DBPaises::getCaracteristicasPais($_GET['pais']);
                
                //Si está vacío --> Error
                if(empty($response)){
                    $response = array("Error"=>"Error en la búsqueda");
                }
                
                //Se devuelve la respuesta
                echo json_encode($response, true);
            }
        break;
        case 'POST': // Insertar
            if(isset($_POST['id_pais']) && isset($_POST['id_usuario']) 
                    && isset($_POST['visitado'])){
                $id_pais    = $_POST['id_pais'];
                $id_usuario = $_POST['id_usuario'];
                $visitado   = $_POST['visitado'];
                
                if(!empty($id_pais) && !empty($id_usuario) && !empty($visitado)
                    && !is_null($id_pais) && !is_null($id_usuario) && !is_null($visitado)){
                    
                    //Llamada al métodopara insertar --> Debe devolver 1, sino --> error
                        //Para insertar se necesita id_usuario, el país y el tipo de visita
                    if(DBPaises::insertPais($id_usuario,$id_pais,$visitado) == 1)
                        echo json_encode(array("success" => $id_pais),true);
                    else
                        echo json_encode(array("error" => "No ha sido posible"
                            . " actualizar"),true);
                }
            }
        break;
        case 'PUT': // Unreachable
        break;
        case 'DELETE': // Eliminar
            //Como no es ni post ni get necesito forzar la recepción
            parse_str(file_get_contents("php://input"), $variables);
            
            $id_pais    = $variables['id'];
            $id_usuario = $variables['id_usuario'];
            
            //Si las variables no están vacías
            if(!empty($id_pais) && !is_null($id_pais)
                    && !empty($id_usuario) && !is_null($id_usuario)){
                
                //Llamada al método de borrado de países --> Debe devolver 1 fila borrada
                    //PAra borrar se necesita el usuario y el país
                if(DBPaises::deletePais($id_pais, $id_usuario) == 1)
                     echo json_encode (array("success" => $id_pais),true);
                else
                    echo json_encode (array("error" => "No ha sido posible "
                        . "borrarlo"),true);
            }
        break;
    }
?>
