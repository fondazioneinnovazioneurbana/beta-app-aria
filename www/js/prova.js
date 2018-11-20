
function pulisciinquinante(grezzume){
        switch (true) {
        case ( grezzume == undefined):
           grezzume = "n.d."
                //print n-d
            break;
        default:

            break;
    };
};
/* scrivo il dato grezzo dei 4 */
function printinquinanti(idstazione,numstazione){
     var filagrezza = datigrezzi[numstazione];
    console.log("pm10 di"+idstazione+filagrezza.pm10);
    
    //mi scrive i 4 singoli inquinanti
    //bisogna calcolare iqa singoli
    
    
};

//vecchio giro
function stampainquinanti() {
    //console.log("pm10 singolo29"+datigrezzi[29].pm10);
    for (i = 0; i < stazioni.length; i++) {
        var stazionep = stazioni[i];
        var filagrezza = datigrezzi[stazionep];
        //for (i = 0; i < inquinantilist.length; i++) {
        //var inquinante = inquinantilist[i];
        console.log("ciclo-stazione n*" + stazionep + "fila " + datogpm10,datogno2,datogbenz,datogpm25);
        //console.log(datogpm10);
        //console.log(inquinante);
        datogpm10 = filagrezza.pm10;
        datogno2 = filagrezza.no2;
        datogbenz = filagrezza.benzene;
        datogpm25 = filagrezza.pm25;
        
        datogpm10 = datogpm10.trim();
        if (datogpm10 == "n.d.") {
            
        } else {
            pm10.push(datogpm10);
        };

    }
    // console.log(pm10);
   trovamaggiore();
};
function puliscinumero(forsenumero) {
    var i;
    if (isNaN(unoperuno)) {
        unoperuno = 0;
        console.log("nan");
    }
    arrayinquinante[i] = unoperuno;
};
function pulisciarray(arrayvoluto){
    var i;
    for (i=0;i>arrayvoluto.length;i++)
         {
             var unoperuno=arrayvoluto[i]
             unoperuno=Number(unoperuno);
             if(isNaN(unoperuno)){
                unoperuno=0;
                }
           arrayvoluto.push(unoperuno[i]);
    }
}

function trovamaggiore(){
     var maggiorinq = Math.max.apply(null, pm10);
    console.log(maggiorinq);
    iqapm10 = (maggiorinq / 50) * 100;
    console.log(iqapm10);
    iqapm10 = Math.trunc(iqapm10);
    stampaiqapm10();
};

function stampaiqapm10() {
    display_results("#pm10 .tinq > span", iqapm10);
    stampacoloreiqainquinante("pm10",iqapm10);
};

function stampacoloreiqainquinante(nomeinq,inquinante) {
    console.log("stampa iqa inquinante "+nomeinq + inquinante);
    switch (true) {
        case (inquinante < 50):
            calcolagradienteinquinante(inquinante, 0, "00E676", "FFEA00");
            break;
        case (50 <= inquinante <= 99):
            calcolagradienteinquinante(inquinante, 50, "FFEA00", "FFC600");
            break;
        case (100 <= inquinante <= 149):
            calcolagradienteinquinante(inquinante, 100, "FFC600", "FF5722");
            break;
        case (150 <= inquinante <= 199):
            calcolagradienteinquinante(inquinante, 150, "FF5722", "9E005D");
            break;
        case (inquinante >= 200):

            //
            break;
        default:
            console.log("inquinanteiqa nd");
            break;
    };
}

function calcolagradienteinquinante(inq, baseratioq, colorq2, colorq1) {
    // console.log(ratio);
    var ratioq = 0;
    //console.log("baseinq " + baseratioq);
    //console.log("inq " + inq);
    //console.log("col1inq " + colorq1);
    //console.log("col2inq " + colorq2);

    ratioq = [(inq - baseratioq) * 2] / 10;
    ratioq = Math.floor(ratioq);
    //numero con solo una cifra decimale
    ratioq = Math.round(ratioq * 10) / 100;
    var hex = function (x) {
        x = x.toString(16);
        return (x.length == 1) ? '0' + x : x;
    };

    var r = Math.ceil(parseInt(colorq1.substring(0, 2), 16) * ratioq + parseInt(colorq2.substring(0, 2), 16) * (1 - ratioq));
    var g = Math.ceil(parseInt(colorq1.substring(2, 4), 16) * ratioq + parseInt(colorq2.substring(2, 4), 16) * (1 - ratioq));
    var b = Math.ceil(parseInt(colorq1.substring(4, 6), 16) * ratioq + parseInt(colorq2.substring(4, 6), 16) * (1 - ratioq));

    var middle = hex(r) + hex(g) + hex(b);

    var nsu500 = 0;

    nsu500 = (inq * 100) / 500;
    nsu500 = Math.trunc(nsu500);
    console.log("nsu500 " + nsu500);
    //(x:100=inq:500) (inq*100)/500

    console.log("inq rgb(" + r + "," + g + "," + b + ")");
    $("#barpm10 .barrain ").css("background-color", "rgb(" + r + "," + g + "," + b + ")");
    $("#barpm10 .barrain ").css("width", nsu500 + "%");
    //$("div.block.rainbow ").css("animation", "none");
};

function getdatigrezzi() {
    console.log("chiamo dati grezzi");
    //   var dati;
    var url = "https://www.arpae.it/qualita-aria/bollettino-qa/json";

    $.ajax({
        dataType: "json",
        url: url,
        //  data: data,
        type: "GET",
        success: function (a) {
            datigrezzi = a;
            //console.log(a, 1);
            printinquinanti("#molinella",29);
            stampainquinanti();
        },
        error: function (b) {
            console.log(b, 2);

        }
    });


};

function calcolagradiente() {


    //numero intero
    iqa = Math.trunc(iqa);
    // console.log(ratio);
    var color1 = colorealto;
    var color2 = colorebasso;
    ratio = [(iqa - baseratio) * 2] / 10;
    ratio = Math.floor(ratio);
    //numero con solo una cifra decimale
    ratio = Math.round(ratio * 10) / 100;
    var hex = function (x) {
        x = x.toString(16);
        return (x.length == 1) ? '0' + x : x;
    };

    var r = Math.ceil(parseInt(color1.substring(0, 2), 16) * ratio + parseInt(color2.substring(0, 2), 16) * (1 - ratio));
    var g = Math.ceil(parseInt(color1.substring(2, 4), 16) * ratio + parseInt(color2.substring(2, 4), 16) * (1 - ratio));
    var b = Math.ceil(parseInt(color1.substring(4, 6), 16) * ratio + parseInt(color2.substring(4, 6), 16) * (1 - ratio));

    var middle = hex(r) + hex(g) + hex(b);

    console.log("rgb(" + r + "," + g + "," + b + ")");
    $("div.block.rainbow ").css("background-color", "rgb(" + r + "," + g + "," + b + ")");
    //$("div.block.rainbow ").css("animation", "none");
};
