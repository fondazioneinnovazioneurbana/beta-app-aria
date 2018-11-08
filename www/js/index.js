/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        //DANGER solo per android, decommentare!
        //checkConnection();
        /* DANGER: solo per browser, dopo togliere!*/
        getdatigrezzi();
        getdatiiqa();
    },


};

app.initialize();

/*///////////////inizio utilities//////////////*/

function display_results(contenitore, messaggio) {
    $(contenitore).text(messaggio);
};

/*per network info*/
function checkConnection() {
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.UNKNOWN] = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI] = 'WiFi connection';
    states[Connection.CELL_2G] = 'Cell 2G connection';
    states[Connection.CELL_3G] = 'Cell 3G connection';
    states[Connection.CELL_4G] = 'Cell 4G connection';
    states[Connection.CELL] = 'Cell generic connection';
    states[Connection.NONE] = 'No network connection';
    if (states[networkState] == 'Unknown connection' || states[networkState] == 'No network connection') {

        setTimeout(function () {
            noconnessione();
        }, 9000);
        //alert('Non sei connesso ad internet, connettiti ad una rete per procedere.');
        return false;

    } else {
        //display_results("h1", "ok");
        getdatiiqa();
        getdatigrezzi();
        return true;
    }
}



var iqa = 0;

function getdatiiqa() {
    var createCORSRequest = function (method, url) {
        var xhr = new XMLHttpRequest();
        if ("withCredentials" in xhr) {
            // Most browsers.
            xhr.open(method, url, true);
        } else if (typeof XDomainRequest != "undefined") {
            // IE8 & IE9
            xhr = new XDomainRequest();
            xhr.open(method, url);
        } else {
            // CORS not supported.
            xhr = null;
        }
        return xhr;
    };

    //var dataarpa = 20181010

    /*ogni volta setto la data di oggi*/

    var today = new Date();
    var oggi = today.getDate();
    oggi = oggi.toString();
    var mese = today.getMonth() + 1;
    var annon = today.getYear();
    var annok = annon.toString();
    var mesek = mese.toString();

    if (oggi.length == 1) {
        oggi = '0' + oggi;
    }
    if (mesek.length == 1) {
        mesek = '0' + mesek;
    }
    // data per la query alle API arpa per IQA
    var dataarpa = "20" + annok.slice(1) + mesek + oggi;

    // data per umani
    var mesi = ["gennaio", "febbraio", "marzo", "aprile", "maggio", "giugno", "luglio", "agosto", "settembre", "ottobre", "novembre", "dicembre"]

    display_results(".datatop h1 span#day", today.getDate());
    display_results(".datatop h1 span#month", mesi[today.getMonth()]);
    display_results(".datatop h1 span#year", "20" + annok.slice(1));


    var url = 'https://apps.arpae.it/REST/qa_modello/' + dataarpa + '?projection={"dati.istat_037006":1}';
    //var urlC="https://www.arpae.it/qualita-aria/bollettino-qa/json"

    var method = 'GET';
    var xhr = createCORSRequest(method, url);

    xhr.onload = function () {
        var responseText = xhr.responseText;

        setTimeout(function () {
            connesso();
        }, 9000);
        console.log(responseText);
        // process the response.
        var obj = jQuery.parseJSON(responseText);
        iqa = obj.dati.istat_037006.iqa;
        console.log(iqa);
       
        stampaaggettivoiqa();
    };

    xhr.onerror = function () {
        //display_results("h3", 'There was an error!');
        console.log('There was an error!');
    };


    xhr.send();
};

function changebackground(bck, color) {
    $(bck).css("background-color", color);
};

/*///////////////fine utilities//////////////*/

// arriva dal check connection plugin per android
function noconnessione() {
    $("div.block.rainbow ").css("background-color", "#E1E1E1");
    $("div.block.rainbow ").css("animation", "none");
    $("#connesso").addClass("hide");
    $("#noconnesso").removeClass("hide");
    display_results("h1", "Errore");
}

// arriva dal aver finito di stampare l'iqa
function connesso() {
    $("div.block.rainbow ").css("min-height", "auto");
    $("div.block.rainbow ").css("animation", "none");
    $("#connesso").removeClass("hide");
    $("#tabellainquinanti").removeClass("hide");
}

//var colori per gratio, per calcolare valore del gradiente di sfondo
var ratio = "";
var baseratio = 0;
var colorebasso = "";
var colorealto = "";

// scala iqa https://www.arpae.it/dettaglio_generale.asp?id=938&idlivello=134&disab_redirautom_mob=1

function stampaaggettivoiqa() {
    switch (true) {
        case (iqa < 50):
            display_results("#aggettivoiqa", "basso");
            //basso
            scrivifrase("basso");
            colorebasso = "00E676";
            colorealto = "FFEA00";
            baseratio = 0;
            break;
        case (50 <= iqa <= 99):
            display_results("#aggettivoiqa", "moderato");
            //moderato
            scrivifrase("moderato");
            colorebasso = "FFEA00";
            colorealto = "FFC600";
            baseratio = 50;
            break;
        case (100 <= iqa <= 149):
            display_results("#aggettivoiqa", "medio");
            //medio
            scrivifrase("medio");
            colorebasso = "FFC600";
            colorealto = "FF5722";
            baseratio = 100;
            break;
        case (150 <= iqa <= 199):
            display_results("#aggettivoiqa", "alto");
            //alto
            scrivifrase("alto");
            colorebasso = "FF5722";
            colorealto = "9E005D";
            baseratio = 150;
            break;
        case (iqa >= 200):
            display_results("#aggettivoiqa", "molto_alto");
            //molto alto
            changebackground("div.block.rainbow", "#9E005D");
            scrivifrase("molto_alto");
            //
            break;
        default:
            console.log("iqa nd");
            break;
    };
     calcolagradiente();
}

