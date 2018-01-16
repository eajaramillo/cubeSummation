/**
 * [initView Inicia la vista del programa para el usuario]
 * @return {[type]} [description]
 */
function initView(){
    $.post('views/viewCubeSummation.html', function(data) {
        $("#contenedor_programa").html(data);
    }).done(function(){
        var genTests = $("#btn_step_2");
        genTests.off('click').on('click',function(){
            $("#div_tests").html("");
            var continue_ = false;
            if(validNumberTest($("#number_tests"))){
                continue_ = true;
            }

            if(continue_) {
                printTest($("#number_tests"));
            }
        });
    });
}

/**
 * [validNumberTest Valída el tipo de dato para el número de pruebas a ejecutar]
 * @param  {[int]} number_tests [T: número de test]
 * @return {[bool]}             [True si es un dato correcto, false en caso contrario]
 */
function validNumberTest(number_tests){
    var isOk = true;
    var val_number_tests = number_tests.val();
    if(val_number_tests.replace(/ /gi, "") == ''){
        jAlert("Number test-cases invalid<br>Try: 1 <= T <= 50");
        isOk = false;
    } else if (isNaN(val_number_tests)){
        jAlert("Number test-cases, it isn't numeric");
        isOk = false;
    } else if(val_number_tests <= 0 || val_number_tests > 50){
        jAlert("Number test-cases ("+val_number_tests+") invalid<br>Try: 1 <= T <= 50");
        isOk = false;
    }

    return isOk;
}

/**
 * [validNM Valída la pareja de número N M correspondientes a indices de la matriz y número de operaciones a crear, la función hace una separación de N y M
 * se convierten a entero y se valída cada número por separado]
 * @param  {[string]} matrix_operations [Objeto campo que contiene los datos N M, es de tipo string]
 * @return {[bool]}                     [True si tanto N como M son datos correctos según las restricciones]
 */
function validNM(matrix_operations){
    var isOk = true;
    var val_matrix_operations = matrix_operations.val().replace(/ /gi, " ");
    var split_n_m = val_matrix_operations.split(" ");

    if(split_n_m.length == 2){
        var n = split_n_m[0];
        var m = split_n_m[1];

        if(n.replace(/ /gi, "") == ''){
            jAlert("[N M] Matrix N invalid<br>Try: 1 <= N <= 100");
            isOk = false;
        } else if (isNaN(n)){
            jAlert("[N M] Matrix N, it isn't numeric");
            isOk = false;
        } else if(n <= 0 || n > 100){
            jAlert("[N M] Matrix N ("+n+") invalid<br>Try: 1 <= N <= 100");
            isOk = false;
        } else if(m.replace(/ /gi, "") == ''){
            jAlert("[N M] Number operations M invalid<br>Try: 1 <= M <= 1000");
            isOk = false;
        } else if (isNaN(m)){
            jAlert("[N M] Number operations M, it isn't numeric");
            isOk = false;
        } else if(n <= 0 || m > 100){
            jAlert("[N M] Number operations M ("+m+") invalid<br>Try: 1 <= M <= 1000");
            isOk = false;
        }
    } else {
        jAlert("Values N and M invalids<br>Try: 1 <= N <= 100<br>And 1 <= M <= 1000<br>[N space M]");
        isOk = false;
    }

    return isOk;
}

/**
 * [validOperationTextUpdate Validación de los datos de la operación update, separa datos y los valída por separado según las restricciones]
 * @param  {[string]} text_operation        [Texto del campo de operación que se debe ejecutar]
 * @param  {[object]} elem_text_operation   [Objeto campo (input) que tiene el texto de la operación]
 * @param  {[int]} index_matrix_N           [Indice para la matriz]
 * @return {[bool]}                         [True si el texto de la operación es correcto así como cada tipo de dato.]
 */
