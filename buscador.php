<?php
$oper=$_GET['oper'];
global $ciudad, $tipo, $tipo, $min, $max;
$ciudad=$_GET['city'];
$tipo=$_GET['type'];
$min=$_GET['minValue'];
$max=$_GET['maxValue'];
//$path ='storage/data-1.json';
$path ='data-1.json';
switch ($oper) {
  case 'Todo':
    echo GetAllOfferts();
    break;
  case 'Personalizada':
    echo GetCustom();
    break;

  default:
    echo 'no se encontro la operacion'.$ciudad."-".$tipo."-".$min."-".$max;
    break;
}
//Funciones necesarias para trabajar con el fichero Json
//Obtengo todas las ofertas entre dos precios
function GetAllOfferts(){
    $min=$_GET['minValue'];
    $max=$_GET['maxValue'];
    $json_url = "data-1.json";
    $json = file_get_contents($json_url);
    $data = json_decode($json, TRUE);

    $resultado = array();

    foreach ($data as $dto) {
        $importe = ( int ) intval(preg_replace('/[^0-9]+/', '', $dto["Precio"]), 10); 
        $min = ( int ) intval(preg_replace('/[^0-9]+/', '', $min), 10); 
        $max = ( int ) intval(preg_replace('/[^0-9]+/', '', $max), 10);    
        if (($importe >= $min) && ($importe <= $max)) {
            $resultado[]= "Ciudad" ; 
            $resultado[]= $dto["Ciudad"];  
            $resultado[]= "Direccion";
            $resultado[]= $dto["Direccion"]; 
            $resultado[]= "Telefono";
            $resultado[]= $dto["Telefono"]; 
            $resultado[]= "Tipo";
            $resultado[]= $dto["Tipo"];
            $resultado[]= "Precio";
            $resultado[]= $dto["Precio"];
  
        } 
    }
    echo json_encode($resultado);
}


function GetCustom(){
    $min=$_GET['minValue'];
    $max=$_GET['maxValue'];
    $ciudad=$_GET['city'];
    $tipo=$_GET['type'];
    $json_url = "data-1.json";
    $json = file_get_contents($json_url);
    $data = json_decode($json, TRUE);

    $resultado = array();

    foreach ($data as $dto) {
        $importe = ( int ) intval(preg_replace('/[^0-9]+/', '', $dto["Precio"]), 10); 
        $min = ( int ) intval(preg_replace('/[^0-9]+/', '', $min), 10); 
        $max = ( int ) intval(preg_replace('/[^0-9]+/', '', $max), 10);    
        if (($importe >= $min) && ($importe <= $max)) {
            if (($ciudad == "Todas") && ($tipo == "Todos"))  {
                $resultado[]= "Ciudad" ; 
                $resultado[]= $dto["Ciudad"];  
                $resultado[]= "Direccion";
                $resultado[]= $dto["Direccion"]; 
                $resultado[]= "Telefono";
                $resultado[]= $dto["Telefono"]; 
                $resultado[]= "Tipo";
                $resultado[]= $dto["Tipo"];
                $resultado[]= "Precio";
                $resultado[]= $dto["Precio"];
            } else {
                if (($ciudad != "Todas") && ($tipo != "Todos"))  {
                    if (($ciudad == $dto["Ciudad"]) && ($tipo == $dto["Tipo"]))  {
                        $resultado[]= "Ciudad" ; 
                        $resultado[]= $dto["Ciudad"];  
                        $resultado[]= "Direccion";
                        $resultado[]= $dto["Direccion"]; 
                        $resultado[]= "Telefono";
                        $resultado[]= $dto["Telefono"]; 
                        $resultado[]= "Tipo";
                        $resultado[]= $dto["Tipo"];
                        $resultado[]= "Precio";
                        $resultado[]= $dto["Precio"];
                    }
                } else {
                    if (($ciudad != "Todas") && ($tipo == "Todos"))  {
                        if ($ciudad == $dto["Ciudad"])  {
                            $resultado[]= "Ciudad" ; 
                            $resultado[]= $dto["Ciudad"];  
                            $resultado[]= "Direccion";
                            $resultado[]= $dto["Direccion"]; 
                            $resultado[]= "Telefono";
                            $resultado[]= $dto["Telefono"]; 
                            $resultado[]= "Tipo";
                            $resultado[]= $dto["Tipo"];
                            $resultado[]= "Precio";
                            $resultado[]= $dto["Precio"];
                        }
                    } else {
                        if (($ciudad == "Todas") && ($tipo != "Todos"))  {
                            if ($tipo == $dto["Tipo"])  {
                                $resultado[]= "Ciudad" ; 
                                $resultado[]= $dto["Ciudad"];  
                                $resultado[]= "Direccion";
                                $resultado[]= $dto["Direccion"]; 
                                $resultado[]= "Telefono";
                                $resultado[]= $dto["Telefono"]; 
                                $resultado[]= "Tipo";
                                $resultado[]= $dto["Tipo"];
                                $resultado[]= "Precio";
                                $resultado[]= $dto["Precio"];
                            }
                        }
                    }
                }
            }
                
        } 
    }
    
    echo json_encode($resultado);
}

?>