/* test frasi online */
// https://www.joomla.it/articoli-della-community.feed?type=rss

$.get("http://www.fondazioneinnovazioneurbana.it/bologna/rss/aria-rss?format=feed&type=rss", function (data) {
    $(data).find("entry").each(function () { // or "item" or whatever suits your feed
        var el = $(this);

        console.log("------------------------");
        console.log("title      : " + el.find("title").text());
        console.log("author     : " + el.find("author").text());
        console.log("description: " + el.find("description").text());
    });
});

/* test frasi offline http://api.jquery.com/jquery.ajax/  */

var nbuona = 0;
var arraybuona = [];
var indicearraybuona = 0;

var naccettabile = 0;
var arrayaccettabile = [];
var indicearrayaccettabile = 0;

var nmediocre = 0;
var arraymediocre = [];
var indicearraymediocre = 0;

var nscadente = 0;
var arrayscadente = [];
var indicearrayscadente = 0;

var npessima = 0;
var arraypessima = [];
var indicearraypessima = 0;

function scrivifrase(argomento) {
    $.ajax({
        'async': true,
        'global': false,
        'url': "frasi/" + argomento + ".json",
        'dataType': "json",
        'success': function (data) {
            //console.log(data.resources.length);
            //console.log(data.resources);
            frasi = $(data.resources);
            //console.log(frasi[2].name);

            if (localStorage.getItem(argomento)) {
                // console.log("esiste");
                var compara = 0;
                compara = parseInt(localStorage.getItem(argomento)) - 1;
                if (data.resources.length != localStorage.getItem(argomento)) {
                    console.log("fineciclo1");
                    localStorage.clear();
                    scrivifrase(argomento);
                } else {
                    var dovesono = 0;
                    var dovevado = [];
                    var andiamo = 0;

                    dovesono = localStorage.getItem("mioindice" + argomento);
                    dovesono = parseInt(dovesono) + 1;
                    dovevado = localStorage.getItem("sequenza" + argomento);
                    dovevado = dovevado.split(',').map(function (item) {
                        return parseInt(item, 10);
                    });
                    var compara = 0;
                    compara = parseInt(localStorage.getItem(argomento) - 1);
                    //console.log(compara);
                    //console.log(dovesono);
                    //console.log(dovesono + " array " + dovevado);
                    andiamo = dovevado[dovesono];
                    //console.log(andiamo);
                    localStorage.setItem("mioindice" + argomento, dovesono);
                    //scrivo
                    display_results("#fraseiqa", frasi[andiamo].name);
                    display_results("#sottofraseiqa", frasi[andiamo].content);
                    if (dovesono == compara) {
                        console.log("fineciclo2");
                        localStorage.clear();
                        scrivifrase(argomento);
                    }

                }

            } else {
                //console.log("non esiste");
                // scrivo le 3 cose che mi servono: lunghezza, sequenza, mioindice

                frasi = $(data.resources);
                localStorage.setItem(argomento, data.resources.length);

                var N = [];
                N = Array.apply(null, {
                    length: data.resources.length
                }).map(Number.call, Number);
                console.log(N);
                arr = shuffle(N);
                console.log(arr);

                localStorage.setItem("sequenza" + argomento, arr);
                localStorage.setItem("mioindice" + argomento, 0);
                //scrivo
                display_results("#fraseiqa", frasi[0].name);
                display_results("#sottofraseiqa", frasi[0].content);
            };
        }
    });

};

function arrayordinato(numero) {
    // array ordinato
    Array.apply(null, {
        length: numero
    }).map(Number.call, Number)
}



// https://bost.ocks.org/mike/shuffle/

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


// secondo repo arpa: dati grezzi centraline

function getdatigrezzi() {
    console.log("dati grezzi");
    //   var dati;
    var url = "https://www.arpae.it/qualita-aria/bollettino-qa/json";

    $.ajax({
        dataType: "json",
        url: url,
        //  data: data,
        type: "GET",
        success: function (a) {
            console.log(a, 1);
        },
        error: function (b) {
            console.log(b, 2);

        }
    });

    /*   $.getJSON( url, function( json ) {
     console.log( "JSON Data: " + json );
    });*/

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

///////////////share plugin ///////////////////

function shareMeNow(message, subject, url) {
    // this is the complete list of currently supported params you can pass to the plugin (all optional) 
    var options = {
        message: message ? entityToHtml(message) : '', // not supported on some apps (Facebook, Instagram) 
        subject: subject ? entityToHtml(subject) : 'Share this:', // fi. for email 
        //files: ['', ''], // an array of filenames either locally or remotely 
        url: url || 'http://fondazioneinnovazioneurbana.it',
    };

    var onSuccess = function (result) {
        console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true 
        console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false) 
    };

    var onError = function (msg) {
        console.log("Sharing failed with message: " + msg);
    };

    window.plugins.socialsharing.shareWithOptions(options, onSuccess, onError);
}

$('button').click(function () {
        console.log("bottone");
    shareMeNow("ciao", "ecco", "#");

});
