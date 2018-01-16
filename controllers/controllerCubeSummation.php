<?php
include("../models/modelCubeSummation.php");
$json_result = array("error"=>0, "out"=>array());

$matrix = new CubeSummation($_POST["index_matrix"]);

foreach ($_POST["arr_operations"] as $key => $arr_value) {
    switch ($arr_value["operation"]) {
        case "UPDATE":
                if($matrix->validatePosition($arr_value["X"], $arr_value["Y"], $arr_value["Z"])){
                    $matrix->updateMatrix($arr_value["X"], $arr_value["Y"], $arr_value["Z"], $arr_value["W"]);
                } else {
                    $json_result["out"][] = "<span class='small'>No exists position {$arr_value["X"]}, {$arr_value["Y"]}, {$arr_value["Z"]}</span>";
                }
            break;

        case "QUERY":
                if($matrix->validatePosition($arr_value["X1"], $arr_value["Y1"], $arr_value["Z1"])){
                    if($matrix->validatePosition($arr_value["X2"], $arr_value["Y2"], $arr_value["Z2"])){
                        $json_result["out"][] = $matrix->queryMatrix($arr_value["X1"], $arr_value["X2"]);
                    } else {
                        $json_result["out"][] = "<span class='small'>No exists position {$arr_value["X2"]}, {$arr_value["Y2"]}, {$arr_value["Z2"]}</span>";
                    }
                } else {
                    $json_result["out"][] = "<span class='small'>No exists position {$arr_value["X1"]}, {$arr_value["Y1"]}, {$arr_value["Z1"]}</span>";
                }
            break;
    }
}

echo json_encode($json_result);
?>