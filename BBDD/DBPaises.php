<?php
//Se necesita la clase padre
require_once 'DB.php';

/*
 * Clas DBPaises    --> Conecta con la BBDD a través del padre
 *                  --> Devuelve el resultado de la BBDD sobre paises a "paises.php"
 * 
 *                  --> No tiene atributos, sólo funciones estáticas que serán llamadas
 *                      --> Recibir todos los países que han sido visitados,
 *                          vividos o deseos por orden para un array assoc
 *                      --> Recibir los países atendiendo a los criterios establecidos
 * 
 *                      --> Eliminar un país de la tabla paisesVisitados 
 *                          (la tabla paises es inmodificable)
 *                      --> Insertar un país como visitado para un usuario
 *                      
 */
class DBPaises extends DB{
    
    /*
    * getPaisesVisitados
    * 
    * @access public
    * @param $id_usuario {int}
    * @return $resultado {array []assoc} //Países visitados, vividos y deseos
    * 
    * 
    * Se hacen las 3 consultas (visitado =1,=2 o =3) y luego se unen en un $resultado[] assoc
    * 
    */
    public static function getPaisesVisitados ($id_usuario) {
        $queryVisitados = "SELECT id_pais FROM paisesVisitados WHERE id_usuario = $id_usuario and visitado = 1";
        $queryVividos = "SELECT id_pais FROM paisesVisitados WHERE id_usuario = $id_usuario and visitado = 2";
        $queryDeseos = "SELECT id_pais FROM paisesVisitados WHERE id_usuario = $id_usuario and visitado = 3";
                        
        //Realiza las 3 consultas
        $resultadoVisitados = parent::executeQuery($queryVisitados);
        $resultadoVividos = parent::executeQuery($queryVividos);
        $resultadoDeseos = parent::executeQuery($queryDeseos);
        
        //Creo un array vacío que será la unión de todos associativamente
        $resultado = array();
        if(!is_numeric($resultadoVisitados)){//Si existen visitados, se añaden
            $resultado['visitados'] = $resultadoVisitados;
        }
        
        if(!is_numeric($resultadoVividos)){//Si existen vividos, se añaden
            $resultado['vividos'] = $resultadoVividos;
        }
        
        if(!is_numeric($resultadoDeseos)){//Si existen deseos, se añaden
            $resultado['deseos'] = $resultadoDeseos;
        }
        
        //Se devuelve el array de los 3 tipos de visitas (si existe)
        return $resultado;

    }
    
    /*
    * deletePais
    * 
    * @access public
    * @param $id_pais {int}, $id_usuario {int}
    * @return $resultado {int} affected rows
    * 
    */
    public static function deletePais($id_pais, $id_usuario){
        //Borra la visita de un usuario a un país
        $sql = "DELETE FROM paisesVisitados WHERE id_usuario = $id_usuario AND"
                . " id_pais = $id_pais";
        
        //Devuelve affected rows (1)
        return parent::modifyBBDD($sql);
    }
    
    /*
    * insertPais
    * 
    * @access public
    * @param $id_usuario {int}, $id_pais {int}, $visitado {int}
    * @return $resultado {int} affected rows
    * 
    */
    public static function insertPais($id_usuario, $id_pais, $visitado){
        //Inserta la visita (1,2,3) a un país de un usuario
        $sql = "INSERT INTO paisesVisitados(id_usuario,id_pais,visitado)"
                            . " VALUES($id_usuario,$id_pais,$visitado)";
        
        //Devuelve affected rows (1)
        return parent::modifyBBDD($sql);
    }
    
    
    // Destino --> Como necesita países no hay que hacer otro PHP
    