function validOperationTextUpdate(text_operation, elem_text_operation, index_matrix_N){
    var isOk = true;
    var val_text_operation = text_operation.replace(/ /gi, " ");
    var split_operation = val_text_operation.split(" ");

    if(split_operation.length == 4){
        var X = parseInt(split_operation[0]);
        var Y = parseInt(split_operation[1]);
        var Z = parseInt(split_operation[2]);
        var W = parseInt(split_operation[3]);

        if(!isNaN(X) && X >= 1 && X <= index_matrix_N) {
            if(!isNaN(Y) && Y >= 1 && Y <= index_matrix_N) {
                if(!isNaN(Z) && Z >= 1 && Z <= index_matrix_N) {
                    if(!isNaN(W) && W >= -10000000000 && W <= 10000000000) {
                        // XYZ W Ok
                    } else {
                        elem_text_operation.addClass("bg-danger");
                        isOk = false;
                    }
                } else {
                    elem_text_operation.addClass("bg-danger");
                    isOk = false;
                }
            } else {
                elem_text_operation.addClass("bg-danger");
                isOk = false;
            }
        } else {
            elem_text_operation.addClass("bg-danger");
            isOk = false;
        }

    } else {
        elem_text_operation.addClass("bg-danger");
        isOk = false;
    }

    return isOk;
}

/**
 * [validOperationTextQuery Validación de los datos de la operación query, separa datos y los valída por separado según las restricciones]
 * @param  {[string]} text_operation        [Texto del campo de operación que se debe ejecutar]
 * @param  {[object]} elem_text_operation   [Objeto campo (input) que tiene el texto de la operación]
 * @param  {[int]} index_matrix_N           [Indice para la matriz]
 * @return {[bool]}                         [True si el texto de la operación es correcto así como cada tipo de dato.]
 */
function validOperationTextQuery(text_operation, elem_text_operation, index_matrix_N){
    var isOk = true;
    var val_text_operation = text_operation.replace(/ /gi, " ");
    var split_operation = val_text_operation.split(" ");

    if(split_operation.length == 6){
        var X1 = parseInt(split_operation[0]);
        var Y1 = parseInt(split_operation[1]);
        var Z1 = parseInt(split_operation[2]);
        var X2 = parseInt(split_operation[3]);
        var Y2 = parseInt(split_operation[4]);
        var Z2 = parseInt(split_operation[5]);

        if(!isNaN(X1) && X1 >= 1 && X1 <= X2 && X2 >= 1 && X2 <= index_matrix_N) {
            if(!isNaN(Y1) && Y1 >= 1 && Y1 <= Y2 && Y2 >= 1 && Y2 <= index_matrix_N) {
                if(!isNaN(Y1) && Y1 >= 1 && Y1 <= Z2 && Z2 >= 1 && Z2 <= index_matrix_N) {
                    // Ok
                } else {
                    elem_text_operation.addClass("bg-danger");
                    isOk = false;
                }
            } else {
                elem_text_operation.addClass("bg-danger");
                isOk = false;
            }
        } else {
            elem_text_operation.addClass("bg-danger");
            isOk = false;
        }

    } else {
        elem_text_operation.addClass("bg-danger");
        isOk = false;
    }

    return isOk;
}

/**
 * [validOperations Para cada operación creada para el usuario y según el número de test se valída el tipo de operación usando a su vez las funciones respectivas
 * validOperationTextUpdate validOperationTextQuery, para garantizar que todos los campos y tipos de operación quedaron diligenciados y con los tipos de datos correctos.
 * @param  {[int]} index_test     [Número del test en ejecusión]
 * @param  {[int]} index_matrix_N [Indices de la matriz]
 * @return {[bool]}               [True si las operaciones son correctas]
 */
