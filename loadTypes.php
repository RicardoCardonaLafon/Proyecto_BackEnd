<?php
    $json_url = "/data-1.json";
    $json = file_get_contents($json_url);
    $data = json_decode($json, TRUE);

    $types = array();

    foreach ($data as $type) {
        if (!in_array($type["Tipo"], $types)) {
            $types[]= $type["Tipo"];
            }
    }
    sort($types);
    echo json_encode($types);
?>