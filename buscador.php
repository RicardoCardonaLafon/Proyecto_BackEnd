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
 /* case 'ciudades':
    echo GetAllCities();
    break;
  case 'tipos':
    echo GetAllTypes();
    break;*/
  case 'Personalizada':
    echo json_encode(GetCustom());
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
        $importe = (int)$dto["Precio"];
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
        /*if (((int)$min >= $importe) && ((int)$max <= $importe)) {
            $resultado[]= "Ciudad" ; 
            $resultado[]= $dto["Ciudad"];  
            $resultado[]= "Direccion";
            $resultado[]= $dto["Direccion"]; 
            $resultado[]= "Telefono";
            $resultado[]= $dto["Telefono"]; 
            $resultado[]= "Tipo";
            $resultado[]= $dto["Tipo"];
            $resultado[]= "Tipo";
            $resultado[]= $dto["Precio"];
            $resultado[]= "Precio";
            } */
    }
    //sort($types);
    echo json_encode($resultado);
}
/*
function GetAllCities(){
$data = file_get_contents($GLOBALS['path']);
$inmuebles = json_decode($data);
$cities=[];
foreach ($inmuebles as $key => $json) {
  $cities[]=$json->Ciudad;
}
    
//Elimino los duplicados    
$cities=array_unique($cities);
$ciudadesOpt="<option value=\"All\" selected>Elige una ciudad</option>";
foreach ($cities as $key => $city) {
  $ciudadesOpt.="<option  value=\"$city\">$city</option>";
}
return $ciudadesOpt;
} */



/*function GetCustom(){
  $seleccionados=[];
$data = file_get_contents($GLOBALS['path']);
$inmuebles = json_decode($data);
for ($i=0; $i < count($inmuebles) ; $i++) {
$precioImueble=(substr($inmuebles[$i]->Precio,1));
$precioImueble=(float)str_replace(',', '', $precioImueble);

  if (($inmuebles[$i]->Ciudad!=$GLOBALS['ciudad'])&&($GLOBALS['ciudad']!="All")) {

  }
  elseif (($inmuebles[$i]->Tipo!=$GLOBALS['tipo'])&&($GLOBALS['tipo']!="All")) {

  }
  elseif (($precioImueble<(float)$GLOBALS['min'])||($precioImueble>(float)$GLOBALS['max'])) {

  }
  else {
    array_push($seleccionados,$inmuebles[$i]);
  }
}

return $seleccionados;
} */



?>
