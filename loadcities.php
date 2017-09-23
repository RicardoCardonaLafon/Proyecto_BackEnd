<?php
    $json_url = "data-1.json";
    $json = file_get_contents($json_url);
    $data = json_decode($json, TRUE);

    $cities = array();

    foreach ($data as $city) {

        if (!in_array($city["Ciudad"], $cities)) {
        $cities[]= $city["Ciudad"];
        }
    }
    sort($cities);

echo json_encode($cities);

?>