<?php
    /*
     * API Para que la página de destino reciba datos de la BBDD
     * 
     * Tiene implementados las 4 funciones: GET,POST,PUT y DELETE
     */

    //Para enviar los datos por JSON
        //Todo va a ser siempre echo json_encode(array[],true);
    header("Content-Type: application/json");
    
    //Incluir el PHP que conectará con la BBDD
    include_once "../BBDD/DBUsuarios.php";
    
    //Se debe validar por si JS no funciona o está deshabilitado
    function validar($nombre, $pass){
        //Misma validación que JS
        if( (empty($nombre) || empty($pass) ) 
            || ( is_null($nombre) || is_null($pass) )
            || ( strlen($nombre) > 16 || strlen($pass) > 16 ) 
            || is_numeric($nombre)//Pass si puede ser número
            || preg_match("/[^A-Za-z\d]/",$nombre) ){ 
            return false;
        }
        
        return true; // ni están vacío o son mayores de 16
    }
    
    switch($_SERVER['REQUEST_METHOD']){
        
        case 'GET':
            /*
             * Recibir datos en la web
             *  ¿El usuario y la clave son correctos?
             *      Para eso debo comprobar antes que EXISTE ese usuario
             */
            if(isset($_GET['nombre']) && isset($_GET['pass'])){
                
                $nombre = $_GET['nombre'];
                $pass   = $_GET['pass'];
                
                if( validar($nombre, $pass) ){
                    if(DBUsuarios::userExists($nombre)){ // ¿Existe? con ese nombre
                        $response = DBUsuarios::checkUser($nombre, $pass);
                        echo json_encode($response, true);// Si existe un JSON con nombre o error
                    }else{
                        //El usuario no existe
                        echo json_encode(array("error" => "El usuario no existe"),true);
                    }
                }else{
                    //Ha fallado la validación, no se pormenoriza porque está en JS
                    echo json_encode(array("error" => "Ningún campo puede estar vacío, "
                        . "ser mayor de 16 carácteres o el nombre ser sólo "
                        . "números o contener carácteres especiales"),true);
                }
            }else{
                //Error inesperado
                echo json_encode(array("error" => "Error en el envío de datos"),true);
            }
         break;
        
        case 'POST':
            /*
             * Insertar usuario en la BBDD --> Registro
             * 
             * Antes de insertar se debe comprobar que no exista ya 
             *              --> UNIQUE (BBDD)
             * 
             * Si no existe --> Crear usuario con el nombre y el pass 
             *                  --> Debe devolver 1 fila insertada
             *                  --> Como se inicia sesión automaticamente, 
             *                      se pregunta por el ID si se ha creado
             */
            if(isset($_POST['nombre']) && isset($_POST['pass'])
                    && isset($_POST['confirmar'])){
                
                $nombre    = $_POST['nombre'];
                $pass      = $_POST['pass'];
                $confirmar = $_POST['confirmar'];
                
                if(($pass == $confirmar) && validar($nombre, $pass)){
                    //¿Existe ya?
                    $userAlredyExists = DBUsuarios::userExists($nombre);
                    
                    //Si no existe, lo creo
                    if(!$userAlredyExists){
                        
                        if(DBUsuarios::createUser($nombre,$pass) == 1){//Creado
                            $id_usuario = DBUsuarios::getId_Usuario($nombre);
                            $createOrNot = array(
                                            "nombre" => $nombre, 
                                            "id_usuario" => $id_usuario[0]['id_usuario']
                                           ); //Como se llama FetchAll en la clase padre
                                                // y sólo se espera 1 resultado...
                        }else{
                            //Error en la creación
                            $createOrNot = array("error" => "No ha sido posible crear el usuario");
                        }
                        
                    }else{
                        //Ese usuario ya existe
                        $createOrNot = array("error" => "Ya existe ese usuario");
                    }
                    
                }else{
                    //Si se llega hasta aquí --> Error de validación
                    if($pass != $confirmar)
                        $createOrNot = array("error" => "Debe introducir la misma contraseña");
                    else
                        $createOrNot = array("error" => "Ningún campo puede estar vacío, ser "
                        . "mayor de 16 carácteres o el nombre ser sólo números "
                        . "o contener carácteres especiales");
                }
                
            }else{
                //Error no controlado
                $createOrNot = array("error" => "Error inesperado");
            }
            
            //Sea correcto o error, se devuelve el JSON para que se trate en la web
            echo json_encode($createOrNot ,true);
            
            break;
        
        case 'PUT':
            //Se reciben los datos forzados porque no es ni GET ni POST
            parse_str(file_get_contents("php://input"), $variables);
            
            $nombre    = $variables['nombre'];
            $newPass   = $variables['pass'];
            $confirmar = $variables['confirmar'];
            
            if(validar($nombre, $newPass) && ($newPass == $confirmar) ){
                //Sólo si existe el usuario le puedo cambiar el pass
                if(DBUsuarios::userExists($nombre)){
                    
                    //Cambiar pass --> Necesito el usuario y la nueva Pass
                    if(DBUsuarios::updatePass($nombre, $newPass) == 1) //Actualizado
                        $updateOrNot = array("nombre" => $nombre);
                    else
                        $updateOrNot = array("error" => "No introduzcas la "
                            . "misma contraseña que anteriormente");
                    
                }else{
                    //No se puede cambiar si no existe el usuario
                    $updateOrNot = array("error" => "El usuario no existe");
                }
                
            }else{
                if($newPass != $confirmar){
                    $updateOrNot = array("error" => "Debe introducir la misma contraseña");
                }else{
                    //Validación de los campos introducidos
                    $updateOrNot = array("error" => "Ningún campo puede estar "
                        ."vacío, ser mayor de 16 carácteres o el nombre ser "
                        . "sólo números o contener carácteres especiales");
                }
            }
            
            echo json_encode ($updateOrNot, true);
            
        break;
        
        case 'DELETE':
            //Se reciben los datos forzados porque no es ni GET ni POST
            parse_str(file_get_contents("php://input"), $variables);
            
            //Se borra por ID pero se consulta si existe por nombre
            $id_usuario = $variables['id_usuario'];
            $nombre = $variables['nombre'];
            
            //Para borrar un usuario, debe existir
            if(DBUsuarios::userExists($nombre)){// Aunque se supone que no podría llegar hasta aquí
                
                //Para borrar el usuario necesito el id_del usuario
                $deleteOrNot = DBUsuarios::deleteUser($id_usuario);

                if($deleteOrNot == 1) //Si se ha borrado 1 fila
                    $result = array("borrado" => true); //Éxito
                else if($deleteOrNot['error'])
                    $result = $deleteOrNot; // Si existe error, lo recojo
                else
                    return false; // Salida inesperada
            }else{
                //No se puede borrar un usuario que no existe
                $result = array("error" => "El usuario no existe");
            }
            echo json_encode ($result, true);
        break;
    }
?>
