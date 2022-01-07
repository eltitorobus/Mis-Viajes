<?php
/*
 * Clas DB  --> Es la única que contacta con la BBDD
 *          --> Es la clase padre de DBPaises y DBUsuarios
 * 
 *          --> No tiene atributos, sólo funciones estáticas que serán llamadas
 *              -->Iniciar conexión
 *              -->Cerrar conexión
 *              -->Consultar BBDD
 *              -->Modificar BBDD
 */
class DB {
    
    /*
    * getConnection
    * 
    * @access private
    * @param --
    * @return conexión a la BBDD
    */
    private static function getConnection(){
        $bbdd = null;
        try {
            $opciones = array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8",
                PDO::ATTR_EMULATE_PREPARES => false); // Me devolvía Strings los Integer
            $dns = "mysql:host=localhost;dbname=paisesDB";
            $dbUsuario = "viajesDB";
            $dbPass = "Viajes.2021";
            $bbdd = new PDO($dns, $dbUsuario, $dbPass, $opciones);
            $bbdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }catch (PDOException $e) {
            $error = $e->getCode();
            $mensaje = $e->getMessage();
        }
        return $bbdd;
    }
    
    /*
    * closeConnection
    * 
    * @access private
    * @param --
    * @return void
    * 
    * -- Cierra la conexión de la BBDD
    */
    private static function closeConnection(){
        //Desconexión de la BBDD
        unset($resultado);
        unset($bbdd);
    }
    
    /*
    * executeQuery
    * 
    * @access protected (para que accedan los hijos)
    * @param $sql {string}
    * @return $resultado {string[]} (assoc) // {int} --> Error
    * 
    * -- Cierra la conexión de la BBDD
    */
    protected static function executeQuery($sql) {
        $bbdd = self::getConnection();
        
        if(isset($bbdd) && !empty($bbdd)){
            $resultado = $bbdd->query($sql);
            $resultadoFetch = $resultado->fetchAll(PDO::FETCH_ASSOC);
            
            self::closeConnection();
            
            if(!empty($resultadoFetch)){
                return $resultadoFetch;
            }else{
                return 0;
            }
        }else{
            return 1;
        }
    }
    
    /*
    * modifyBBDD
    * 
    * @access protected (para que accedan los hijos)
    * @param $sql {string}
    * @return $resultado {int} (affected rows)
    * 
    * -- Cierra la conexión de la BBDD
    */
    protected static function modifyBBDD($sql){
        $bbdd = self::getConnection();
        
        if(isset($bbdd) && !empty($bbdd)){
            $resultado = $bbdd->exec($sql);
            
            self::closeConnection();
            
            return $resultado;
        }
    }
}

?>