    /*
    * getPaisesFiltrados
    * 
    * @access public
    * @param $id_usuario {int}, $playa {int-bool}, $montaña {int-bool}, 
    *   $safari {int-bool}, $cultural {int-bool}, $ong {int-bool},
    * $exotico {int-bool}, $turistico {int-bool}, $peligroso {int-bool},
    * $covid {int}, $hemisferio{string}, $continente{string}, $idioma{string},
    * $newOrNot{int-bool}
    * 
    * @return $resultado[] {string,int} assoc
    * 
    */
    public static function getPaisesFiltrados($id_usuario, $playa, $montaña,
            $safari, $cultural, $ong, $exotico, $turistico, $peligroso, $covid,
            $hemisferio, $continente, $idioma, $newOrNot) {
        
        //La manera más sencilla para unir es dejar siempre un where (=1) y todo 
            //lo que se anexe $unirConultas.claúsula
        
        //Dame todos los nombres e ID de los países (where 1 --> Todos)
        $query = "SELECT nombre, id FROM paises WHERE 1";
        //String para unir las consultas
        $unirConsultas = " AND ";
        
        //Si se ha marcado playa --> Que tengan playa (1), sino, nada
        if($playa == 1)
            $query = $query.$unirConsultas."playa = 1";
        
        //Si se ha marcado montaña --> Que tengan montaña (1), sino, nada
        if($montaña == 1)
            $query = $query.$unirConsultas."montana = 1";
        
        //Si se ha marcado safari --> Que tengan safari (1), sino, nada
        if($safari == 1)
            $query = $query.$unirConsultas."safari = 1";
        
        //Si se ha marcado cultural --> Que tengan cultural (1), sino, nada
        if($cultural == 1)
            $query = $query.$unirConsultas."cultural = 1";
        
        //Si se ha marcado ong --> Que tengan ong (1), sino, nada
        if($ong == 1)
            $query = $query.$unirConsultas."ong = 1";
        
        //Si se ha marcado que sea exótico --> Que sea exótico (1), sino, nada
        if($exotico == 1)
            $query = $query.$unirConsultas."exotico = 1";
        
        //Si se ha marcado turistico --> Que sea turistico (1), sino, nada
        if($turistico == 1)
            $query = $query.$unirConsultas."turistico = 1";
        
        //Si se ha marcado peligroso --> Que sea peligroso (1), sino, nada
        if($peligroso == 1)
            $query = $query.$unirConsultas."peligroso = 1";
        
        //Si se ha marcado covid y no viene vacío o 0 --> Filtra por COVID
        if(!empty($covid) && $covid != 0)
            $query = $query.$unirConsultas."covid = $covid";
        
        //Si se ha marcado hemisferio y no está vacío --> Se filtra por hemisferio
        if(!empty($hemisferio))
            $query = $query.$unirConsultas."hemisferio = '$hemisferio'";
        
        //Si se ha marcado continente --> Filtra por el continente recibido
        if(!empty($continente))
            $query = $query.$unirConsultas."continente = '$continente'";
        
        //Si se ha marcado idioma --> Filtra por el idioma recibido
        if(!empty($idioma))
            $query = $query.$unirConsultas."idioma = '$idioma'";

        /* 
         * Un país nuevo es el que no tiene un registro en la tabla 
         *     "paisesVisitados" para ese usuario (id_usuario)
         * Un país repetido es el que tiene un registro en la tabla
         *     "paisesVisitados" para ese usuario (id_usuario)
         */
        if(!empty($newOrNot)){
            $query = $query.$unirConsultas."id IN (SELECT id_pais FROM ".
              "paisesvisitados WHERE id_usuario = $id_usuario)";
        }else{ 
            $query = $query.$unirConsultas."id NOT IN (SELECT id_pais FROM ".
              "paisesvisitados WHERE id_usuario = $id_usuario)";
        }
        
        //Devuelve el array assoc de los países concordantes (si existen)
        return parent::executeQuery($query);
    }



    /*
    * getPaisesContinente
    * 
    * @access public
    * @param  $continente{string}   --> Continente por el que se va a filtrar
    * @return $resultado {array []assoc} //Todos los países o los países de ese
    *                                      continente
    * 
    */
    public static function getPaisesContinente ($continente) {
        $sql = "SELECT nombre FROM paises WHERE 1";
        
        if($continente != "Indiferente")
            $sql.=" AND continente = '$continente';";

        return parent::executeQuery($sql);
    }
    
    /*
    * getCaracteristicasPais
    * 
    * @access public
    * @param  $pais      {string}      --> País del que se quieren las caract
    * @return $resultado {array []assoc} //Todas las caract. de ese país
    * 
    */
    public static function getCaracteristicasPais($pais) {
        return parent::executeQuery("SELECT * FROM paises WHERE nombre = '$pais';");
    }
}

?>