function validOperations(index_test, index_matrix_N){
    var arr_operations = new Array();
    var isOk = true;
    $("#div_tests").find("#test_"+index_test+" .bg-danger").removeClass("bg-danger");
    $("#div_tests").find(":input[id^=test_"+index_test+"_operation_select_]").each(function() {
        var tip_operation = $(this).val();
        if(tip_operation == ''){
            jAlert("Empty");
            isOk = false;
        } else {
            var text_operation      = $(this).parent().next("td").find(":input").val();
            var elem_text_operation = $(this).parent().next("td").find(":input");
            var position = arr_operations.length;
            switch (tip_operation){
                case 'UPDATE':
                    if(validOperationTextUpdate(text_operation, elem_text_operation, index_matrix_N)){
                        var val_text_operation = text_operation.replace(/ /gi, " ");
                        var split_operation = val_text_operation.split(" ");

                        arr_operations[position] = {};
                        arr_operations[position].operation = "UPDATE";
                        arr_operations[position].X         = split_operation[0];
                        arr_operations[position].Y         = split_operation[1];
                        arr_operations[position].Z         = split_operation[2];
                        arr_operations[position].W         = split_operation[3];
                    } else {
                        // jAlert("Formato incompatible, intentar [x1 x1 x1 W]");
                        isOk = false;
                    }
                break;
                case 'QUERY':
                    if(validOperationTextQuery(text_operation, elem_text_operation, index_matrix_N)){
                        var val_text_operation = text_operation.replace(/ /gi, " ");
                        var split_operation = val_text_operation.split(" ");

                        arr_operations[position] = {};
                        arr_operations[position].operation = "QUERY";
                        arr_operations[position].X1        = split_operation[0];
                        arr_operations[position].Y1        = split_operation[1];
                        arr_operations[position].Z1        = split_operation[2];
                        arr_operations[position].X2        = split_operation[3];
                        arr_operations[position].Y2        = split_operation[4];
                        arr_operations[position].Z2        = split_operation[5];
                    } else {
                        // jAlert("Formato incompatible, intentar [x1 x1 x1 W]");
                        isOk = false;
                    }
                break;
            }
        }
    });

    return arr_operations;
}

/**
 * [printTest Esta función se encarga de imprimir en pantalla para el usuario tantas secciones test como se haya especificado en el campo de entrada "[T] Number test-cases" ]
 * @param  {[int]} number_tests  [valor del campo de entrada [T] Number test-cases]
 * @return {[type]}              []
 */
function printTest(number_tests){
    var val_number_tests      = number_tests.val();
    var htmlTest              = '';

    for (var ntest = 1; ntest <= val_number_tests; ntest++){


        htmlTest =  '<div id="test_'+ntest+'" class="">'
                    +'    <h3 style="text-align:left;" class="bg-info">Test '+ntest+'</h3>'
                    +'    <table class="" align="center">'
                    +'        <tr>'
                    +'          <td class="text-left">[N M]<br><sup>N*N*N-Matrix/M-Number of operations</sup></td>'
                    +'          <td><input type="text" id="matrix_operations_'+ntest+'"><button id="" onClick="printOperation(\''+ntest+'\');">Create operations</button></td>'
                    +'        </tr>'
                    +'    </table>'
                    +'    <div class="row">'
                    +'        <div class="col-sm-6">'
                    +'            <div class="card">'
                    +'                <div class="card-body">'
                    +'                    <h5 class="card-title">Operations</h5>'
                    +'                    <table align="center" id="table_operations_'+ntest+'">'
                    +'                    </table>'
                    +'                    <a href="javascript:;" class="btn btn-primary btn-sm" onClick="getResult(\''+ntest+'\');" >Get results test '+ntest+'</a>'
                    +'                </div>'
                    +'            </div>'
                    +'        </div>'
                    +'        <div class="col-sm-6">'
                    +'            <div class="card">'
                    +'                <div class="card-body">'
                    +'                    <h5 class="card-title">Results test '+ntest+'</h5>'
                    +'                    <code id="out_test_'+ntest+'">'
                    +'                    </code>'
                    +'                </div>'
                    +'            </div>'
                    +'        </div>'
                    +'    </div>'
                    +'</div><br>';
        $("#div_tests").append(htmlTest);
    }
}

/**
 * [printOperation Imprime en pantalla la cantidad de campos de operación especificado por el usuario en el campo [N M]]
 * @param  {[int]} ntest [Consecutivo que identifica el número de test que se está ejecutando o manipulando por el usuario]
 * @return {[type]}      []
 */
