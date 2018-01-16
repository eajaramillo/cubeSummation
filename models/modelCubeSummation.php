<?php
/**
 * CubeSummation: clase encargada de construir e inicializar la matriz según el dato $N, se encarga de ejecutar las operaciones definidas por el usuario
 */
class CubeSummation {
    private $matrix = array();

    /**
     * [__construct Construcción e inicialización de la matriz]
     * @param [int] $N [Número máximo de indices a crear en la matrix]
     */
    public function __construct($N){
        for ($x=1; $x <= $N; $x++) {
            $y = $x;
            $z = $x;
            $this->matrix[$x]         = array();
            $this->matrix[$x][$y]     = array();
            $this->matrix[$x][$y][$z] = 0;
        }
    }

    /**
     * [queryMatrix Ejecuta la operación query sumando todos los datos contenidos entres las posiciones $x1 y $x2]
     * @param  [int] $x1 [Indice inicial]
     * @param  [int] $x2 [Indice final]
     * @return [int]     [Resultado de la sumas entre los indices límite incluyendo los valores de los indices extremos]
     */
    public function queryMatrix($x1, $x2){
        $matrix_    = $this->getMatrix();
        $sum_matrix = 0;
        for ($index = $x1; $index <= $x2; $index++){
            $sum_matrix += $this->matrix[$index][$index][$index];
        }
        return $sum_matrix;
    }

    /**
     * [updateMatrix Ejecuta la operación update actualizando la posición $x, $y, $z con el valor $w]
     * @param  [int] $x [Posición x en la matriz]
     * @param  [int] $y [Posición y en la matriz]
     * @param  [int] $z [Posición z en la matriz]
     * @param  [int] $w [Dato que actualiza el valor de la posicón $x, $y, $z en la matriz]
     * @return [type]    [description]
     */
    public function updateMatrix($x, $y, $z, $w){
        $this->matrix[$x][$y][$z] = $w;
    }

    /**
     * [validatePosition Se encarga de validar si la posición $x, $y, $z que se va a manipular por cualquier operación existe o no en la matriz]
     * @param  [int] $x [Posición x en la matriz]
     * @param  [int] $y [Posición y en la matriz]
     * @param  [int] $z [Posición z en la matriz]
     * @return [bool]   [True si la posición $x, $y, $z si está definida en la matriz]
     */
    public function validatePosition($x, $y, $z){
        if(
                array_key_exists($x,$this->matrix) &&
                array_key_exists($y,$this->matrix[$x]) &&
                array_key_exists($z,$this->matrix[$x][$y])
        ){
            return true;
        }
        return false;
    }

    /**
     * [getMatrix Retorna la matriz completa]
     * @return [type] [description]
     */
    public function getMatrix(){
        return $this->matrix;
    }
}
?>