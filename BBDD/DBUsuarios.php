<?php
//Incluir a la clase padre
require_once 'DB.php';

/*
 * Clas DBUsurios   --> Conecta con la BBDD a través del padre
 *                  --> Devuelve el resultado de la BBDD sobre usuarios a "usuarios.php"
 * 
 *                  --> No tiene atributos, sólo funciones estáticas que serán llamadas
 *                      --> Comprobar si existe o no el usuario
 *                      --> Comprobar que el usuario y el pass es correcto
 *                      
 *                      --> Actualizar el Password
 *                      --> Borrar usuario
 *                      --> Crear usuario
 */
class DBUsuarios extends DB{
    
    /*
    * checkUser
    * 
    * @access public
    * @param $nombre {string}, $pass {string}
    * @return $resultado {array []assoc}
    */
    public static function checkUser($nombre, $pass) {
        //Select nombre de usuario si existe ese usuario con ese password
        $sql = "SELECT nombre, id_usuario FROM usuarios WHERE nombre="
                ."'$nombre' AND pass = md5('$pass')";

        $userPassCorrect = parent::executeQuery($sql);
        
        
        //DB.php solo tiene "FetchAll" --> Por lo que se recibe la posición 0
            //Sólo se espera 1 resultado
        if(isset($userPassCorrect[0]['nombre']) && 
                $userPassCorrect[0]['nombre'] == $nombre)
            return $userPassCorrect[0]; //Devuelve el array
        
        elseif(is_numeric($userPassCorrect) && $userPassCorrect==0) // Error en la búsqueda
            return array("error" => "Contraseña incorrecta");
        else
            return array("error" => "Error en la Base de Datos");// Error en la BBDD
    }
    
    /*
    * userExists
    * 
    * @access public
    * @param $nombre {string}
    * @return $resultado {boolean}
    */
    public static function userExists($nombre){
        //Select nombre del usuario que tiene ese nombre --> ¿Existe?
        $sql = "SELECT nombre FROM usuarios WHERE nombre = '$nombre'";
        $userExists = parent::executeQuery($sql);
        
        //Existe TRUE o no existe FALSE
        if(!empty($userExists) && $userExists[0]['nombre']==$nombre)
            return true;
        else
            return false;
    }
    
    /*
    * updatePass
    * 
    * @access public
    * @param $nombre {string}, $pass {string}
    * @return $resultado {int} (affected rows)
    */
    public static function updatePass($nombre, $pass) {
        //Modificar el campo pass con el nuevo pass para el usuario que se ha recibido
        $sql = "UPDATE usuarios SET pass = md5('$pass') WHERE nombre = '$nombre'";
        
        //Devuelve directamente la ejecución (affected rows)
        return parent::modifyBBDD($sql);
    }
    
    /*
    * deleteUser
    * 
    * @access public
    * @param $id_usuario {int}
    * @return $resultado {int} (affected rows)
    * 
    * Para borrar un usuario, hay que comprobar que no tenga registros en paisesVisitados
    *   puesto que en esa tabla el id_usuario es FK y no se podría borrar
    * 
    * Si existen registros --> Borrado previo de todos los campos en los que
    *    aparezca el id_usuario en esa tabla (paisesVisitados) --> Ya no hay FK
    *    --> Afected rows pueden ser más de 1 (viajado a más de 1 país)
    * 
    * Existan o no registros en paisesVisitados --> Borrado de usuario (principal)
    *    Borra el usuario que tenga este ID
    * 
    * Se devuelven el número de filas afectadas (1 siempre, salvo error)
    *   Si hay error se devuelve un array assoc con el error filtrado
    */
    public static function deleteUser($id_usuario) {
        //id_usuario es FK en paisesVisitados
        $userHasFKRegistersQuery = "SELECT id FROM paisesvisitados WHERE id_usuario = $id_usuario";
        
        //¿Existen registros como FK?
        $userHasFKRegisters = DB::executeQuery($userHasFKRegistersQuery);

        //Si la variable es array es que si existen campos, sino sería 0 o null
        if(is_array($userHasFKRegisters)){
            $deleteCountriesFKQuery = "DELETE FROM paisesvisitados WHERE id_usuario = $id_usuario";

            //Si existen datos --> Borrarlos todos
            if(!(parent::modifyBBDD($deleteCountriesFKQuery) >= 1))
                return array("error" => "Error en el borrado de los países que has viajado");
        }       // Si no ha borrado una fila o más y ha entrado aquí sal con error

        //En este momento es cuando de verdad se borra el usuario
        $deleteUserQuery = "DELETE FROM usuarios WHERE id_usuario = $id_usuario";
        
        //Devuelve directamente el affected rows (se espera 1, un usuario)
        $result = parent::modifyBBDD($deleteUserQuery);
        
        return $result;
    }
    
    /*
    * createUser
    * 
    * @access public
    * @param $nombre {string}, $pass {string}
    * @return $resultado {int} (affected rows)
    */
    public static function createUser($nombre, $pass){
        //Inserta en la tabla de usuarios al nuevo usuario con este nombre y pass
        $sql = "INSERT INTO usuarios (nombre,pass) VALUES ('$nombre',md5('$pass'))";
        
        //return affected rows
        return parent::modifyBBDD($sql);
    }
    
    /*
    * getId_Usuario
    * 
    * @access public
    * @param $nombre {string}
    * @return $resultado {int} (affected rows)
    */
    public static function getId_Usuario($nombre){
        //Devuelve el ID del usuario atendiendo al nombre recibido
        $sql = "SELECT id_usuario FROM usuarios WHERE nombre = '$nombre'";
        
        //Devuelve el id
        return parent::executeQuery($sql);
    }
}
?>