function printOperation(ntest){
    var htmlOperations = '';
    if(validNM($("#matrix_operations_"+ntest))){
        var val_matrix_operations = $("#matrix_operations_"+ntest).val().replace(/ /gi, " ");
        var split_n_m             = val_matrix_operations.split(" ");
        var operations            = split_n_m[1]; // Número de operaciones

        for (var select_operation = 1; select_operation <= operations; select_operation++){
            htmlOperations += '<tr>'
                            +'    <td style="width:20%">Operation</td>'
                            +'    <td style="width:20%">'
                            +'        <select name="" id="test_'+ntest+'_operation_select_'+select_operation+'" onChange="updatePlaceHolder(this);">'
                            +'            <option value="">Select...</option>'
                            +'            <option value="UPDATE">Update</option>'
                            +'            <option value="QUERY">Query</option>'
                            +'        </select>'
                            +'    </td>'
                            +'    <td style="width:60%">'
                            +'        <input type="text" id="test_'+ntest+'_operation_text_'+select_operation+'" placeholder="">'
                            +'    </td>'
                            +'</tr>';
        }
    }
    $("#table_operations_"+ntest).html(htmlOperations);
}

/**
 * [updatePlaceHolder Actualiza el placeholder de cada campo texto de operación según el tipo de operación seleccionado (Texto de ayuda)]
 * @param  {[object]} elem [Objeto input del campo de texto de la operación]
 * @return {[type]}      [description]
 */
function updatePlaceHolder(elem){
    switch($(elem).val()){
        case 'UPDATE':
            $(elem).parent().next("td").find(":input").attr("placeholder","x y z W");
        break;
        case 'QUERY':
            $(elem).parent().next("td").find(":input").attr("placeholder","x1 y1 z1 x2 y2 z2");
        break;
        default:
            $(elem).parent().next("td").find(":input").attr("placeholder","");
        break;
    }
}

/**
 * [getResult Función encargada de reunir todos los datos necesarios (tipos de operaciones, operaciones, indice matriz) para enviarlos al servidor y ejecutar cada operación
 * en PHP]
 * @param  {[int]} index_test [Consecutivo que identifica el número de test que se está ejecutando o manipulando por el usuario]
 * @return {[type]}           [description]
 */
function getResult(index_test){
     if(validNM($("#matrix_operations_"+index_test))){
        var val_matrix_operations = $("#matrix_operations_"+index_test).val().replace(/ /gi, " ");
        var split_n_m             = val_matrix_operations.split(" ");
        var index_matrix_N        = split_n_m[0]; // Posiciones Matrix
        var operations            = split_n_m[1]; // Número de operaciones

        var arr_operations = validOperations(index_test, index_matrix_N);
        $("#out_test_"+index_test).html("");

        if(arr_operations.length == operations){
            $.post('controllers/controllerCubeSummation.php',
            {
                index_test      : index_test,
                index_matrix    : index_matrix_N,
                operations      : operations,
                arr_operations  : arr_operations
            },
            function(data) {
                if(data.error == 1) {
                    jAlert("Error en el programa", "Error");
                } else {
                    for (var idx in data.out) {
                        $("#out_test_"+index_test).append(data.out[idx]+'<br>');
                    };
                }
            },'json').done(function(){
                //
            });
        }
     }
}

/**
 * [jAlert: Mensajes para el usuario]
 * @param  {[type]} html   [Texto para mostrar en pantalla al usuario]
 * @param  {[type]} titulo [Titulo de mensaje]
 * @return {[type]}        [description]
 */
function jAlert(html,titulo){
    if($("#jAlert").length == 0)
    {
      var div_jAlert = '<!-- Modal jAlert -->'
                        +'<div class="modal fade" id="jAlert" tabindex="-1" role="dialog" aria-labelledby="alertModalLabel" aria-hidden="true">'
                        +'  <div class="modal-dialog" role="document">'
                        +'    <div class="modal-content">'
                        +'      <div class="modal-header">'
                        +'        <h4 class="modal-title" id="alertModalLabel">Alert</h4>'
                        +'      </div>'
                        +'      <div class="modal-body" >'
                        +'        ...'
                        +'      </div>'
                        +'      <div class="modal-footer">'
                        +'        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>'
                        +'        <!-- <button type="button" class="btn btn-primary">Save changes</button> -->'
                        +'      </div>'
                        +'    </div>'
                        +'  </div>'
                        +'</div>';
      $("body").append(div_jAlert);
    }

    $("#jAlert").find(".modal-header").removeClass("bg-danger");

    $("#jAlert").find("#alertModalLabel").html(titulo);
    $("#jAlert").find(".modal-body").html(html);
    $("#jAlert").modal({ backdrop: 'static',
                         keyboard: false}).css("z-index", 2030);
}